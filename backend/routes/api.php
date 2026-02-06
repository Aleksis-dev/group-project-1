<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Flight;

Route::get("/flights", function() {
    return response()->json([
        "Flights" => Flight::all()
    ], 200);
});

Route::post('/uploadFlights', function () {
    $sampleFlights = [
        [
            'from' => 'New York',
            'to' => 'London',
            'departure' => '2026-03-15 10:00:00',
            'arrival' => '2026-03-15 22:30:00',
            'price' => 650,
            'airline' => 'Sky Airlines',
        ],
        [
            'from' => 'London',
            'to' => 'Paris',
            'departure' => '2026-03-16 08:00:00',
            'arrival' => '2026-03-16 10:30:00',
            'price' => 180,
            'airline' => 'EuroFly',
        ],
        [
            'from' => 'Tokyo',
            'to' => 'Sydney',
            'departure' => '2026-03-17 14:00:00',
            'arrival' => '2026-03-18 06:00:00',
            'price' => 1200,
            'airline' => 'Pacific Airways',
        ],
        [
            'from' => 'Los Angeles',
            'to' => 'Miami',
            'departure' => '2026-03-18 09:00:00',
            'arrival' => '2026-03-18 17:00:00',
            'price' => 420,
            'airline' => 'Coastal Air',
        ],
        [
            'from' => 'Dubai',
            'to' => 'Singapore',
            'departure' => '2026-03-19 22:00:00',
            'arrival' => '2026-03-20 07:30:00',
            'price' => 750,
            'airline' => 'Desert Wings',
        ],
    ];

    foreach ($sampleFlights as $flight) {
        Flight::create($flight);
    }

    return response()->json([
        'message' => 'Flights uploaded successfully',
        'count' => count($sampleFlights),
    ]);
});
