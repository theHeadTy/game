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

    public function show($id)
    {
        //return Mob::with('stats')->find($id);
        //return Mob::find($id)->stats;
    }

    public function mobs($x, $y)
    {
        $mobs = Mob::where('x', $x)->where('y', $y)->get();

        // Websocket
        //event(new Mobs($mobs, $user));
        //broadcast(new Mobs($mobs, $user));

        return $mobs;
    }

    public function all($id)
    {
        $mobs = Mob::with('stats')->where('world_id', $id)->get();
        return $mobs;
    }

}
