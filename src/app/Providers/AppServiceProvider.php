<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Service\CartService;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        
        Inertia::share('auth', function () {
            return [
                'user' => Auth::user(),
            ];
        });

        Inertia::share('csrfToken', function () {
            return [
                'csrfToken' => csrf_token(),
            ];
        });

        Inertia::share('errors', function () {

            $errors = session()->get('errors');

            if (!$errors) {
                return [];
            }

            return collect($errors->getBags())
                ->flatMap(function ($bag) {
                    return collect($bag->all());
                })
                ->values()
                ->all();
        });

        Inertia::share('cart', function () {
            return app(CartService::class)->getCartInArray();
        });
    }
}
