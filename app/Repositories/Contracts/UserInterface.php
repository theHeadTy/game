<?php

namespace App\Repositories\Contracts;

interface UserInterface
{
    public function inCrew(): bool;

    public function userCrew();

    public function crewId(): int;

    public function crewUsers();

    public function whereInName($names);

}
