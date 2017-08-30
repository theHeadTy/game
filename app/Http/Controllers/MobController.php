<?php

namespace App\Http\Controllers;

use Auth;
use App\Mob;
use App\User;
use App\Quest;
use App\Events\Mobs;
use App\UserStat;
use App\Http\Traits\AttackTrait;
use Illuminate\Http\Request;

class MobController extends Controller
{
    use AttackTrait;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function update(Request $request)
    {
        $exp = $request->input('exp');
        $gold = $request->input('gold');
        $cost = $request->input('cost');

        $user = UserStat::where('user_id', Auth::user()->id);

        $user->increment('exp', $exp);
        $user->increment('gold', $gold);
        $user->decrement('rage', $cost);

    }

    public function show(Quest $quest, $id)
    {
        return $quest->where('mob_id', $id)->with('mob')->get();
    }


    public function mobs($x, $y): Mob
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

    public function attack($id): array
    {
        return $this->mobAttack($id);
    }

}
