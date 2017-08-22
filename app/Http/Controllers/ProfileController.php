<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use Storage;
use App\UserStat;
use App\UserItem;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public $user;

    public function __construct(User $user)
    {
        $this->middleware('auth');
        $this->user = $user;
    }

    public function show($id)
    {
        $user = $this->user->findOrFail($id);
        $items = UserItem::where('user_id', $user->id)
            ->where('equipped', 1)
            ->with('item')
            ->with('stats')
            ->get();
        return view('profile.show', compact('user', 'items'));
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);

        return view('profile.edit', compact('user'));
    }

    public function update(Request $request, $id) {

        $user = User::findOrFail($id);

        $path = $request->file('avatar')->store('avatars');

        $user->avatar = $path;
        $user->save();

        return back();
    }
}
