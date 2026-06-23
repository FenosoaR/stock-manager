<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    public function definition(): array
{
    return [
        'first_name' => fake()->firstName(),
        'last_name' => fake()->lastName(),
        'email' => fake()->unique()->safeEmail(),
        'phone' => fake()->numerify('03########'),
        'address' => fake()->streetAddress(),
        'city' => fake()->randomElement([
            'Antananarivo',
            'Toamasina',
            'Mahajanga',
            'Fianarantsoa',
            'Toliara',
            'Antsirabe'
        ]),
        'country' => 'Madagascar',
        'status' => fake()->randomElement(['active', 'inactive']),
    ];
}
}