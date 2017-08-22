<?php

namespace App\Http\Controllers;

use App\Mob;
use App\Quest;
use Illuminate\Http\Request;

class QuestController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function show($id)
    {
        return Quest::with('mob')->find($id);
    }
}
