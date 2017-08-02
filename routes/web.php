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

Route::get('/map', 'MapController@index');
Route::get('/map/{id}', 'MapController@show');

Route::get('mobs/x/{x}/y/{y}', 'MobController@getMobs');
Route::get('mobs/room/{id}', 'MobController@getAllMobs');
