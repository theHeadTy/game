<?php
namespace App\Repositories;

use App\Models\RaidLog;
use App\Repositories\Contracts\RaidLogInterface;

class RaidLogRepository implements RaidLogInterface
{
    protected $log;

    public function __construct(RaidLog $log)
    {
        $this->log = $log;
    }

    public function find($id)
    {
        return $this->log->find($id);
    }

    public function id($id, $crewid)
    {
        return $this->log
            ->where('raids_crew_id', $id)
            ->where('crew_id', $crewid)
            ->value('id');
    }



}
