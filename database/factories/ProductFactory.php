<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'sku' => strtoupper(fake()->unique()->bothify('SKU-####')),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 10, 5000),
            'stock' => fake()->numberBetween(0, 200),
            'category_id' => Category::inRandomOrder()->first()->id,
            'status' => fake()->randomElement(['active', 'inactive']),
            'image' => null,
        ];
}
}