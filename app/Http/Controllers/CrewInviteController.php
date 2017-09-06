<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Models\UserCrew;
use App\Models\CrewInvite;
use Illuminate\Http\Request;
use App\Jobs\Crew\CreateUserCrew;
use App\Jobs\Crew\CreateCrewInvite;
use App\Exceptions\CustomException;
use App\Repositories\Contracts\UserInterface;
use App\Repositories\Contracts\CrewInterface;

class CrewInviteController extends Controller
{
    /**
     * @var $user
     */
    private $user;
    /**
     * @var $crew
     */
    private $crew;

    /**
     * Crew invite controller instance
     *
     * @param UserInterface $user - User Repository
     * @param CrewInterface $crew - Crew Repository
     * @return void
     */
    public function __construct(UserInterface $user, CrewInterface $crew)
    {
        $this->middleware('auth');
        $this->user = $user;
        $this->crew = $crew;
    }

    /**
     * View crew invites
     *
     * @throws \App\Exceptions\CustomException
     */
    public function index()
    {
        if ($this->user->inCrew())
        {
            throw new CustomException('You are already in a crew.');
        }

        $invites = $this->crew->invitesWhereUserId(Auth::id())->paginate(10);

        return view('crews.invites', compact('invites'));
    }

    /**
     * Accept crew invite
     *
     * @param int $id
     * @throws \App\Exceptions\CustomException
     */
    public function accept($id)
    {
        if ($this->user->inCrew()) {
            throw new CustomException('You are already in a crew.');
        }

        $invite = $this->crew->findOrFailInvite($id);
        $crew = $this->crew->find($invite->crew_id);

        dispatch(new CreateUserCrew(Auth::id(), $crew->id, 5));

        $invite->delete();

        return redirect("crews/profile/{$crew->id}");

    }

    /**
     * Deny crew invite
     *
     * @param int $id - Id of the invite
     */
    public function deny($id)
    {
        $invite = $this->crew->findOrFailInvite($id);
        $invite->delete();
        return redirect('crews/invites');
    }

    /**
     * Store crew invite
     *
     * @param \Illuminate\Http\Request $request
     * @param int $sent
     */
    public function store(Request $request, $sent = 0)
    {
        $crewid = $this->user->crewId();
        $names = explode(',', $request->names);
        $users = $this->user->whereInName($names);
        foreach ($users as $user) {
            if (!$user->crew) {
                dispatch(new CreateCrewInvite($user->id, $crewid));
                ++$sent;
            }
        }
        $request->session()->flash('message', "{$sent} invites have been sent!");
        return redirect('crews/manage');

    }

}
