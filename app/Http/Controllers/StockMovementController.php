<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockMovementController extends Controller
{
   
    public function index()
    {
        return Inertia::render('Stock/Index', [
            'movements' => StockMovement::with('product')
                ->latest()
                ->get(),

            'products' => Product::orderBy('name')->get(),
        ]);
    }

    /**
     * Ajouter un mouvement de stock
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'type'       => 'required|in:in,out,adjustment',
            'quantity'   => 'required|integer|min:1',
            'reason'     => 'nullable|string|max:255',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        $before = $product->stock;

       
        if ($validated['type'] === 'in') {
            $product->stock += $validated['quantity'];
        }

        if ($validated['type'] === 'out') {
           
            $product->stock = max(0, $product->stock - $validated['quantity']);
        }

        if ($validated['type'] === 'adjustment') {
            $product->stock = $validated['quantity'];
        }

        $product->save();

        
        StockMovement::create([
            'product_id'    => $product->id,
            'type'          => $validated['type'],
            'quantity'      => $validated['quantity'],
            'stock_before'  => $before,
            'stock_after'   => $product->stock,
            'reason'        => $validated['reason'],
        ]);

        return redirect()
            ->back()
            ->with('success', 'Stock mis à jour avec succès.');
    }
}