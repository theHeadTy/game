<?php

namespace App\Http\ViewComposers;

use Auth;
use Illuminate\View\View;
use App\Repositories\Contracts\UserInterface;

class GlobalComposer
{
    protected $user;

    public function __construct(UserInterface $user)
    {
        $this->user = $user;
    }

    public function compose(View $view)
    {
        $view->with('isOnline', function($id) {
            return $this->user->isOnline($id);
        });
    }
}
