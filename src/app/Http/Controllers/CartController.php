<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index() : InertiaResponse {
        return Inertia::render('Cart');
    }

    public function add(Request $request) : RedirectResponse {
        // ??? add to cart logic
        return redirect()->route('cart.index');
    }

    public function remove(Request $request) : RedirectResponse {
        // ??? remove from cart logic
    }

    public function update(Request $request) : RedirectResponse {
        // ??? update cart logic
    }

    public function clear() : RedirectResponse {
        // ??? clear cart logic
    }
}
