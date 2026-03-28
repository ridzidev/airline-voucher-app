<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GenerateVoucherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'id' => ['required', 'string'],
            'flightNumber' => ['required', 'string'],
            'date' => ['required', 'date_format:Y-m-d'],
            'aircraft' =>['required', 'string', 'in:ATR,Airbus 320,Boeing 737 Max'],
        ];
    }

    public function messages(): array
    {
        return[
            'aircraft.in' => 'The selected aircraft type is invalid. Choose between ATR, Airbus 320, or Boeing 737 Max.',
        ];
    }
}