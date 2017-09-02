<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use App\Repositories\UserRepository;
use Illuminate\Foundation\Http\FormRequest;

class StoreCrew extends FormRequest
{
    /**
     * Authorized if user is not already in crew.
     *
     * @return bool
     */
    public function authorize(UserRepository $user)
    {
        return $user->hasCrew() ? false : true;
    }

    /**
     * Create crew validation rules
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:4|max:255|unique:crews,name',
            'rank[1]' => 'string|max:255',
            'rank[2]' => 'string|max:255',
            'rank[3]' => 'string|max:255',
            'rank[4]' => 'string|max:255',
            'rank[5]' => 'string|max:255',
            'description' => 'nullable|max:1000'
        ];
    }

}
