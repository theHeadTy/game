<?php

namespace App\Http\ViewComposers;

use Auth;
use App\Models\UserCrew;
use Illuminate\View\View;
use App\Repositories\UserRepository;

class LayoutComposer
{
    protected $user;

    public function __construct(UserRepository $user)
    {
        $this->user = $user;
    }

    public function compose(View $view)
    {
        $inCrew = $this->user->inCrew();

        $view->with('userInCrew', $inCrew);

        if ($inCrew) {
            $view->with('crewId', $this->user->crewId());
        }
    }
}
