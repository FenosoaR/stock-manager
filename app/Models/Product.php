<?php

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'sku',
        'description',
        'price',
        'stock',
        'category_id',
        'status',
        'image'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}