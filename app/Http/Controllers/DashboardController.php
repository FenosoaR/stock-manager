<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Client;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
{
    $query = Product::with('category');

    
    if ($request->search) {
        $query->where(function ($q) use ($request) {
            $q->where('name', 'like', '%' . $request->search . '%')
              ->orWhere('sku', 'like', '%' . $request->search . '%');
        });
    }

    if ($request->category_id) {
        $query->where('category_id', $request->category_id);
    }

    if ($request->stock) {
        if ($request->stock === 'low') {
            $query->where('stock', '<', 10);
        }

        if ($request->stock === 'out') {
            $query->where('stock', 0);
        }
    }

    return Inertia::render('Dashboard', [


        'totalProducts' => Product::count(),
        'totalClients' => Client::count(),
        'totalCategories' => Category::count(),

        'lowStockProducts' => Product::where('stock', '<', 10)->count(),
        'outOfStockProducts' => Product::where('stock', 0)->count(),

   
        'products' => $query->latest()->paginate(10)->withQueryString(),

        'categories' => Category::all(),

       
        'filters' => $request->only(['search', 'category_id', 'stock']),

        'latestProducts' => Product::with('category')
            ->latest()
            ->take(5)
            ->get(),
    ]);
}
}
