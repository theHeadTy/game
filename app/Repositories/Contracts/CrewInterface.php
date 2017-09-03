<?php

namespace App\Repositories\Contracts;

interface CrewInterface
{

    public function find($id);

    public function users($id);

    public function ranks($id);

    public function permissions($id);

    public function idByLeader($id);


}
