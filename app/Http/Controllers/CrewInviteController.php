<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Models\UserCrew;
use App\Models\CrewInvite;
use Illuminate\Http\Request;
use App\Exceptions\CustomException;
use App\Repositories\Contracts\UserInterface;
use App\Repositories\Contracts\CrewInterface;

class CrewInviteController extends Controller
{
    public $user;

    public $crew;

    public function __construct(UserInterface $user, CrewInterface $crew)
    {
        $this->middleware('auth');
        $this->user = $user;
        $this->crew = $crew;
    }

    public function index()
    {
        if ($this->user->inCrew())
        {
            throw new CustomException('You are already in a crew.');
        }

        $invites = CrewInvite::where('user_id', Auth::id())->paginate(10);

        return view('crews.invites', compact('invites'));
    }

    public function accept($id)
    {
        if ($this->user->inCrew()) {
            throw new CustomException('You are already in a crew.');
        }

        $invite = CrewInvite::findOrFail($id);

        $crew = $this->crew->find($invite->crew_id);

        $user = new UserCrew;
        $user->user_id = Auth::id();
        $user->crew_id = $crew->id;
        $user->rank_id = 5;
        $user->save();

        $invite->delete();

        return redirect("crews/profile/{$user->crew_id}");

    }

    public function deny($id)
    {
        $invite = CrewInvite::findOrFail($id);
        $invite->delete();

        return redirect('crews/invites');
    }

    public function store(Request $request, $sent = 0)
    {
        $crew = $this->user->userCrew();

        $names = explode(',', $request->names);
        $users = $this->user->whereInName($names);
        foreach ($users as $user) {
            if (!$user->crew) {
                $invite = new CrewInvite;
                $invite->user_id = $user->id;
                $invite->crew_id = $crew->crew->id;
                $invite->save();
                ++$sent;
            }
        }
        dd($users);
        $request->session()->flash('message', "{$sent} invites have been sent!");
        return redirect('crews/manage');

    }

}
