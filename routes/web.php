<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ── Halaman publik ─────────────────────────────────────────────────────────
Route::get('/', function () {
    return Inertia::render('Home');
});

// ── Halaman admin ──────────────────────────────────────────────────────────
// Tidak pakai middleware auth karena project ini website profile tanpa login.
// Nanti kalau mau ditambah auth, tinggal uncomment ->middleware('auth').
Route::get('/admin', function () {
    return Inertia::render('admin/AdminDashboard');
});

Route::get('/admin/{any}', function () {
    return Inertia::render('admin/AdminDashboard');
})->where('any', '.*');