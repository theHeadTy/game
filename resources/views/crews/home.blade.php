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
                    <form>
                        <table class="table">
                            <tr>
                                <th style="width:25px"></th>
                                <th>Rank</th>
                                <th>User</th>
                                <th>Status</th>
                                <th>Level</th>
                            </tr>
                            @foreach ($users as $user)
                                <tr>
                                    <td>
                                        <input type="checkbox" name="checkbox[]" value="{{ $user->user->id }}">
                                    </td>
                                    <td>
                                        @foreach ($crew->ranks as $rank)
                                            @if ($user->rank_id === $rank->rank)
                                                {{ $rank->name }}
                                            @endif
                                        @endforeach
                                    </td>
                                    <td>
                                        <a href="/profile/{{ $user->user->id}}">
                                            {{ $user->user->name }}
                                        </a>
                                    </td>
                                    <td>
                                        {{--}}@if (Auth::check())
                                            @if (Auth::id() === $user->user->id)
                                                <span style="color:green"><strong>Online</strong></span>
                                            @else
                                                <span style="color:red"><strong>Offline</strong></span>
                                            @endif
                                        @endif--}}
                                        @if ($isOnline($user->user->id))
                                            <span style="color:green"><strong>Online</strong></span>
                                        @else
                                            <span style="color:red"><strong>Offline</strong></span>
                                        @endif
                                    </td>
                                    <td>{{ $user->user->stats->level }}</td>
                                </tr>
                            @endforeach
                        </table>
                        <div class="form-group">
                            <label for="updates" class="control-label">With Selected:</label>
                            <select id="updates">
                                <option>Boot</option>
                            </select>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    </div>
</div>
@endsection
