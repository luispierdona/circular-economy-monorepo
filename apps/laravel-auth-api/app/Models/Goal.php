<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    // Only allowing massive data saved in this 2 fields
    protected $fillable = ['name', 'target_co2'];
}
