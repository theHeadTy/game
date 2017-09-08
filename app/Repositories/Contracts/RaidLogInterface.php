<?php
namespace App\Repositories\Contracts;

interface RaidLogInterface
{
    public function find($id);

    public function id($id, $crewid);
}
