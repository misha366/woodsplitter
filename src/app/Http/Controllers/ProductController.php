<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    public function index() : InertiaResponse {
        $products = Product::all();
        return Inertia::render('Catalog', [
            'products' => $products
        ]);
    }

    public function show(Product $product) : InertiaResponse {
        return Inertia::render('SingleProduct', [
            'product' => $product
        ]);
    }
}
