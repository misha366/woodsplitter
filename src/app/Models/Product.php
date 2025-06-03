<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\CartItem;
use App\Models\OrderItem;

class Product extends Model
{
    use SoftDeletes;

    public function cartItems(): HasMany {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems(): HasMany {
        return $this->hasMany(OrderItem::class);
    }

    protected $fillable = [
        'title',
        'description',
        'price_usd',
        'images',
    ];
}
