<?php

namespace App\Repositories;

use App\Models\Item;
use App\Models\UserItem;
use App\Repositories\Contracts\ItemInterface;

class ItemRepository implements ItemInterface
{
    protected $item;

    protected $user;

    public function __construct(Item $item, UserItem $user)
    {
        $this->item = $item;
        $this->user = $user;
    }

    public function find($id)
    {
        return $this->item->find($id);
    }

    public function findUserItem($id)
    {
        return $this->user->find($id);
    }

    public function userItems($id)
    {
        return $this->user->where('user_id', $id)
            //->where('equipped', 1)
            ->with('item')->with('stats')
            ->get();
    }
}
