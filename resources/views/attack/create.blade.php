@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">PVP Attack</div>

                <div class="panel-body">

                    <attack
                        :username="{{ json_encode($username) }}"
                        :targetname="{{ json_encode($targetname) }}"
                        :attack="{{ json_encode($attackArr) }}">
                    </attack>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
