<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index() : JsonResponse {
        $products = Product::all();
        return response()->json($products);
        // return Inertia::render('Catalog', [
        //     'products' => $products
        // ]);
    }

    public function show(Product $product) : InertiaResponse {
        return Inertia::render('SingleProduct', [
            'product' => $product
        ]);
    }
}
