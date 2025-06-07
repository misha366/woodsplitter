<?php

namespace App\Http\Controllers;

use App\Service\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Http\RedirectResponse;
use App\Models\CartItem;

class CartController extends Controller
{

    public function __construct(
        private CartService $cartService
    ) {}

    public function index() : InertiaResponse {
        return Inertia::render('Cart');
    }

    public function store(Request $request) : RedirectResponse {
        return $this->cartService->addToCart($request->all());
    }

    public function remove(int $productId) : RedirectResponse {
        return $this->cartService->removeFromCart($productId);
    }

    public function addOneToProduct(Request $request) : RedirectResponse {
        return $this->cartService->addOneToProduct($request->all());
    }

    public function removeOneFromProduct(Request $request) : RedirectResponse {
        return $this->cartService->removeOneFromProduct($request->all());
    }

    public function clear() : RedirectResponse {
        return $this->cartService->clearCart();
    }
}
