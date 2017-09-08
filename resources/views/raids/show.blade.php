@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Crew Raid</div>

                <div class="panel-body">

                    <div class="col-md-6 col-md-offset-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">Raiding {{ $raid->raid->name }}</div>
                        <div class="panel-body">

                            <div style="text-align: center;padding-bottom: 10px;">
                                Launch Time: <strong>{{ $raid->launch_at }}</strong><br />
                                Current Time: <strong>{{ \Carbon\Carbon::now() }}</strong>
                            </div>

                            <div class="col-xs-6">
                                <table class="table table-bordered">
                                    <tr>
                                        <th>Users in Raid</th>
                                    </tr>
                                    @foreach ($users as $user)
                                    <tr>
                                        <td>{{ $user->user->name }}</td>
                                    </tr>
                                    @endforeach
                                </table>
                            </div>

                            <div class="col-xs-6">
                                <div>
                                    @if ($raid->created_by === Auth::id())
                                        <form method="POST" action="/raids/log/create">
                                            {{ csrf_field() }}
                                            <input type="hidden" name="id" value="{{ $raid->id }}">
                                            <button class="btn btn-primary">Launch</button>
                                        </form>
                                    @else
                                        @if (!$inRaid)
                                            <a href="/raids/join/{{ $raid->id }}">
                                                <button class="btn btn-primary">Join</button>
                                            </a>
                                        @endif
                                    @endif
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
