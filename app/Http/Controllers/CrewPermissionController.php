<?php

namespace App\Http\Controllers;

use App\Traits\CrewTrait;
use Illuminate\Http\Request;
use App\Models\CrewRank;
use App\Repositories\Contracts\UserInterface;
use App\Repositories\Contracts\CrewInterface;

class CrewPermissionController extends Controller
{
    use CrewTrait;

    public $crew;

    public function __construct(CrewInterface $crew)
    {
        $this->middleware('auth');
        $this->crew = $crew;
    }

    public function index(UserInterface $user)
    {
        $crewid = $user->crewId();

        $ranks = $this->crew->ranks($crewid);

        $permissions = $this->permissionsArray();

        $roles = $this->crew->permissions($crewid);

        return view('crews.permissions', compact('ranks', 'permissions', 'roles'));
    }

}
