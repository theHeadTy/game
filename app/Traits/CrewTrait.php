<?php

namespace App\Traits;

trait CrewTrait
{

    public function permissionsArray($array = []): array {
        return [
            'edit', 'boot', 'invites', 'hitlist', 'ranks', 'bank', 'raids', 'shop', 'permissions'
        ];
    }

}
