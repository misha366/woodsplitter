<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    // ??? checkout logic
    public function index() : InertiaResponse {
        return Inertia::render('Checkout');
    }

    public function process(Request $request) : RedirectResponse {
        // сделать так, чтобы если пользователь авторизован, можно было смотреть заказы
        return redirect()->route('checkout.success');
    }
}
