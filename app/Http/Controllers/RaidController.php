<?php

namespace App\Http\Controllers;

use Auth;
use Carbon\Carbon;
use App\Models\Raid;
use App\Models\RaidCrew;
use App\Models\RaidUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Exceptions\CustomException;
use App\Repositories\Contracts\UserInterface;
use App\Repositories\Contracts\RaidInterface;

class RaidController extends Controller
{
    private $user;
    private $raid;

    public function __construct(UserInterface $user, RaidInterface $raid)
    {
        $this->middleware('auth');
        $this->user = $user;
        $this->raid = $raid;
    }

    public function index($id)
    {
        $raid = $this->raid->findByMap($id);
        return response()->json($raid);
    }

    public function show($id)
    {
        $raid = RaidCrew::where('raid_id', $id)->where('crew_id', $this->user->crewId())->get();

        return view('raids.show', compact('raid'));
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
            $crew->launch_at = Carbon::now()->addMinutes($request->time);
            $crew->message = $request->message;
            $crew->save();

            $user = new RaidUser;
            $user->raid_id = $crew->id;
            $user->user_id = Auth::id();
            $user->save();

        } catch (Throwable $e) {
            throw new CustomException($e->getMessage());
        }

        return redirect('raids/'.$crew->id);

    }
}
