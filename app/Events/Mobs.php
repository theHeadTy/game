<?php

namespace App\Events;

use Auth;
use App\Mob;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class Mobs implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $mobs;
    public $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($mobs, User $user)
    {
        $this->mobs = $mobs;
        $this->user = $user;
    }

    /**
     * Get channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('mobs');
    }
}
