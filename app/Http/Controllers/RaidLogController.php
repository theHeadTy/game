<?php

namespace App\Http\Controllers;

use App\Models\RaidCrew;
use App\Models\RaidLog;
use App\Jobs\Raids\CreateRaidLog;
use Illuminate\Http\Request;
use App\Classes\RaidAttackClass;
use App\Repositories\Contracts\RaidInterface;

class RaidLogController extends Controller
{
    private $raid;

    public function __construct(RaidInterface $raid)
    {
        $this->middleware('auth');
        $this->raid = $raid;
    }

    public function create(Request $request)
    {
        $raid = RaidCrew::find($request->id);

        if (!RaidLog::where('raids_crew_id', $raid->id)->exists()) {

            $raidAttack = new RaidAttackClass($this->raid);
            $data = $raidAttack->launchRaid($raid->id, $raid->crew_id, $raid->raid_id);
            $raiders = count($this->raid->raidUsers($raid->id, $raid->crew_id));
            $outcome = $raidAttack->getOutcome($data);

            dispatch(new CreateRaidLog($raid->raid_id, $raid->id, $raid->crew_id, $data, $raiders, $outcome));

            $logid = RaidLog::where('raids_crew_id', $raid->id)->where('crew_id', $raid->crew_id)->value('id');

            return redirect("raids/launch/{$logid}");

        } else {

            $logid = RaidLog::where('raids_crew_id', $raid->id)->where('crew_id', $raid->crew_id)->value('id');
            return redirect("raids/launch/{$logid}");
        }

    }
}
