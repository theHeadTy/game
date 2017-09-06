<?php

namespace App\Http\Controllers;

use App\Classes\GenerateItemClass;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        $item = new GenerateItemClass();
        return $item->generate(2);
    }
}
