<?php

namespace App\Http\Controllers;

use Auth;
use App\Mob;
use App\User;
use App\Events\Mobs;
use Illuminate\Http\Request;

class MobController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getMobs($x, $y) {

        $user = User::find(Auth::user()->id);

        $mobs = Mob::where('x', $x)->where('y', $y)->get();

        //event(new Mobs($mobs, $user));
        //broadcast(new Mobs($mobs, $user));

        return $mobs;

        //return view('world.mobs', compact('mobs'));

    }

    public function getAllMobs($id) {
        $mobs = Mob::where('world_id', $id)->get();
        return $mobs;
    }


}
