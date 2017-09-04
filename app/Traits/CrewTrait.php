<?php

namespace App\Traits;

trait CrewTrait
{

    public function permissionsArray($array = []): array {
        return [
            'Edit', 'Boot', 'Invites', 'Hitlist', 'Ranks', 'Bank',
            'Raids', 'Vault', 'Shop', 'Message', 'Permissions'
        ];
    }

}
