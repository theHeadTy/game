<?php
namespace App\Repositories\Contracts;

interface RaidInterface
{

    public function find($id);

    public function findRaidCrew($id);

    public function findByMap($id);

    public function hasLaunched($id, $crewid);

    public function raidUsers($id, $crewid);

    public function crewInRaid($crewid);

    public function userInRaid($id, $userid);

}
