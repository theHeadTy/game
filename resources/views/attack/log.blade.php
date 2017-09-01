@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Attack Index</div>

                <div class="panel-body">

                    <table class="table">
                        <tr>
                            <th>Attacker</th>
                            <th>Defender</th>
                            <th>Outcome</th>
                            <th>Date</th>
                            <th>Winnings</th>
                        </tr>
                        @foreach ($logs as $log)
                        <tr>
                            <td><a href="/profile/{{ $log->user_id }}">{{ $log->user->name }}</a></td>
                            <td><a href="/profile/{{ $log->target_id}}">{{ $log->target->name }}</a></td>
                            <td>
                                @if ($log->outcome === 'win')
                                    <span style="color:green;">
                                        <strong>{{ ucfirst($log->outcome) }}</strong>
                                    </span>
                                @else
                                    <span style="color:red">
                                        <strong>{{ ucfirst($log->outcome) }}</strong>
                                    </span>
                                @endif
                            </td>
                            <td>{{ $log->created_at }}</td>
                            <td>Gold: {{ $log->gold }} | Exp: {{ $log->exp }}</td>
                        </tr>
                        @endforeach
                    </table>

                    <div align="center">
                        {{ $logs->links() }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
