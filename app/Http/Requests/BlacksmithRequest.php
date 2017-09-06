<?php

namespace App\Http\Requests;

use Auth;
use App\Traits\ItemTrait;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\Repositories\Contracts\ItemInterface;

class BlacksmithRequest extends FormRequest
{
    use ItemTrait;

    /**
     * @var $item
     */
    private $item;

    /**
     * Instance of BlacksmithRequest
     *
     * @param ItemInterface $item
     */
    public function __construct(ItemInterface $item)
    {
        $this->item = $item;
    }

    /**
     * Checks if the item is owned by the logged in user.
     *
     * @param int $userid - Authed user ID.
     * @return bool
     */
    private function checkOwner($userid): bool
    {
        return (int) $userid === (int) Auth::id() ? true : false;
    }

    /**
     * Checks if the item has less than 5 gems on it.
     *
     * @param int $gems - Total gems on item.
     * @return bool
     */
    private function checkGems($gems): bool
    {
        return $gems < 5 ? true : false;
    }

    /**
     * Checks if the user has the amount of points it will cost to gem the item.
     *
     * @param int $cost - Point cost for the gem.
     * @return bool
     */
    private function checkPoints($cost): bool
    {
        return Auth::user()->points >= $cost ? true : false;
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        $item = $this->item->findUserItem($this->get('id'));

        $cost = $this->createGemCost($item->item->rarity, $item->gems);

        return ((
            $this->checkOwner(Auth::id())
            && $this->checkGems($item->gems)
            && $this->checkPoints($cost))
            ? true
            : false
        );

    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'id' => [
                'required',
                'numeric',
                Rule::exists('user_items')->where(function($query) {
                    $query->where('id', $this->get('id'));
                    $query->where('user_id', Auth::id());
                    $query->where('gems', '<', 5);
                })
            ]
        ];
    }
}
