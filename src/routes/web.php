<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;

Route::get('/', fn () => Inertia::render('Main'));
// Route::post('/contact', [ContactController::class, 'contact']);

// сделать order контроллер, к которому можно будет обратится только если
// это твой ордер


// temp
Route::get('/about', fn () => Inertia::render('About'));

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', fn () => Inertia::render('Profile'))->name('profile.show');
});

// Catalog
Route::get('/catalog', [ProductController::class, 'index'])->name('catalog');
Route::get('/catalog/{product}', [ProductController::class, 'show'])->name('single.product');

// Cart
Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::post('/cart/store/', [CartController::class, 'store'])->name('cart.store');
Route::delete('/cart/remove/{productId}', [CartController::class, 'remove'])->name('cart.remove');
Route::put('/cart/add-one-to-product/', [CartController::class, 'addOneToProduct'])
    ->name('cart.addOneToProduct');
Route::put('/cart/remove-one-from-product/', [CartController::class, 'removeOneFromProduct'])
    ->name('cart.removeOneFromProduct');
Route::delete('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

// Checkout
// !!! Поменять айдишник на uuid
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
Route::post('/checkout/process', [CheckoutController::class, 'process'])->name('checkout.process');
