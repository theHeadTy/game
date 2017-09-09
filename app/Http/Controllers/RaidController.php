<?php

namespace App\Http\Controllers;

use Auth;
use Carbon\Carbon;
use App\Models\Crew;
use App\Models\Raid;
use App\Models\RaidLog;
use App\Models\RaidCrew;
use App\Models\RaidUser;
use Illuminate\Http\Request;
use App\Classes\RaidAttackClass;
use App\Jobs\Raids\CreateRaidLog;
use App\Jobs\Raids\CreateRaidUser;
use Illuminate\Support\Facades\DB;
use App\Exceptions\CustomException;
use App\Repositories\Contracts\UserInterface;
use App\Repositories\Contracts\RaidInterface;
use App\Repositories\Contracts\RaidLogInterface;

class RaidController extends Controller
{
    private $user;
    private $raid;
    private $log;

    public function __construct(UserInterface $user, RaidInterface $raid, RaidLogInterface $log)
    {
        $this->middleware('auth');
        $this->user = $user;
        $this->raid = $raid;
        $this->log = $log;
    }

    public function launch($id)
    {
        $log = $this->log->find($id);

        $boss = Raid::find($log->raid_id)->value('name');

        $crew = Crew::find($log->crew_id)->value('name');

        return view('raids.launch', compact('log', 'crew', 'boss'));
    }

    public function join($id)
    {
        if ($this->raid->userInRaid($id, Auth::id())) {
            return redirect("raids/crew/{$id}");
        }

        $raid = $this->raid->findRaidCrew($id);

        if ($raid->crew_id !== $this->user->crewId()) {
            throw new CustomException('You are not in this crew!');
        }

        dispatch(new CreateRaidUser($raid->id, Auth::id(), $raid->crew_id));

        return redirect("raids/crew/{$raid->id}");
    }

    public function index($id)
    {
        $raid = $this->raid->findByMap($id);
        return response()->json($raid);
    }

    public function show($id)
    {
        $raid = RaidCrew::where('id', $id)->where('crew_id', $this->user->crewId())->first();

        $users = RaidUser::where('crew_id', $raid->crew_id)->where('raid_id', $raid->id)->get();

        $inRaid = $this->raid->userInRaid($raid->id, Auth::id());

        // Raid has been scheduled to launch.
        if (Carbon::now() > $raid->launch_at) {

            // Log & redirect to raid fight.
            if (!$this->raid->hasLaunched($raid->id, $raid->crew_id)) {

                //$raidAttack = new RaidAttackClass($this->raid);
                $raidAttack = new RaidAttackClass($this->raid, $raid->raid_id, $raid->id, $raid->crew_id);
                $data = $raidAttack->launchRaid();
                //$data = $raidAttack->launchRaid($raid->id, $raid->crew_id, $raid->raid_id);


                $raiders = count($this->raid->raidUsers($raid->id, $raid->crew_id));
                $outcome = $raidAttack->getOutcome($data);

                dispatch(new CreateRaidLog($raid->raid_id, $raid->id, $raid->crew_id, $data, $raiders, $outcome));

                $logid = $this->log->id($raid->id, $raid->crew_id);

                return redirect("raids/launch/{$id}");

            } else {
                $logid = $this->log->id($raid->id, $raid->crew_id);
                return redirect("raids/launch/{$id}");
            }
        }


        return view('raids.show', compact('raid', 'users', 'inRaid'));

    }

    public function create($id)
    {
        $raid = $this->raid->find($id);
        return view('raids.create', compact('raid'));
    }

    public function store(Request $request)
    {

        try {

            $crew = new RaidCrew;
            $crew->raid_id = $request->id;
            $crew->crew_id = $this->user->crewId();
            $crew->created_by = Auth::id();
            $crew->launch_at = Carbon::now()->addMinutes($request->time);
            $crew->message = $request->message;
            $crew->save();

            dispatch(new CreateRaidUser($crew->id, Auth::id(), $crew->crew_id));

        } catch (Throwable $e) {
            throw new CustomException($e->getMessage());
        }

        return redirect('raids/crew/'.$crew->id);

    }
}
