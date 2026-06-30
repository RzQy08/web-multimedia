<?php

use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\SectionController;
use Illuminate\Support\Facades\Route;

// ── Frontend ──────────────────────────────────────────────────────────────
Route::get('/pages/{slug}', [PageController::class, 'show']);

// ── Admin ─────────────────────────────────────────────────────────────────
Route::prefix('admin')->group(function () {

    // Pages CRUD
    Route::get('/pages',                      [SectionController::class, 'pages']);
    Route::post('/pages',                     [SectionController::class, 'storePage']);
    Route::patch('/pages/{slug}/status',      [SectionController::class, 'togglePageStatus']);
    Route::delete('/pages/{slug}',            [SectionController::class, 'destroyPage']);

    // Sections dalam halaman
    Route::get('/pages/{slug}/sections',      [SectionController::class, 'index']);
    Route::post('/pages/{slug}/sections',     [SectionController::class, 'store']);
    Route::patch('/pages/{slug}/reorder',     [SectionController::class, 'reorder']);

    // Section individual
    Route::get('/sections/{id}',              [SectionController::class, 'show']);
    Route::put('/sections/{id}',              [SectionController::class, 'update']);
    Route::patch('/sections/{id}/visibility', [SectionController::class, 'toggleVisibility']);
    Route::delete('/sections/{id}',           [SectionController::class, 'destroy']);

    // Referensi
    Route::get('/section-types',              [SectionController::class, 'sectionTypes']);
});