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
        $products = Product::all();
        return Inertia::render('Catalog', [
            'products' => $products
        ]);
    }

    public function show(Product $product) : Response {
        return Inertia::render('SingleProduct', [
            'product' => $product
        ]);
    }
}
