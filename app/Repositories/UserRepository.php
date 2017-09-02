<?php

namespace App\Repositories;

use Auth;
use App\User;
use App\Models\UserCrew;
use App\Repositories\Contracts\UserInterface;

class UserRepository implements UserInterface
{
    public $user;

    public $crew;

    public function __construct(User $user, UserCrew $crew)
    {
        $this->user = $user;
        $this->crew = $crew;
    }

    /**
     * Creates a check to see if the authenticated user is in a crew.
     *
     * @return bool
     */
    public function inCrew(): bool
    {
        return $this->crew->where('user_id', Auth::id())->count() ?? false;
    }

    public function userCrew()
    {
        return $this->user->with('crew')->find(Auth::id());
    }

    public function crewId(): int
    {
        return $this->crew->where('user_id', Auth::id())->value('crew_id');
    }

    public function crewUsers()
    {
        return $this->crew->with('user')
            ->with('user.stats')
            ->where('crew_id', $this->crewId())
            ->get();
    }

    public function whereInName($names)
    {
        return $this->user->whereIn('name', $names)->get();
    }

}
