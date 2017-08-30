<?php

namespace App\Http\Controllers;

use App\UserQuest;
use App\QuestStep;
use Illuminate\Http\Request;

class QuestStepController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function show($id)
    {

        $user = UserQuest::where('quest_id', $id)
            ->where('completed', 0)
            ->first();

        $step = QuestStep::where('quest_id', $id)
            ->where('step_id', $user->step_id)
            ->with('mob.stats')
            ->with('user')
            ->get();

        return $step;

    }

}
