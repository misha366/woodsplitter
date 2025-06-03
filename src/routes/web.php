<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;

Route::get('/', fn () => Inertia::render('Main'));
// Route::post('/contact', [ContactController::class, 'contact']);

// temp
Route::get('/about', fn () => Inertia::render('About'));

// Authorization - потом обработать с фортифаем
// Route::get('/login', fn () => Inertia::render('Login'))->name('login');
// Route::get('/register', fn () => Inertia::render('Register'))->name('register');
Route::middleware(['auth'])->group(function () {
    // Добавить контроллер
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    // Route::put('/user/profile-information', [ProfileController::class, 'update'])->profile('profile.update');
});

// Catalog
Route::get('/catalog', [ProductController::class, 'index'])->name('catalog');
Route::get('/catalog/{product}', [ProductController::class, 'show'])->name('single.product');

// Cart
Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::post('/cart/add/{product}', [CartController::class, 'add'])->name('cart.add');
Route::post('/cart/remove/{product}', [CartController::class, 'remove'])->name('cart.remove');
Route::put('/cart/update/{product}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

// Checkout
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
Route::post('/checkout/process', [CheckoutController::class, 'process'])->name('checkout.process');
