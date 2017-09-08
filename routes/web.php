<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

# Index
Route::get('/', function () {
    return view('welcome');
});

# Login / Register & Forgot Password
Auth::routes();

# Raids
Route::get('raids/crew/{id}', 'RaidController@show')->name('raids.crew.show');
Route::get('raids/room/{id}', 'RaidController@index')->name('raids.index');
Route::get('raids/create/{id}', 'RaidController@create')->name('raids.create')->middleware('auth.crew');
Route::post('raids/create', 'RaidController@store')->name('raids.store')->middleware('auth.crew');
Route::get('raids/join/{id}', 'RaidController@join')->name('raids.join')->middleware('auth.crew');
Route::get('raids/launch/{id}', 'RaidController@launch')->name('raids.launch')->middleware('auth.crew');

    # Raid Log
    Route::post('raids/log/create', 'RaidLogController@create')->name('raids.log.create')->middleware('auth.crew');

# Crew
Route::get('crews/create', 'CrewController@create')->name('crews.create');
Route::post('crews', 'CrewController@store')->name('crews.store');
Route::get('crews/profile/{id}', 'CrewController@show')->name('crews.show');
Route::get('crews/manage', 'CrewController@index')->name('crews.index')->middleware('auth.crew');
Route::get('crews/raids', 'CrewController@raids')->name('crews.raids')->middleware('auth.crew');

    # Crew Invite
    Route::get('crews/invites', 'CrewInviteController@index')->name('crews.invite.index');
    Route::post('crews/invite', 'CrewInviteController@store')->name('crews.invite.store')->middleware('auth.crew');
    Route::get('crews/invites/accept/{id}', 'CrewInviteController@accept')->name('crews.invite.accept');
    Route::get('crews/invites/deny/{id}', 'CrewInviteController@deny')->name('crews.invite.deny');

    # Crew Permissions
    Route::get('crews/permissions', 'CrewPermissionController@index')
        ->name('crews.permissions.index')
        ->middleware('auth.crew');
    Route::post('crews/permissions', 'CrewPermissionController@update')
        ->name('crews.permissions.update')
        ->middleware('auth.crew');

# Home
Route::get('/home', 'HomeController@index')->name('home');

# Player
Route::get('find-player', 'ProfileController@find');
Route::resource('profile', 'ProfileController');

# Map
Route::get('map', 'MapController@index');
Route::get('map/{id}', 'MapController@show');

# Mobs
Route::get('mob/talk/{id}', 'MobController@show');
Route::get('mob/{id}/attack', 'MobController@attack');
Route::get('mobs/room/{id}', 'MobController@all');

# Quest
Route::get('quest/{id}', 'QuestController@show');
Route::get('quest/accept/{id}', 'UserQuestController@store');
Route::get('quest/mob/{id}', 'QuestController@mob');
Route::get('quest/{id}/step', 'QuestStepController@show');
Route::get('quest/{qid}/user-kills/mob/{mid}', 'QuestUserController@kills');

# Backpack
Route::get('backpack/{type}', 'BackpackController@index');
Route::get('backpack/equip/{id}', 'BackpackController@equip');
Route::post('backpack/drop', 'BackpackController@drop');

# Equipment
Route::get('equipment', 'EquipmentController@show');
Route::get('equipment/remove/{id}', 'EquipmentController@remove');

# Player Attack
Route::get('attack', 'UserAttackController@index')->name('attack');
Route::post('attack', 'UserAttackController@store')->name('attack.store');
Route::post('attack/search', 'UserAttackController@search')->name('attack.search');
Route::get('attack/log/{type}', 'UserAttackController@log');
Route::get('attack/{id}', 'UserAttackController@attack')->name('attack.quick');
Route::get('attack/{id}/{slug}', 'UserAttackController@create')->name('attack.create');

# Blacksmith
Route::get('blacksmith', 'BlacksmithController@index')->name('blacksmith.index');
Route::post('blacksmith', 'BlacksmithController@gem')->name('blacksmith.gem');

# Test route
Route::get('test', 'TestController@index');
