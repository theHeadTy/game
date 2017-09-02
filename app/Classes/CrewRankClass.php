<?php

namespace App\Classes;

use Carbon\Carbon;

class CrewRankClass
{

    public function buildRanks(int $crewid, array $ranks, array $rankArr = []): array
    {
        $now = Carbon::now();

        $rankArr[] = [
            'crew_id' => $crewid,
            'rank' => 0,
            'name' => 'Leader',
            'created_at' => $now,
            'updated_at' => $now
        ];

        foreach ($ranks as $key => $rank) {

            $rankArr[] = [
                'crew_id' => $crewid,
                'rank' => $key,
                'name' => $rank,
                'created_at' => $now,
                'updated_at' => $now
            ];
        }

        return $rankArr;
    }

}
