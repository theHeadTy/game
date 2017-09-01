<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use Carbon\Carbon;
use App\Models\Mob;
use App\Models\Quest;
use App\Models\MobKill;
use App\Models\UserStat;
use App\Classes\MobAttackClass;
use Illuminate\Http\Request;

class MobController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function test()
    {

        $mobs = Mob::where('world_id', 1)->with('stats')->get();

        $spawn = [];

        foreach ($mobs as $mob) {
            $kill = MobKill::where('user_id', Auth::id())
                ->where('spawn_at', '>', Carbon::now())
                ->where('mob_id', $mob->id)
                ->count();
            if (!$kill) {
                $spawn[] = $mob;
            }
        }

        echo Carbon::now();

        return $spawn;


    }

    public function show(Quest $quest, $id)
    {
        return $quest->where('mob_id', $id)->with('mob')->get();
    }

    public function all($id, array $spawn = []): array
    {
        $mobs = Mob::where('world_id', 1)->with('stats')->get();

        foreach ($mobs as $mob) {
            if (!MobKill::isDead(Auth::id(), $mob->id)->count()) {
                $spawn[] = $mob;
            }
        }

        return $spawn;
    }

    public function attack($id, Mob $mob, User $user): array
    {
        $mob = $mob->with('stats')->find($id);
        $user = $user->with('stats')->find(Auth::id());

        $attack = new MobAttackClass($mob, $user);

        return $attack->mobAttack();
    }

}
