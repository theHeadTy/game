@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Attack Index</div>

                <div class="panel-body">

                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <div class="col-md-4 col-md-offset-4">
                        <form class="form-horizontal" method="POST" action="{{ route('attack') }}">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input required name="name" class="form-control" placeholder="Username">
                            </div>

                            <div class="form-group">
                                <label for="attacks">Attacks</label>
                                <input min="1" max="100" type="number" value="10" name="attacks" class="form-control" placeholder="10">
                            </div>

                            <div class="form-group">
                                <label for="message">Message</label>
                                <input name="message" class="form-control" placeholder="Attack message">
                            </div>

                            <button type="submit" class="btn btn-primary">Submit</button>

                        </form>

                        <br>

                        <form class="form-horizontal" method="POST" action="{{ route('attack.search') }}">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <label for="username">Search for User</label>
                                <input name="name" class="form-control" placeholder="Username">
                            </div>

                            <button type="submit" class="btn btn-primary">Submit</button>

                        </form>

                    </div>



                </div>
            </div>
        </div>
    </div>
</div>
@endsection
