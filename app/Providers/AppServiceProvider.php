<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\UserRepository;
use App\Repositories\Contracts\UserInterface;
use App\Repositories\CrewRepository;
use App\Repositories\Contracts\CrewInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(CrewInterface::class, CrewRepository::class);
        $this->app->bind(UserInterface::class, UserRepository::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // @example singleton
        //$this->app->singleton(CrewInterface::class, CrewRepository::class);
    }
}
