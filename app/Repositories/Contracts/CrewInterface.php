<?php

namespace App\Repositories\Contracts;

interface CrewInterface
{
    public function find($id);

    public function users($id);
}
