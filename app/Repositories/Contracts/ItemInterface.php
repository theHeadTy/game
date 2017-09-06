<?php

namespace App\Repositories\Contracts;

interface ItemInterface
{
    public function find($id);

    public function findUserItem($id);

    public function userItems($id);
}
