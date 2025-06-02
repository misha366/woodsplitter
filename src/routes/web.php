<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', fn () => Inertia::render('Main'));
Route::get('/about', fn () => Inertia::render('About'));

