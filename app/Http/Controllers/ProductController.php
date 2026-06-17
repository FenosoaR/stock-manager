<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
     return Inertia::render('Products/Index' , [
        'products' => Product::with('category')->latest()->paginate(10)
     ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Products/Create' , [
            'categories' => Category::latest()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required',
        'sku' => 'required',
        'description' => 'nullable',
        'price' => 'required|numeric',
        'stock' => 'required|integer',
        'category_id' => 'required|exists:categories,id',
        'status' => 'required',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    $imagePath = null;

    if ($request->hasFile('image')) {
        $file = $request->file('image');

        $filename = Str::random(20) . '.' . $file->getClientOriginalExtension();

        $imagePath = $file->storeAs('products', $filename, 'public');
    }

    Product::create([
        'name' => $request->name,
        'sku' => $request->sku,
        'description' => $request->description,
        'price' => $request->price,
        'stock' => $request->stock,
        'category_id' => $request->category_id,
        'status' => $request->status,
        'image' => $imagePath,
    ]);

    return redirect()->route('products.index');
}

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
       return Inertia::render('Products/Edit' , [
        'product' => $product,
        'categories' => Category::latest()->get()
       ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
{
    $request->validate([
        'name' => 'required',
        'sku' => 'required',
        'description' => 'nullable',
        'price' => 'required|numeric',
        'stock' => 'required|integer',
        'category_id' => 'required|exists:categories,id',
        'status' => 'required',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    $imagePath = $product->image; // garder ancienne image par défaut

    // si nouvelle image envoyée
    if ($request->hasFile('image')) {

        // supprimer ancienne image si elle existe
        if ($product->image && \Illuminate\Support\Facades\Storage::disk('public')->exists($product->image)) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($product->image);
        }

        $file = $request->file('image');

        $filename = \Illuminate\Support\Str::random(20) . '.' . $file->getClientOriginalExtension();

        $imagePath = $file->storeAs('products', $filename, 'public');
    }

    $product->update([
        'name' => $request->name,
        'sku' => $request->sku,
        'description' => $request->description,
        'price' => $request->price,
        'stock' => $request->stock,
        'category_id' => $request->category_id,
        'status' => $request->status,
        'image' => $imagePath,
    ]);

    return redirect()->route('products.index');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index');
    }
}
