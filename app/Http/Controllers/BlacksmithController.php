<?php

namespace App\Http\Controllers;

use Auth;
use App\Traits\ItemTrait;
use Illuminate\Http\Request;
use App\Http\Requests\BlacksmithRequest;
use App\Repositories\Contracts\ItemInterface;

class BlacksmithController extends Controller
{
    use ItemTrait;

    private $item;

    public function __construct(ItemInterface $item)
    {
        $this->middleware('auth');
        $this->item = $item;
    }

    public function index()
    {
        $items = $this->item->userItems(Auth::id());

        return view('blacksmith', compact('items'));
    }

    public function gem(BlacksmithRequest $request)
    {
        $item = $this->item->findUserItem($request->id);

        $cost = $this->createGemCost($item->item->rarity, $item->gems);

        $item->increment('gems', 1);

        $user = Auth::user();
        $user->decrement('points', $cost);

        return [
            'status' => "{$item->item->name} gemmed to {$item->gems} cost {$cost}",
        ];

    }
}
