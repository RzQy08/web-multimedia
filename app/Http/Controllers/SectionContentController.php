<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\SectionContent;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class SectionContentController extends Controller
{
    /**
     * GET /api/sections/{section}/contents
     * Semua content milik satu section.
     */
    public function index(PageSection $section): JsonResponse
    {
        $contents = $section->contents()->get();

        return response()->json([
            'success' => true,
            'data'    => $contents,
            // Juga sertakan versi map key => value untuk kemudahan React
            'map'     => $contents->pluck('value', 'content_key'),
        ]);
    }

    /**
     * POST /api/sections/{section}/contents
     * Tambah content baru ke section.
     */
    public function store(Request $request, PageSection $section): JsonResponse
    {
        $validated = $request->validate([
            'content_key'  => [
                'required',
                'string',
                'max:100',
                // Tidak boleh duplikat dalam section yang sama
                Rule::unique('section_contents')->where(fn ($q) => $q->where('page_section_id', $section->id)),
            ],
            'content_type' => ['required', Rule::in(['text', 'html', 'image', 'json', 'url'])],
            'value'        => 'nullable|string',
            'meta'         => 'nullable|array',
        ]);

        $content = $section->contents()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Content berhasil ditambahkan.',
            'data'    => $content,
        ], 201);
    }

    /**
     * PUT /api/sections/{section}/contents/{content}
     * Update satu content item.
     */
    public function update(Request $request, PageSection $section, SectionContent $content): JsonResponse
    {
        $this->authorizeContent($section, $content);

        $validated = $request->validate([
            'content_type' => ['sometimes', Rule::in(['text', 'html', 'image', 'json', 'url'])],
            'value'        => 'nullable|string',
            'meta'         => 'nullable|array',
        ]);

        $content->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Content berhasil diperbarui.',
            'data'    => $content,
        ]);
    }

    /**
     * DELETE /api/sections/{section}/contents/{content}
     * Hapus satu content item.
     */
    public function destroy(PageSection $section, SectionContent $content): JsonResponse
    {
        $this->authorizeContent($section, $content);

        $content->delete();

        return response()->json([
            'success' => true,
            'message' => 'Content berhasil dihapus.',
        ]);
    }

    /**
     * POST /api/sections/{section}/contents/bulk-update
     * ──────────────────────────────────────────────────
     * Update banyak content sekaligus (dipakai form editor di admin React).
     * Body:
     *   {
     *     "contents": [
     *       { "content_key": "headline", "value": "Judul Baru", "content_type": "text" },
     *       { "content_key": "subtitle", "value": "Subjudul", "content_type": "text" },
     *       ...
     *     ]
     *   }
     *
     * Jika content_key sudah ada → update. Belum ada → insert (upsert).
     */
    public function bulkUpdate(Request $request, PageSection $section): JsonResponse
    {
        $validated = $request->validate([
            'contents'               => 'required|array|min:1',
            'contents.*.content_key' => 'required|string|max:100',
            'contents.*.content_type'=> ['required', Rule::in(['text', 'html', 'image', 'json', 'url'])],
            'contents.*.value'       => 'nullable|string',
            'contents.*.meta'        => 'nullable|array',
        ]);

        DB::transaction(function () use ($validated, $section) {
            foreach ($validated['contents'] as $item) {
                $section->contents()->updateOrCreate(
                    ['content_key' => $item['content_key']],
                    [
                        'content_type' => $item['content_type'],
                        'value'        => $item['value'] ?? null,
                        'meta'         => $item['meta'] ?? null,
                    ]
                );
            }
        });

        // Kembalikan semua content section setelah update
        $contents = $section->contents()->get();

        return response()->json([
            'success' => true,
            'message' => 'Content berhasil diperbarui.',
            'data'    => $contents,
            'map'     => $contents->pluck('value', 'content_key'),
        ]);
    }

    // ─── Private helpers ───────────────────────────────────────────────────────

    private function authorizeContent(PageSection $section, SectionContent $content): void
    {
        abort_if($content->page_section_id !== $section->id, 404, 'Content tidak ditemukan di section ini.');
    }
}
