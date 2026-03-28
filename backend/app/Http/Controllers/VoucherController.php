<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use App\Services\SeatGeneratorService;
use App\Http\Requests\CheckVoucherRequest;
use App\Http\Requests\GenerateVoucherRequest;
use App\Http\Resources\GenerateVoucherResource;
use Illuminate\Http\JsonResponse;

class VoucherController extends Controller
{
    protected SeatGeneratorService $seatGenerator;

    public function __construct(SeatGeneratorService $seatGenerator)
    {
        $this->seatGenerator = $seatGenerator;
    }

    /**
     * Endpoint: POST /api/check
     */
    public function check(CheckVoucherRequest $request): JsonResponse
    {
        $exists = Voucher::where('flight_number', $request->flightNumber)
            ->where('flight_date', $request->date)
            ->exists();

        return response()->json([
            'exists' => $exists
        ]);
    }

    /**
     * Endpoint: POST /api/generate
     */
    public function generate(GenerateVoucherRequest $request)
    {
        $exists = Voucher::where('flight_number', $request->flightNumber)
            ->where('flight_date', $request->date)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Vouchers have already been generated for this flight and date.'
            ], 422); 
        }

        try {
            $seats = $this->seatGenerator->generateSeats($request->aircraft);

            $voucher = Voucher::create([
                'crew_name' => $request->name,
                'crew_id' => $request->id,
                'flight_number' => $request->flightNumber,
                'flight_date' => $request->date,
                'aircraft_type' => $request->aircraft,
                'seat1' => $seats[0],
                'seat2' => $seats[1],
                'seat3' => $seats[2],
            ]);

            return new GenerateVoucherResource($voucher);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate seats: ' . $e->getMessage()
            ], 500);
        }
    }
}