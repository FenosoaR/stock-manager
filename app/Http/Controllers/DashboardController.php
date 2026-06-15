<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
   public function index(){

    return Inertia::render('Dashboard' , [
        'totalProducts' => '30',
        'totalClients' =>'20',
        'lowStockProducts' => '3'
    ]);
   }
}
