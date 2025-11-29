<?php

use Illuminate\Support\Facades\Route;
// дубина стоиросовая
Route::get('/', function () {
    return view('welcome');
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
