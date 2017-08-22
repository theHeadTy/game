@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">

                    <form method="POST" action="/profile/{{ $user->id}}" enctype="multipart/form-data">

                        {{ csrf_field() }}
                        {{ method_field('PUT') }}

                        <div class="form-group">
                            <label for="avatar">Avatar</label>
                            <input type="file" name="avatar">

                        </div>

                        <div class="form-group">
                            <label for="">Submit</label>
                            <input class="form-control" type="submit">
                        </div>
                    </form>

                </div>

            </div>
        </div>
    </div>
</div>
@endsection
