<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\CartItem;
use App\Service\CartService;

class MergeCartSessionToDatabase
{
    /**
     * Create the event listener.
     */
    public function __construct(
        private CartService $cartService
    )
    {}

    /**
     * Handle the event.
     */
    public function handle(Login|Registered $event): void
    {
        $userId = $event->user->id;
        $this->cartService->mergeCartSessionToDatabase($userId);        
    }
}
