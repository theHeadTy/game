<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Models\UserAttack;
use Illuminate\Http\Request;
use App\Jobs\CreateUserAttack;
use App\Classes\UserAttackClass;
use App\Http\Requests\AttackFormRequest;

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

        $attack = UserAttack::createAttack($slug, Auth::id(), $id)->first();

        if (!$attack || $attack->completed) {
            abort(500, 'Error: This attack is already completed!');
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

        /*
        $attack = new UserAttack;
        $attack->user_id = Auth::id();
        $attack->target_id = $user->id;
        $attack->slug = str_random(18);
        $attack->attacks = $request->attacks;
        $attack->save();
        */

        $slug = str_random(18);

        dispatch(new CreateUserAttack(Auth::id(), $user->id, $slug, $request->attacks));

        return redirect("attack/{$user->id}/{$slug}");

        //return redirect("attack/{$attack->target_id}/{$attack->slug}");
    }

    public function attack($id)
    {

        //$user = $this->user->find($id);

        /*$attack = new UserAttack;
        $attack->user_id = Auth::id();
        $attack->target_id = $user->id;
        $attack->slug = str_random(18);
        $attack->attacks = 10;
        $attack->save();
        */

        $slug = str_random(18);

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
}
