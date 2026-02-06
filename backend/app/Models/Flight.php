<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'from',
        'to',
        'departure',
        'arrival',
        'price',
        'airline',
        'passangers'
    ];

    protected $casts = [
        'departure' => 'datetime',
        'arrival' => 'datetime',
    ];
}
