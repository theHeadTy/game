<?php

namespace App\Repositories\Contracts;

use App\User;

interface UserInterface
{
    public function isOnline($id);

    public function inCrew(): bool;

    public function userCrew();

    public function crewId();

    public function crewUsers();

    public function whereInName($names);

}
