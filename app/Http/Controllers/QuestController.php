<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Mob;
use App\Models\Quest;
use App\Models\UserQuest;
use App\Models\QuestStep;
use Illuminate\Http\Request;

class QuestController extends Controller
{

    public function show($id)
    {

        $quest = Quest::find($id);

        $users = UserQuest::where('quest_id', $id)
            ->where('user_id', Auth::user()->id)
            ->first();

        if ($users) {

            return ['inQuest' => true];

        } elseif (!$users) {

            return ['inQuest' => false];

        }

    }


    public function mob($id)
    {
        return Mob::find($id);
    }

/*
    protected function store($id)
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
            $userQuest->completed_at = NULL;
            $userQuest->save();

        }
    }
    */
}
