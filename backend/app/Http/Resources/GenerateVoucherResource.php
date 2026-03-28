<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GenerateVoucherResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return[
            'success' => true,
            'seats' =>[
                $this->seat1,
                $this->seat2,
                $this->seat3,
            ]
        ];
    }
}