<?php

namespace App\Http\Controllers;

use App\Traits\CrewTrait;
use Illuminate\Http\Request;
use App\Models\CrewPermission;
use App\Repositories\Contracts\UserInterface;
use App\Repositories\Contracts\CrewInterface;

class CrewPermissionController extends Controller
{
    use CrewTrait;

    private $user;

    private $crew;

    public function __construct(UserInterface $user, CrewInterface $crew)
    {
        $this->middleware('auth');
        $this->user = $user;
        $this->crew = $crew;
    }

    public function index()
    {
        $crewid = $this->user->crewId();

        $perms = $this->crew->permissions($crewid);

        $names = $this->permissionsArray();

        return view('crews.permissions', compact('names', 'perms'));
    }

    public function update(Request $request)
    {
        foreach ($request->ranks as $rank) {


            $crew = CrewPermission::where('crew_id', $this->user->crewId())
                ->where('rank_id',  $rank['rid'])
                ->update([
                    'edit' => $rank['edit']['checked'],
                    'boot' => $rank['boot']['checked'],
                    'invites' => $rank['invites']['checked'],
                    'hitlist' => $rank['hitlist']['checked'],
                    'ranks' => $rank['ranks']['checked'],
                    'bank' => $rank['bank']['checked'],
                    'raids' => $rank['raids']['checked'],
                    'vault' => $rank['vault']['checked'],
                    'shop' => $rank['shop']['checked'],
                    'message' => $rank['message']['checked'],
                    'permissions' => $rank['permissions']['checked']
                ]);

        }

        return ['status' => 'Permissions have been updated!'];
    }

}
