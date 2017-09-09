<?php
namespace App\Classes;

use App\User;
use App\Models\Crew;
use App\Models\Raid;
use App\Repositories\Contracts\RaidInterface;

class RaidAttackClass
{
    private $raid;

    private $bossid;

    private $raidid;

    private $crewid;

    public function __construct(RaidInterface $raid, $bossid, $raidid, $crewid)
    {
        $this->raid = $raid;
        $this->bossid = $bossid;
        $this->raidid = $raidid;
        $this->crewid = $crewid;
    }

    //public function launchRaid($raidid, $crewid, $bossid, $usersArr = [], $raidArr = [], $winner = null): array
    public function launchRaid($usersArr = [], $raidArr = [], $winner = null): array
    {
        $raid = $this->raid->find($this->bossid);

        $users = $this->raid->raidUsers($this->raidid, $this->crewid);

        $crew = Crew::find($this->crewid);

        foreach ($users as $user) {
            $usersArr[] = User::find($user->user_id);
        }

        do {

            static $turn = 'crew';

            if ($turn === 'crew') {
                // set defaults
                $crewDamage = 0;
                $raidUsers = [];
                foreach ($usersArr as $key => &$user) {
                    // set defaults
                    $damage = 0;
                    $elemDamage = 0;
                    $critical = false;
                    $miss = false;
                    $defaultUser = User::find($user->id);

                    if ($user->stats->hp > 0) {

                        $damage = $this->createDamage(
                            $user->stats->attack,
                            $user->stats->hp,
                            $user->stats->level
                        );

                        $critical = $this->criticalHit($user->stats->critical);
                        $elemDamage = $this->createElementalDamage($user, $raid);

                        $damage += $elemDamage;

                        if ($this->blockChance($raid->stats->block)) {
                            $miss = true;
                            $damage = 0;
                            $critical = false;
                        }

                        $crewDamage += $damage;

                        $raidUsers[] = [
                            'hit' => "{$user->name} hits for {$damage}",
                            'hp' => $user->stats->hp,
                            'critical' => $critical,
                            'hpPercent' => number_format($user->stats->hp * 100 / $defaultUser->stats->hp),
                            'elementals' => [
                                'dmg' => $this->elementalDmg($user),
                                'res' => $this->elementalRes($user)
                            ],
                            'miss' => $miss,
                            'elemDamage' => $elemDamage
                        ];

                    }
                }

                $raidArr[] = [
                    'turn' => 'crew',
                    'damage' => $crewDamage,
                    'message' => "{$crew->name} hit for {$crewDamage}",
                    'users' => $raidUsers
                ];

                $raid->stats->hp -= $crewDamage;

                $turn = ($raid->stats->hp <= 0) ? 'winner' : 'boss';

            } elseif ($turn === 'boss') {
                // set defaults
                $damage = 0;
                $elemDamage = 0;

                $damage = $this->createDamage(
                    $raid->stats->attack,
                    $raid->stats->hp,
                    $raid->stats->level
                );

                //$elemDamage = $this->createElemDamage($this->elementalDmg($raid));
                $elemDamage = $this->createElementalDamage($raid, $user);

                $damage += $elemDamage;

                $raidArr[] = [
                    'turn' => 'boss',
                    'message' => "{$raid->name} hits for {$damage}",
                    'elementals' => [
                        'dmg' => $this->elementalDmg($raid)
                    ],
                    'elemDamage' => $elemDamage,
                    'damage' => $damage
                ];

                foreach ($usersArr as $key => &$user) {
                    $user->stats->hp -= $damage;
                    if ($user->stats->hp <= 0) {
                        unset($usersArr[$key]);
                    }
                }

                $turn = (empty($usersArr)) ? 'winner' : 'crew';

            } elseif ($turn === 'winner') {

                $winner = (empty($usersArr)) ? $raid->name : $crew->name;

                $raidArr[] = $this->buildWinner(
                    $winner,
                    ((string)$winner === (string)$crew->name) ? true : false
                );

                break;

            }


        } while (true);

        return $raidArr;

    }

    private function blockChance($block): bool
    {
        return ($block >= random_int(1, 200)) ? true : false;
    }

    private function pointGain(): int
    {
        return random_int(1, 100);
    }

    private function goldGain(): int
    {
        return random_int(1, 100);
    }

    private function expGain(): int
    {
        return random_int(1, 1000);
    }

    private function buildWinner($winner, $win): array
    {
        return [
            'turn' => 'winner',
            'message' => "{$winner} win the raid!",
            'gold' => $win ? $this->goldGain() : 0,
            'points' => $win ? $this->pointGain() : 0,
            'exp' => $win ? $this->expGain() : 0,
            'items' => [],
            'winner' => $winner,
            'win' => $win
        ];
    }

    private function createElementalDamage($attacker, $defender, $damage = 0): int
    {
        $elemDmg = $this->elementalDmg($attacker);
        $elemRes = $this->elementalRes($defender);
        foreach ($elemDmg  as $key => $elem) {
            if ($elem['dmg'] > 0) {
                $damage += $elem['dmg'];
                $damage -= $elemRes[$key];
             }
        }
        return $damage;
    }


    private function elementalRes($data): array
    {
        return [
            'Fire' => $data->stats->res_fire,
            'Dark' => $data->stats->res_dark,
            'Ice' => $data->stats->res_ice,
            'Holy' => $data->stats->res_holy,
            'Kinetic' => $data->stats->res_kinetic,
            'Poison' => $data->stats->res_poison
        ];
    }

    private function elementalDmg($data): array
    {
        return [
            'Fire' => [
                'dmg' => $data->stats->dmg_fire,
                'color' => 'red'
            ],
            'Dark' => [
                'dmg' => $data->stats->dmg_dark,
                'color' => 'grey'
            ],
            'Kinetic' => [
                'dmg' => $data->stats->dmg_kinetic,
                'color' => 'white'
            ],
            'Ice' => [
                'dmg' => $data->stats->dmg_ice,
                'color' => 'blue'
            ],
            'Holy' => [
                'dmg' => $data->stats->dmg_holy,
                'color' => 'yellow'
            ],
            'Poison' => [
                'dmg' => $data->stats->dmg_poison,
                'color' => 'purple'
            ]
        ];
    }

    private function criticalHit($crit): bool
    {
        return ($crit >= mt_rand(1,200)) ? true : false;
    }

    private function createDamage($attack, $hp): int
    {
        $level = mt_rand(1, 10);
        $levelDamage = mt_rand(1, $level);
        return round($attack * $attack / ($attack + $hp) + $levelDamage);
    }

    public function getOutcome($data): string
    {
        foreach ($data as $log) {
            if ($log['turn'] === 'winner') {
                return ($log['winner']) ? 'Win' : 'Loss';
            }
        }
    }
}
