<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Models\AttackLog;
use App\Models\UserAttack;
use Illuminate\Http\Request;
use App\Jobs\CreateUserAttack;
use App\Classes\UserAttackClass;
use App\Http\Requests\AttackFormRequest;

use App\Exceptions\CustomException;

class UserAttackController extends Controller
{
    private $user;

    public function __construct(User $user)
    {
        $this->middleware('auth');
        $this->user = $user;
    }

    public function index()
    {
        return view('attack.attack');
    }

    public function create($id, $slug)
    {

        $attack = UserAttack::where('user_id', Auth::id())
            ->where('target_id', $id)
            ->where('slug', $slug)
            ->first();

        if ($attack->completed) {
            throw new CustomException('This attack is already completed');
        }

        $user = $this->user->with('stats')->find($attack->user_id);

        $target = $this->user->with('stats')->find($attack->target_id);

        $pvp = new UserAttackClass($user, $target);

        $attackArr = $pvp->userAttack($attack->attacks);

        return view('attack.create', [
            'username' => $user->name,
            'targetname' => $target->name,
            'attackArr' => $attackArr
        ]);
    }

    public function store(AttackFormRequest $request)
    {
        $user = $this->user->where('name', $request->name)->first();

        $slug = str_random(18);

        $attackCap = UserAttack::where('user_id', Auth::id())
            ->where('target_id', $user->id)
            ->where('completed', 1)
            ->count();

        if ($attackCap >= Auth::user()->stats->rage_cap) {
            throw new CustomException('You have capped out your attacks on this user! Wait until tomorrow or upgrade your cap!');
        }

        dispatch(new CreateUserAttack(Auth::id(), $user->id, $slug, $request->attacks));

        return redirect("attack/{$user->id}/{$slug}");

    }

    public function attack($id)
    {
        $slug = str_random(18);

        $attackCap = UserAttack::where('user_id', Auth::id())
            ->where('target_id', $id)
            ->count();

        if ($attackCap >= Auth::user()->stats->rage_cap) {
            abort(404, 'Error: You have already attacked this player max amount of times today. Try tomorrow!');
        }

        dispatch(new CreateUserAttack(Auth::id(), $id, $slug, 10));

        return redirect("attack/{$id}/{$slug}");

    }

    public function search(Request $request)
    {
        if (!$request->name) {
            $users = $this->user->with('stats')->paginate(50);
        } else {
            $users = $this->user->with('stats')
                ->where('name', 'like', $request->name . '%')
                ->paginate(50);
        }

        return view('attack.search', compact('users'));

    }

    public function log($type)
    {
        if ($type == 'out') {
            $logs = AttackLog::with('user')
                ->where('user_id', Auth::id())
                ->where('type', 'out')
                ->paginate(10);
        } elseif ($type == 'in') {
            $logs = AttackLog::with('target')
                ->where('target_id', Auth::id())
                ->where('type', 'in')
                ->paginate(10);
        }

        return view('attack.log', compact('logs'));
    }
}
