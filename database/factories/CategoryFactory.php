<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{

public function definition(): array
{
    $categories = [
        'Informatique',
        'Téléphonie',
        'Gaming',
        'Réseau',
        'Stockage',
        'Audio',
        'Sécurité',
        'Accessoires',
        'Imprimantes',
        'Moniteurs',
        'Composants PC',
        'Ordinateurs Portables',
        'Ordinateurs Bureau',
        'Tablettes',
        'Smart Home',
        'Câbles',
        'Serveurs',
        'Logiciels',
        'Bureautique',
        'Électronique'
    ];

    $name = fake()->unique()->randomElement($categories);

    return [
        'name' => $name,
        'slug' => Str::slug($name),
        'description' => fake()->sentence(),
        'status' => 'active',
    ];
}
}