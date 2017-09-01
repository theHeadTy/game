<?php

namespace App\Http\Requests;

use Auth;
use App\User;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class AttackFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * User must have enough attacks available to become authorized to proceed.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = User::with('stats')->find(Auth::id());
        return ($user->stats->rage >= $this->attacks()) ? true : false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Rule $rule)
    {
        return [
            'name' => [
                'required',
                'string',
                'exists:mysql.users,name',
                $rule->exists('users')->where(function ($query) {
                    $query->where('name', '!=', $this->name());
                })
            ],
            'attacks' => 'digits_between:1,100',
            'message' => 'max:255'
        ];
    }

    public function attacks(): int
    {
        return $this->get('attacks');
    }

    public function name(): string
    {
        return Auth::user()->name;
    }

}
