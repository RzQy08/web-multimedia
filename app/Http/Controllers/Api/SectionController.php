<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\PageSection;
use App\Models\SectionType;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    /**
     * GET /api/admin/pages
     *
     * Daftar semua halaman beserta jumlah section-nya.
     * Dipakai sidebar admin untuk navigasi.
     */
    public function pages()
    {
        $pages = Page::withCount('sections')
            ->orderBy('order')
            ->get(['id', 'slug', 'title', 'status', 'order', 'sections_count']);

        return response()->json($pages);
    }

    /**
     * GET /api/admin/pages/{slug}/sections
     *
     * Semua section di satu halaman — untuk ditampilkan di admin.
     * Termasuk grapes_json agar editor bisa di-load ulang.
     */
    public function index(string $slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail();

        $sections = $page->sections()
            ->with(['sectionType', 'contents'])
            ->get()
            ->map(fn ($section) => [
                'id'           => $section->id,
                'section_key'  => $section->sectionType->name,
                'label'        => $section->label,
                'order'        => $section->order,
                'is_visible'   => $section->is_visible,
                'html'         => $section->html ?? '',
                'css'          => $section->css  ?? '',
                'grapes_json'  => $section->grapes_json,
                'contents'     => $section->contents_map,
                'fields_schema'=> $section->sectionType->fields_schema,
                'last_updated' => $section->updated_at?->diffForHumans(),
            ]);

        return response()->json([
            'page'     => ['slug' => $page->slug, 'title' => $page->title, 'status' => $page->status],
            'sections' => $sections,
        ]);
    }

    /**
     * GET /api/admin/sections/{id}
     *
     * Detail satu section — dipanggil saat admin klik edit section tertentu.
     * Mengandung grapes_json untuk load editor GrapesJS.
     */
    public function show(int $id)
    {
        $section = PageSection::with(['sectionType', 'contents', 'page'])
            ->findOrFail($id);

        return response()->json([
            'id'           => $section->id,
            'section_key'  => $section->sectionType->name,
            'label'        => $section->label,
            'order'        => $section->order,
            'is_visible'   => $section->is_visible,
            'html'         => $section->html  ?? '',
            'css'          => $section->css   ?? '',
            'grapes_json'  => $section->grapes_json,
            'contents'     => $section->contents_map,
            'fields_schema'=> $section->sectionType->fields_schema,
            'page'         => ['slug' => $section->page->slug, 'title' => $section->page->title],
            'last_updated' => $section->updated_at?->diffForHumans(),
        ]);
    }

    /**
     * PUT /api/admin/sections/{id}
     *
     * Simpan hasil edit dari GrapesJS.
     * Menerima grapes_json (wajib), html, css, dan konten dinamis.
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'grapes_json'        => 'required|array',
            'html'               => 'required|string',
            'css'                => 'nullable|string',
            'contents'           => 'nullable|array',
            'contents.*.content_key'  => 'required_with:contents|string',
            'contents.*.content_type' => 'required_with:contents|in:text,html,image,json,url',
            'contents.*.value'        => 'nullable',
        ]);

        $section = PageSection::findOrFail($id);

        // Simpan output GrapesJS
        $section->update([
            'grapes_json' => $request->grapes_json,
            'html'        => $request->html,
            'css'         => $request->css ?? '',
        ]);

        // Update konten dinamis jika dikirim
        if ($request->has('contents')) {
            foreach ($request->contents as $item) {
                $value = is_array($item['value'])
                    ? json_encode($item['value'])
                    : ($item['value'] ?? '');

                $section->contents()->updateOrCreate(
                    ['content_key' => $item['content_key']],
                    [
                        'content_type' => $item['content_type'],
                        'value'        => $value,
                    ]
                );
            }
        }

        return response()->json([
            'message'      => 'Section berhasil disimpan!',
            'last_updated' => $section->fresh()->updated_at->diffForHumans(),
        ]);
    }

    /**
     * PATCH /api/admin/sections/{id}/visibility
     *
     * Toggle tampil/sembunyi section tanpa buka editor.
     */
    public function toggleVisibility(int $id)
    {
        $section = PageSection::findOrFail($id);
        $section->update(['is_visible' => ! $section->is_visible]);

        return response()->json([
            'message'    => $section->is_visible ? 'Section ditampilkan.' : 'Section disembunyikan.',
            'is_visible' => $section->is_visible,
        ]);
    }

    /**
     * PATCH /api/admin/pages/{slug}/reorder
     *
     * Simpan urutan baru section setelah drag-and-drop di admin.
     * Body: { "order": [3, 1, 5, 2, 4] } — array of section id berurutan
     */
    public function reorder(Request $request, string $slug)
    {
        $request->validate([
            'order'   => 'required|array',
            'order.*' => 'integer',
        ]);

        foreach ($request->order as $position => $sectionId) {
            PageSection::where('id', $sectionId)->update(['order' => $position]);
        }

        return response()->json(['message' => 'Urutan section diperbarui.']);
    }

    /**
     * DELETE /api/admin/sections/{id}
     *
     * Hapus section dari halaman.
     * section_contents ikut terhapus otomatis (cascade di DB).
     */
    public function destroy(int $id)
    {
        PageSection::findOrFail($id)->delete();

        return response()->json(['message' => 'Section berhasil dihapus.']);
    }

    /**
     * POST /api/admin/pages/{slug}/sections
     *
     * Tambah section baru ke halaman.
     * Body: { "section_type": "hero" | "layanan" | ... }
     */
    public function store(Request $request, string $slug)
    {
        $request->validate([
            'section_type' => 'required|string|exists:section_types,name',
            'label'        => 'nullable|string|max:255',
        ]);

        $page        = Page::where('slug', $slug)->firstOrFail();
        $sectionType = SectionType::where('name', $request->section_type)->firstOrFail();

        // Taruh di urutan paling bawah
        $maxOrder = $page->sections()->max('order') ?? -1;

        $section = PageSection::create([
            'page_id'         => $page->id,
            'section_type_id' => $sectionType->id,
            'label'           => $request->label ?? $sectionType->label,
            'order'           => $maxOrder + 1,
            'is_visible'      => true,
        ]);

        return response()->json([
            'message' => 'Section baru berhasil ditambahkan.',
            'section' => [
                'id'          => $section->id,
                'section_key' => $sectionType->name,
                'label'       => $section->label,
                'order'       => $section->order,
                'is_visible'  => $section->is_visible,
                'html'        => '',
                'css'         => '',
                'grapes_json' => null,
            ],
        ], 201);
    }

    /**
     * GET /api/admin/section-types
     *
     * Daftar semua tipe section yang tersedia.
     * Dipakai dropdown "Tambah Section" di admin.
     */
    public function sectionTypes()
    {
        $types = SectionType::orderBy('label')
            ->get(['id', 'name', 'label', 'fields_schema']);

        return response()->json($types);
    }

    /**
     * POST /api/admin/pages
     * Buat halaman baru dari CMS admin.
     */
    public function storePage(Request $request)
    {
        $request->validate([
            'slug'  => 'required|string|unique:pages,slug|regex:/^[a-z0-9\-]+$/',
            'title' => 'required|string|max:255',
        ]);

        $page = Page::create([
            'slug'   => $request->slug,
            'title'  => $request->title,
            'status' => 'draft',
            'order'  => (Page::max('order') ?? 0) + 1,
        ]);

        return response()->json(['message' => 'Halaman baru berhasil dibuat.', 'page' => $page], 201);
    }

    /**
     * DELETE /api/admin/pages/{slug}
     * Hapus halaman beserta semua section dan kontennya.
     */
    public function destroyPage(string $slug)
    {
        Page::where('slug', $slug)->firstOrFail()->delete();
        return response()->json(['message' => 'Halaman berhasil dihapus.']);
    }

    /**
     * PATCH /api/admin/pages/{slug}/status
     * Toggle status halaman: draft <-> published
     */
    public function togglePageStatus(string $slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail();
        $page->update(['status' => $page->status === 'published' ? 'draft' : 'published']);
        return response()->json(['message' => "Status diubah ke '{$page->status}'.", 'status' => $page->status]);
    }
}
