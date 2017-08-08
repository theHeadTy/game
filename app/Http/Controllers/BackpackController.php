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
        $limit = ($type === 'Quest') ? 1 : 999;
        $userid = Auth::user()->id;

        $items = Item::with('stats')
            ->join('user_items', 'items.id', '=', 'user_items.item_id')
            ->select('items.*', 'user_items.id as iid', 'user_items.user_id')
            ->where('items.type', $type)
            ->where('user_items.equipped', 0)
            ->limit($limit)
            ->get();

        //$totalItems = count($items);
        //$bpSpace = (25 - $totalItems);

        return $items->toJson();

    }


    public function equip($id)
    {
        $userid = Auth::user()->id;

        $item = UserItem::with('item')->find($id);

        if ($item->user_id === $userid) {
            $equipCache = [];
            $equips = UserItem::with('item')
                ->where('user_id', $userid)
                ->where('equipped', 1)
                ->get();
            foreach ($equips as $equip) {
                if($item->item->slot === $equip->item->slot) {
                    $uitem = UserItem::find($equip->id);
                    $uitem->equipped = 0;
                    $uitem->save();

                    $citem = Item::with('stats')
                        ->join('user_items', 'items.id', '=', 'user_items.item_id')
                        ->select('items.*', 'user_items.id as iid', 'user_items.user_id')
                        ->where('user_items.id', $equip->id)
                        ->first();

                    $equipCache[] = $citem;
                }
            }
            $eitem = UserItem::find($item->id);
            $eitem->equipped = 1;
            $eitem->save();
            if ($eitem->equipped == 1) {
                return $equipCache;
            }
        }
        return;
    }
}
/*
$user_id = Auth::user()->id;
$item = ItemUser::find($item_id);
$equipped = ItemUser::where('user_id', Auth::user()->id)
    ->where('equipped', 1)
    ->get();
if ($user_id !== $item->user_id) {
    return; // not users item.
}
// Check the users equipped items against the new item's 'slot'
// if theres an item equipped, unequip it to prepare the new item
// to be equipped.
foreach ($equipped as $equip) {
    if ($item->item->id == $equip->item_id) {
        if ($equip->equipped == 1) {
            if ($equip->item->slot == $item->item->slot) {
                $equip = ItemUser::find($equip->id);
                // Unequip the item thats equipepd.
                ItemUser::where('equipped', 1)
                    ->where('id', $equip->id)
                    ->where('user_id', $user_id)
                    ->update(['equipped' => 0]);
            }
        }
    }
}
// The new item is ready to  be equipped.
$item->equipped = 1;
$item->save();
return redirect('equipment/backpack/'.$which);
//return redirect('equipment/'.$which.'/equip/'.$item->id);
*/
