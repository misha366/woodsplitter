<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Inertia\Response;

class ProductController extends Controller
{
    public function index() : Response {
        return Inertia::render('Catalog', [
            'products' => Product::orderBy('id', 'desc')->get()
        ]);
    }

    public function show(Product $product) : Response {
        $random = Product::where('id', '!=', $product->id)
            ->inRandomOrder()
            ->limit(10)
            ->get();
            
        return Inertia::render('SingleProduct', [
            'product' => $product,
            'random' => $random
        ]);
    }
}
