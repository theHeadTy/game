<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Crew;
use App\Models\UserCrew;
use App\Models\CrewRank;
use Illuminate\Http\Request;
use App\Jobs\Crew\CreateCrew;
use App\Jobs\Crew\CreateUserCrew;
use App\Jobs\Crew\CreateCrewRanks;
use App\Jobs\Crew\CreateCrewPermission;
use App\Classes\CrewRankClass;
use App\Http\Requests\StoreCrew;
use Illuminate\Support\Facades\DB;
use App\Exceptions\CustomException;
use App\Repositories\Contracts\UserInterface;
use App\Repositories\Contracts\CrewInterface;


class CrewController extends Controller
{
    /**
     * @var $user
     */
    private $user;

    /**
     * @var $crew;
     */
    private $crew;

    /**
     * Create instance of crew controller
     *
     * @param UserInterface $user
     * @param CrewInterface $crew
     * @return void
     */
    public function __construct(UserInterface $user, CrewInterface $crew)
    {
        $this->middleware('auth');
        $this->user = $user;
        $this->crew = $crew;
    }

    /**
     * Crew Manage
     *
     * @return redirect
     */
    public function index()
    {
        if (!$this->user->inCrew()) {
            return redirect('crews/create');
        }

        $crew = $this->crew->find($this->user->crewId());

        $users = $this->crew->users($crew->id);

        return view('crews.home', compact('crew', 'users'));
    }

    /**
     * Crew Profile
     *
     * @param int $id
     * @return redirect
     */
    public function show($id)
    {
        $crew = $this->crew->find($id);

        $users = $this->crew->users($crew->id);

        return view('crews.profile', compact('crew', 'users'));
    }

    public function create()
    {
        if ($this->user->inCrew()) {
            throw new CustomException('You are already in a crew!');
        }

        return view('crews.create');
    }

    /**
     * Store new Crew
     *
     * @param App\Http\Requests\StoreCrew $request
     * @return redirect
     */
    public function store(StoreCrew $request)
    {
        $userid = Auth::id();

        dispatch(new CreateCrew($userid, $request->name, $request->description));

        $crewid = $this->crew->idByLeader($userid);

        dispatch(new CreateUserCrew($userid, $crewid, 0));

        dispatch(new CreateCrewRanks($crewid, $request->rank));

        foreach ($request->rank as $rid => $name) {
            dispatch(new CreateCrewPermission($crewid, $rid, $name));
        }

        return redirect("crews/profile/{$crewid}");


    }

}
