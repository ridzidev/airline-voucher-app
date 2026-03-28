<?php

namespace App\Services;

class SeatGeneratorService
{
    /**
     * Define the seat layout based on aircraft type
     */
    private array $layouts = [
        'ATR' =>[
            'rows' => 18,
            'seats' => ['A', 'C', 'D', 'F']
        ],
        'Airbus 320' => [
            'rows' => 32,
            'seats' =>['A', 'B', 'C', 'D', 'E', 'F']
        ],
        'Boeing 737 Max' => [
            'rows' => 32,
            'seats' =>['A', 'B', 'C', 'D', 'E', 'F']
        ],
    ];

    /**
     * Generate 3 unique random seats for a given aircraft type
     */
    public function generateSeats(string $aircraftType): array
    {
        if (!array_key_exists($aircraftType, $this->layouts)) {
            throw new \InvalidArgumentException("Invalid aircraft type.");
        }

        $layout = $this->layouts[$aircraftType];
        $validSeats =[];

        for ($row = 1; $row <= $layout['rows']; $row++) {
            foreach ($layout['seats'] as $seatLetter) {
                $validSeats[] = $row . $seatLetter;
            }
        }

        $randomIndexes = array_rand($validSeats, 3);
        
        $assignedSeats =[
            $validSeats[$randomIndexes[0]],
            $validSeats[$randomIndexes[1]],
            $validSeats[$randomIndexes[2]],
        ];

        return $assignedSeats;
    }
}