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

    public function index($type)
    {
        $limit = ($type === 'Quest') ? 1 : 9999;
        $userid = Auth::user()->id;

        $items = UserItem::where('equipped', 0)
            ->where('deleted_at', NULL)
            ->where('user_id', Auth::user()->id)
            ->whereHas('item', function($query) use($type) {
                $query->where('type', $type);
            })
            ->with('item')
            ->with('stats')
            ->limit($limit)
            ->get();


        return $items->toJson();

    }

    public function equip($id)
    {
        $userid = Auth::user()->id;

        //$item = UserItem::with('item')->with('stats')->find($id);
        $item = UserItem::full()->find($id);

        if ($item && $item->item->equipped == 0 && $userid == $item->user_id) {
            $slot = $item->item->slot;
            $equip = UserItem::where('user_id', Auth::user()->id)
                ->where('equipped', 1)
                ->whereHas('item', function($query) use ($slot) {
                    $query->where('slot', $slot);
                })->first();
            if ($equip) {
                $equip->equipped = 0;
                $equip->save();
            }
            $item->equipped = 1;
            $item->save();

            return ['status' => 'ok'];
        }
        return ['status' => 'fail'];
    }

    public function drop(Request $request)
    {

        $items = $request->all();

        foreach($items as $item) {
            UserItem::destroy($item);
        }

        return ['status' => 'ok'];

    }

    public function test()
    {
        /*$items = UserItem::where('equipped', 0)
            ->where('deleted_at', NULL)
            ->where('user_id', Auth::user()->id)
            ->whereHas('item', function($query) {
                $query->where('type', 'regular');
            })
            ->with('item')
            ->with('stats')
            ->get();*/

        $items = UserItem::find(1)->with('item')->with('stats')->first();

        return $items;
    }





}
