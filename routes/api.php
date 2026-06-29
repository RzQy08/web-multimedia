<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PageSectionController;
use App\Http\Controllers\Api\SectionContentController;
use App\Http\Controllers\Api\SectionTypeController;

/*
|--------------------------------------------------------------------------
| API Routes — LUMINA CMS (Inertia + Laravel)
|--------------------------------------------------------------------------
| Karena pakai Inertia, auth sudah berbasis session — tidak perlu Sanctum.
| Middleware 'auth' sudah cukup untuk proteksi endpoint admin.
|
| Semua route diawali /api/ otomatis oleh Laravel.
|--------------------------------------------------------------------------
*/

// ── Public (Frontend) ──────────────────────────────────────────────────────
// Bebas diakses tanpa login — untuk render halaman publik LUMINA.

Route::prefix('public')->group(function () {

    // GET /api/public/pages/home
    Route::get('/pages/{slug}', [PageController::class, 'showBySlug']);

});

// ── Admin (Protected) ──────────────────────────────────────────────────────
// Pakai middleware 'auth' biasa (session Inertia), bukan auth:sanctum.

Route::prefix('admin')->middleware(['auth'])->group(function () {

    // ── Pages ───────────────────────────────────────────────────────────────
    Route::apiResource('pages', PageController::class);

    // ── Section Types (read-only) ────────────────────────────────────────────
    Route::get('section-types', [SectionTypeController::class, 'index']);
    Route::get('section-types/{sectionType}', [SectionTypeController::class, 'show']);

    // ── Page Sections ────────────────────────────────────────────────────────
    Route::prefix('pages/{page}/sections')->group(function () {

        Route::get('/',    [PageSectionController::class, 'index']);
        Route::post('/',   [PageSectionController::class, 'store']);

        Route::get('/{section}',    [PageSectionController::class, 'show']);
        Route::put('/{section}',    [PageSectionController::class, 'update']);
        Route::delete('/{section}', [PageSectionController::class, 'destroy']);

        // Simpan hasil GrapesJS editor
        // POST /api/admin/pages/{page}/sections/{section}/save-editor
        Route::post('/{section}/save-editor', [PageSectionController::class, 'saveEditor']);

        // Reorder drag-and-drop
        // POST /api/admin/pages/{page}/sections/reorder
        Route::post('/reorder', [PageSectionController::class, 'reorder']);

        // Toggle tampil/sembunyi
        // PATCH /api/admin/pages/{page}/sections/{section}/toggle-visibility
        Route::patch('/{section}/toggle-visibility', [PageSectionController::class, 'toggleVisibility']);

    });

    // ── Section Contents ─────────────────────────────────────────────────────
    Route::prefix('sections/{section}/contents')->group(function () {

        Route::get('/',    [SectionContentController::class, 'index']);
        Route::post('/',   [SectionContentController::class, 'store']);

        Route::put('/{content}',    [SectionContentController::class, 'update']);
        Route::delete('/{content}', [SectionContentController::class, 'destroy']);

        // Bulk update semua content sekaligus dari form admin
        // POST /api/admin/sections/{section}/contents/bulk-update
        Route::post('/bulk-update', [SectionContentController::class, 'bulkUpdate']);

    });

});