<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        $products = [
            ['iPhone 15', 999],
            ['Samsung S24', 899],
            ['MacBook Pro', 1999],
            ['Dell XPS 15', 1500],
            ['T-Shirt Nike', 25],
            ['Chaussure Adidas', 80],
            ['Pain de mie', 2],
            ['Chocolat', 3],
            ['Shampooing', 12],
            ['Ballon de foot', 20],
            ['Clavier mécanique', 120],
            ['Souris gaming', 60],
            ['Voiture miniature', 15],
            ['Livre Laravel', 30],
            ['Huile moteur', 40],
        ];

        foreach ($products as $index => $p) {
            Product::create([
                'name' => $p[0],
                'sku' => 'SKU-' . rand(1000, 9999),
                'description' => "Description de " . $p[0],
                'price' => $p[1],
                'stock' => rand(5, 100),
                'category_id' => $categories->random()->id,
                'status' => 'active',
                'image' => null,
            ]);
        }
    }
}