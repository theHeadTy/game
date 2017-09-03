<?php

namespace App\Http\Middleware;

use Closure;
use App\Exceptions\CustomException;
use App\Repositories\Contracts\UserInterface;

class AuthenticateCrew
{
    protected $user;

    public function __construct(UserInterface $user)
    {
        $this->user = $user;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$this->user->inCrew()) {
            throw new CustomException('You must be in a crew to view this page!');
        }

        return $next($request);
    }
}
