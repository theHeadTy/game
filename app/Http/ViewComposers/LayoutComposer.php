<?php

namespace App\Http\ViewComposers;

use Auth;
use App\Models\UserCrew;
use Illuminate\View\View;
use App\Repositories\UserRepository;
use App\Repositories\RaidRepository;

class LayoutComposer
{
    protected $user;

    protected $raid;

    public function __construct(UserRepository $user, RaidRepository $raid)
    {
        $this->user = $user;
        $this->raid = $raid;
    }

    public function compose(View $view)
    {
        if (Auth::check()) {
        $inCrew = $this->user->inCrew();

        $view->with('userInCrew', $inCrew);

        if ($inCrew) {
            $inRaid = $this->raid->crewInRaid($this->user->crewId());
            $view->with('crewId', $this->user->crewId());
            $view->with('crewRaid', $inRaid);
        }
    }
    }
}
