<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Item;
use App\ItemStat;
use App\UserItem;
use Illuminate\Http\Request;

class BackpackController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($which)
    {
        $limit = ($which === 'Quest') ? 1 : 999;
        $userid = Auth::user()->id;

        $items = Item::with('stats')
            ->join('user_items', 'items.id', '=', 'user_items.item_id')
            ->select('items.*', 'user_items.id as iid', 'user_items.user_id')
            ->where('items.type', $which)
            ->where('user_items.equipped', 0)
            ->limit($limit)
            ->get();

        $totalItems = count($items);
        $bpSpace = (25 - $totalItems);

        return view('backpack', compact('items', 'totalItems', 'bpSpace'));
    }
}
