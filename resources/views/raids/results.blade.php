@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Crew Raid</div>

                <div class="panel-body">

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="text-align: center;">Name</th>
                                <th style="text-align: center;">Outcome</th>
                                <th style="text-align: center;">Attackers</th>
                                <th style="text-align: center;">Date</th>
                                <th style="text-align: center;">View</th>
                            </tr>
                        </thead>
                        <tbody style="text-align: center;">
                            @foreach ($logs as $log)
                            <tr>
                                <td>{{ $log->raid->name }}</td>
                                <td style="color: {{ $log->outcome == 'Win' ? 'green' : 'red' }}">{{ $log->outcome }}</td>
                                <td>{{ $log->attackers }}</td>
                                <td>{{ $log->created_at }}</td>
                                <td><a href="/raids/launch/{{ $log->raids_crew_id }}">View</a></td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>

                    <div style="text-align: center">
                        {{ $logs->links() }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
