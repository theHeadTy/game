<?php

use App\World;
use App\Mob;

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('world', function() {
    return view('world');
});


Route::resource('profile', 'ProfileController');


Route::get('/map', 'MapController@index');
Route::get('/map/{id}', 'MapController@show');

Route::get('mob/{id}', 'MobController@show');

Route::get('mobs/x/{x}/y/{y}', 'MobController@mobs');
Route::get('mobs/room/{id}', 'MobController@all');

Route::get('quest/{id}', 'QuestController@show');

Route::get('backpack/{type}', 'BackpackController@index');
Route::get('backpack/equip/{id}', 'BackpackController@equip');
Route::post('backpack/drop', 'BackpackController@drop');

Route::get('equipment', 'EquipmentController@show');
Route::get('equipment/remove/{id}', 'EquipmentController@remove');

Route::get('test', 'BackpackController@test');
