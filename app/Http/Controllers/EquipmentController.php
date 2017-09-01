<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Models\Item;
use App\Models\ItemStat;
use App\Models\UserItem;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index() {
        return view('equipment');
    }

    /* @todo / note - change this to index() */
    public function show()
    {

        $items = UserItem::where('user_id', Auth::user()->id)
            ->where('deleted_at', NULL)
            ->where('equipped', 1)
            ->with('item')
            ->with('stats')
            ->get();
        return $items;

    }

    public function remove($id)
    {
        $item = UserItem::find($id);
        $item->equipped = 0;
        $item->save();

        return ['Status' => 'ok'];

    }
}
