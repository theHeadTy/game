@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Update Permissions</div>

                <div class="panel-body">

                    <permissions
                        :names="{{ json_encode($names) }}"
                        :perms="{{ json_encode($perms) }}">
                    </permissions>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
