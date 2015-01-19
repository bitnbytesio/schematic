<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
        return View::make('hello');
});

Route::group(['namespace' => 'api\v1', 'prefix' => 'api/v1'], function() {
    Route::controller('/auth', 'AuthController');
});

Route::group(['namespace' => 'api\help\v1', 'prefix' => 'api/help/v1'], function() {
    Route::get('{module}/config.js', function($module) {
        return \api\v1\schematic\Schematic::serve($module);
    });
    Route::controller('/{param1?}/{param2?}', 'HomeController');
});

