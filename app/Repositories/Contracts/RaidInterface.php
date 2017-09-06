<?php
namespace App\Repositories\Contracts;

interface RaidInterface
{
    public function find($id);

    public function findByMap($id);
}
