<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Électronique',
            'Vêtements',
            'Alimentation',
            'Maison',
            'Beauté',
            'Sport',
            'Informatique',
            'Jouets',
            'Automobile',
            'Livres',
        ];

        foreach ($categories as $cat) {
            Category::create([
                'name' => $cat,
                'slug' => Str::slug($cat),
                'description' => "Catégorie $cat",
                'status' => 'active',
            ]);
        }
    }
}