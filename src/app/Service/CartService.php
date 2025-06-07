<?php

namespace App\Service;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use App\Models\CartItem;
use Illuminate\Http\RedirectResponse;

class CartService
{
    /**
     * Get the cart in array format
     * 
     * @return array
     * [
     *  [
     *      "product_id" => 9
     *      "quantity" => 2
     *      "title" => "Sit veritatis qui odit."
     *      "price_usd" => "31.29"
     *      "images" => "[...]"
     *  ]
     * ]
     * 
     * Метод кэшируется, потому что содержит очень дорогие операции как для ререндера
     * каждого компонента.
     * 
     */
    public function getCartInArray() : array {
        if (Auth::check()) {
            $cacheKey = 'cart:user:' . Auth::user()->id;

            return cache()->rememberForever($cacheKey, function () {
                return CartItem::with('product')
                    ->where('user_id', Auth::user()->id)
                    ->get()
                    ->map(function ($item) {
                        return [
                            'product_id' => $item->product_id,
                            'quantity' => $item->quantity,
                            'title' => $item->product->title,
                            'price_usd' => $item->product->price_usd,
                            'images' => $item->product->images,
                        ];
                    })->toArray();
                });
        }

        $sessionCart = session()->get('cart', []);
        $cacheKey = 'cart:guest:' . sha1(json_encode($sessionCart));

        return cache()->rememberForever($cacheKey, function () use ($sessionCart) {
            $products = Product::whereIn('id', array_keys($sessionCart))->get()->keyBy('id');

            return collect($sessionCart)->map(function ($quantity, $productId) use ($products) {
                $product = $products[$productId] ?? null;
                if (!$product) return null;

                return [
                    'product_id' => $productId,
                    'quantity' => $quantity,
                    'title' => $product->title,
                    'price_usd' => $product->price_usd,
                    'images' => $product->images,
                ];
            })->filter()->values()->toArray();
        });

    }

    /*
    * 
    * 
    * 
    *  Controller methods
    * 
    * 
    */
    public function addToCart(array $data) : RedirectResponse
    {
        $validator = Validator::make($data, [
            'product_id' => 'required|exists:products,id'
        ]);

        if ($validator->fails()) {
            $response = redirect()->back()->withErrors($validator->errors())->withInput();
            $response->setStatusCode(303);
            return $response;
        }

        $productId = $data['product_id'];

        $this->clearCartCache();

        if (Auth::check()) {
            
            $userId = Auth::user()->id;
            $cartItem = CartItem::where('user_id', $userId)
                ->where('product_id', $productId);
            
            if ($cartItem->exists()) {
                $cartItem->increment('quantity');
            } else {
                CartItem::create([
                    'user_id' => $userId,
                    'product_id' => $productId,
                    'quantity' => 1
                ]);
            }

        } else {

            // cart =[
            //  product_id => quantity,
            //  product_id => quantity,
            //  product_id => quantity
            // ]
            $cart = session()->get('cart', []);
            
            if (isset($cart[$productId])) {
                $cart[$productId]++;
            } else {
                $cart[$productId] = 1;
            }
            
            session()->put('cart', $cart);
        }

        return redirect()->back()->setStatusCode(303);
    }

    public function removeFromCart(int $productId) : RedirectResponse {
        $this->clearCartCache();
    
        if (Auth::check()) {
            CartItem::where('user_id', Auth::user()->id)
                ->where('product_id', $productId)
                ->delete();
        } else {
            $cart = session()->get('cart', []);
            
            if (isset($cart[$productId])) {
                unset($cart[$productId]);
                session()->put('cart', $cart);
            }
        }

        return redirect()->back()->setStatusCode(303);
    }

    public function addOneToProduct(array $data) : RedirectResponse {
        $validator = Validator::make($data, [
            'product_id' => 'required|exists:products,id'
        ]);

        if ($validator->fails()) {
            $response = redirect()->back()->withErrors($validator->errors())->withInput();
            $response->setStatusCode(303);
            return $response;
        }

        $productId = $data['product_id'];

        $this->clearCartCache();

        if (Auth::check()) {
            $cartItem = CartItem::where('user_id', Auth::id())
                ->where('product_id', $productId);

            if ($cartItem->exists()) {
                $cartItem->increment('quantity');
            } else {
                throw new \Exception('Cart item not found');
            }
        } else {
            $cart = session()->get('cart', []);

            if (isset($cart[$productId])) {
                $cart[$productId]++;
                session()->put('cart', $cart);
            } else {
                throw new \Exception('Cart item not found');
            }
        }

        return redirect()->back()->setStatusCode(303);
    }

    public function removeOneFromProduct(array $data) : RedirectResponse {
        $validator = Validator::make($data, [
            'product_id' => 'required|exists:products,id'
        ]);

        if ($validator->fails()) {
            $response = redirect()->back()->withErrors($validator->errors())->withInput();
            $response->setStatusCode(303);
            return $response;
        }

        $productId = $data['product_id'];

        $this->clearCartCache();
        
        if (Auth::check()) {
            $cartItem = CartItem::where('user_id', Auth::id())
                ->where('product_id', $productId);
            
            if ($cartItem->exists()) {
                if ($cartItem->first()->quantity > 1) {
                    $cartItem->decrement('quantity');
                } else {
                    $cartItem->delete();
                }
            } else {
                throw new \Exception('Cart item not found');
            }
        } else {
            $cart = session()->get('cart', []);

            if (isset($cart[$productId])) {
                if ($cart[$productId] > 1) {
                    $cart[$productId]--;
                    session()->put('cart', $cart);
                } else {
                    unset($cart[$productId]);
                    session()->put('cart', $cart);
                }
            } else {
                throw new \Exception('Cart item not found');
            }
        }

        return redirect()->back()->setStatusCode(303);
    }

    public function clearCart() : RedirectResponse {
        $this->clearCartCache();
        
        if (Auth::check()) {
            CartItem::where('user_id', Auth::user()->id)->delete();
        } else {
            session()->forget('cart');
        }

        return redirect()->back()->setStatusCode(303);
    }

    public function mergeCartSessionToDatabase(int $userId) : void {
        $sessionCart = session()->get('cart', []);
        if (empty($sessionCart)) {
            return;
        }

        $this->clearCartCache();
        
        foreach ($sessionCart as $productId => $quantity) {
            $existing = CartItem::where('user_id', $userId)
                ->where('product_id', $productId)
                ->first();

            if ($existing) {
                $existing->update(['quantity' => $quantity]);
            } else {
                CartItem::create([
                    'user_id' => $userId,
                    'product_id' => $productId,
                    'quantity' => $quantity
                ]);
            }
        }

        session()->forget('cart');
    }

    private function clearCartCache() : void {
        if (Auth::check()) {
            $cacheKey = 'cart:user:' . Auth::user()->id;
            cache()->forget($cacheKey);
        } else {
            $sessionCart = session()->get('cart', []);
            $cacheKey = 'cart:guest:' . sha1(json_encode($sessionCart));
            cache()->forget($cacheKey);
        }
    }
}