<?php

namespace App\Http\Controllers;

use App\World;
use Illuminate\Http\Request;

class MapController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $world = World::find(1);
        return view('world.world', compact('world'));
    }

    public function show($id)
    {
        $world = World::find($id);

        return $world;
    }
}
