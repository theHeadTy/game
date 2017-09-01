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
Route::get('attack/{id}', 'UserAttackController@attack')->name('attack.quick');
Route::get('attack/{id}/{slug}', 'UserAttackController@create')->name('attack.create');


# Test route
Route::get('test', 'MobController@test');
