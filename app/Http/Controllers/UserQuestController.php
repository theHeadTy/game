<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Quest;
use App\Models\UserQuest;
use Illuminate\Http\Request;

class UserQuestController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store($id)
    {
        $inQuest = UserQuest::where('quest_id', $id)
            ->where('user_id', Auth::user()->id)
            ->where('completed', 0)
            ->first();

        //dd($inQuest);

        if (!$inQuest) {

            $quest = Quest::find($id);

            // Insert the new Quest..
            $userQuest = new UserQuest;
            $userQuest->quest_id = $quest->id;
            $userQuest->user_id = Auth::user()->id;
            $userQuest->step_id = 1;
            $userQuest->completed = 0;
            //$userQuest->completed_at = NULL;
            $userQuest->save();

        }
    }

    public function kills($questId, $mobId)
    {
        $count = QuestKills::where('user_id', Auth::user()->id)
            ->where('quest_id', $questId)
            ->where('mob_id', $mobId)
            ->count();

        return ['kills' => $count];
    }
}
