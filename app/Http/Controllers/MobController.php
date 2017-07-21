<?php

namespace App\Http\Controllers;

use App\Mob;
use Illuminate\Http\Request;

class MobController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getMobs($x, $y) {

        $mobs = Mob::where('x', $x)->where('y', $y)->get();

        return view('world.mobs', compact('mobs'));

    }
}
