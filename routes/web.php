<?php
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/admin', function () {
    return Inertia::render('admin/AdminDashboard');
});