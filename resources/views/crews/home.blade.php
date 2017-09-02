@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Create Crew</div>

                <div class="panel-body">

                        @if (Session::has('message'))
                            <div class="alert alert-info">
                                <span>{{ Session::get('message') }}</span>
                            </div>
                        @endif

                    <!-- Invite Players -->
                    <form class="form-horizontal" method="POST" action="{{ route('crews.invite.store') }}">
                        {{ csrf_field() }}
                        <div class="form-group{{ $errors->has('names') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Send Invites</label>
                            <div class="col-md-4">
                                <input id="name" type="text" class="form-control" name="names" value="{{ old('names') }}" placeholder="Send Invite(s)" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Send</button>
                        </div>
                    </form>

                    <!-- Crew Members -->
                    <table class="table">
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Level</th>
                        </tr>
                        @foreach ($users as $user)
                            <tr>
                                <td>
                                    @foreach ($crew->ranks as $rank)
                                        @if ($user->rank_id === $rank->rank)
                                            {{ $rank->name }}
                                        @endif
                                    @endforeach
                                </td>
                                <td>{{ $user->user->name }}</td>
                                <td>{{ $user->user->stats->level }}</td>
                            </tr>
                        @endforeach
                  </table>


                </div>
            </div>
        </div>
    </div>
</div>
@endsection
