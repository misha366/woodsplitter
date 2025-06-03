<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'price_usd' => $this->faker->randomFloat(2, 10, 100),
            'images' => json_encode([
                $this->faker->imageUrl,
                $this->faker->imageUrl,
                $this->faker->imageUrl,
                $this->faker->imageUrl
            ]),
        ];
    }
}
