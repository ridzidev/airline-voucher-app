<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Voucher;

class VoucherTest extends TestCase
{
    use RefreshDatabase; 
    public function test_can_check_if_voucher_does_not_exist()
    {
        $response = $this->postJson('/api/check',[
            'flightNumber' => 'GA102',
            'date' => '2025-07-12',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['exists' => false]);
    }

    public function test_can_generate_vouchers_successfully()
    {
        $response = $this->postJson('/api/generate',[
            'name' => 'John Doe',
            'id' => '12345',
            'flightNumber' => 'GA102',
            'date' => '2025-07-12',
            'aircraft' => 'ATR'
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['success', 'seats']);
        
        $this->assertTrue($response->json('success'));
        $this->assertCount(3, $response->json('seats')); 
    }

    public function test_cannot_generate_duplicate_vouchers()
    {
        
        Voucher::create([
            'crew_name' => 'Jane',
            'crew_id' => '999',
            'flight_number' => 'GA102',
            'flight_date' => '2025-07-12',
            'aircraft_type' => 'ATR',
            'seat1' => '1A',
            'seat2' => '1C',
            'seat3' => '1D'
        ]);

        $response = $this->postJson('/api/generate',[
            'name' => 'John Doe',
            'id' => '12345',
            'flightNumber' => 'GA102',
            'date' => '2025-07-12',
            'aircraft' => 'ATR'
        ]);

        $response->assertStatus(422);
    }
}