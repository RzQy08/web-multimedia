<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes — LUMINA (Inertia.js + React)
|--------------------------------------------------------------------------
| Karena pakai Inertia, tidak perlu file .blade.php terpisah per halaman.
| Inertia langsung render komponen React yang kamu tentukan.
|
| Struktur folder React yang diharapkan:
|   resources/js/Pages/
|       Home.tsx                   ← halaman publik
|       admin/
|           AdminDashboard.tsx     ← dashboard admin
|--------------------------------------------------------------------------
*/

// ── Halaman publik ─────────────────────────────────────────────────────────

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/login', function () {
    return Inertia::render('Login');
});

// ── Halaman admin (dilindungi auth) ────────────────────────────────────────
// Tambahkan middleware('auth') supaya yang belum login tidak bisa akses.

Route::middleware(['auth'])->group(function () {

    Route::get('/admin', function () {
        return Inertia::render('admin/AdminDashboard');
    });

    // Catch-all: kalau ada sub-path /admin/xxx dan user refresh,
    // tetap render AdminDashboard (React yang handle routing internalnya).
    Route::get('/admin/{any}', function () {
        return Inertia::render('admin/AdminDashboard');
    })->where('any', '.*');

});