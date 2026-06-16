<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            ['Jean', 'Dupont'],
            ['Marie', 'Rakoto'],
            ['Paul', 'Martin'],
            ['Lucie', 'Bernard'],
            ['Andry', 'Ranaivo'],
            ['Sarah', 'Lopez'],
            ['David', 'Rasol'],
            ['Emma', 'Moreau'],
            ['Hery', 'Rakoto'],
            ['Nina', 'Rabe'],
            ['Kevin', 'Smith'],
            ['Laura', 'Rana'],
        ];

        foreach ($clients as $c) {
            Client::create([
                'first_name' => $c[0],
                'last_name' => $c[1],
                'email' => strtolower($c[0]) . '@example.com',
                'phone' => '03' . rand(10000000, 99999999),
                'address' => 'Adresse test',
                'city' => 'Antananarivo',
                'country' => 'Madagascar',
                'status' => 'active',
            ]);
        }
    }
}