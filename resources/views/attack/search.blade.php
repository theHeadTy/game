@extends('layouts.app')
@section('content')

<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Attack Search - Users and Crews</div>
                <div class="panel-body">

                    <div class="col-md-8 col-md-offset-2">

                        <!-- Search list table -->
                        <table class="table">
                            <tr>
                                <td>#</td>
                                <td>Username</td>
                                <td>Level</td>
                                <td>Attack</td>
                            </tr>
                            @foreach($users as $user)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td><a href="/profile/{{ $user->id }}">{{ $user->name }}</a></td>
                                <td>{{ $user->stats->level }}</td>
                                <td>
                                    <a href="/attack/{{ $user->id }}">
                                        <i class="fa fa-superpowers" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                            @endforeach
                        </table> <!-- end search list table -->

                        {{ $users->links() }}

                        <a href="/attack">Go Back</a>

                    </div> <!-- end class col-md-6-md-offset-2 -->
                </div><!-- end class container -->
            </div> <!-- end panel-body -->
        </div> <!-- end class col-md-8-md-offset-2 -->
    </div> <!-- end class row -->
</div> <!-- end container -->
@endsection
