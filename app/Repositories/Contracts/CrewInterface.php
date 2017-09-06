<?php

namespace App\Repositories\Contracts;

interface CrewInterface
{

    public function find($id);

    public function findOrFail($id);

    public function findOrFailInvite($id);

    public function users($id);

    public function ranks($id);

    public function permissions($id);

    public function idByLeader($id);

    public function invitesWhereUserId($id);

}
