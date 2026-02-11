<?php

use Illuminate\Support\Facades\Route;
use App\Models\Goal;

Route::get('/', function () {
    return view('welcome');
});
