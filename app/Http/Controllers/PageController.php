<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class PageController extends Controller
{
    /**
     * GET /api/pages
     * Daftar semua halaman.
     */
    public function index(): JsonResponse
    {
        $pages = Page::orderBy('order')->get();

        return response()->json([
            'success' => true,
            'data'    => $pages,
        ]);
    }

    /**
     * GET /api/pages/{id}
     * Detail satu halaman beserta section-nya.
     */
    public function show(Page $page): JsonResponse
    {
        $page->load(['sections.sectionType', 'sections.contents']);

        return response()->json([
            'success' => true,
            'data'    => $page,
        ]);
    }

    /**
     * GET /api/pages/slug/{slug}
     * Ambil halaman berdasarkan slug (untuk frontend publik).
     * Hanya mengembalikan section yang visible & status published.
     */
    public function showBySlug(string $slug): JsonResponse
    {
        $page = Page::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $page->load([
            'visibleSections.sectionType',
            'visibleSections.contents',
        ]);

        return response()->json([
            'success' => true,
            'data'    => $page,
        ]);
    }

    /**
     * POST /api/pages
     * Buat halaman baru.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'slug'   => 'required|string|max:255|unique:pages,slug',
            'title'  => 'required|string|max:255',
            'status' => ['nullable', Rule::in(['draft', 'published'])],
            'order'  => 'nullable|integer',
        ]);

        $page = Page::create([
            'slug'   => $validated['slug'],
            'title'  => $validated['title'],
            'status' => $validated['status'] ?? 'draft',
            'order'  => $validated['order'] ?? 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Halaman berhasil dibuat.',
            'data'    => $page,
        ], 201);
    }

    /**
     * PUT /api/pages/{id}
     * Update halaman.
     */
    public function update(Request $request, Page $page): JsonResponse
    {
        $validated = $request->validate([
            'slug'   => ['sometimes', 'string', 'max:255', Rule::unique('pages', 'slug')->ignore($page->id)],
            'title'  => 'sometimes|string|max:255',
            'status' => ['sometimes', Rule::in(['draft', 'published'])],
            'order'  => 'sometimes|integer',
        ]);

        $page->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Halaman berhasil diperbarui.',
            'data'    => $page,
        ]);
    }

    /**
     * DELETE /api/pages/{id}
     * Hapus halaman (cascade ke sections & contents via FK).
     */
    public function destroy(Page $page): JsonResponse
    {
        $page->delete();

        return response()->json([
            'success' => true,
            'message' => 'Halaman berhasil dihapus.',
        ]);
    }
}
