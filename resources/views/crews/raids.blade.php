@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Currently Active Raids</div>

                <div class="panel-body">

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="text-align: center;">Boss</th>
                                <th style="text-align: center;">Raid</th>
                                <th style="text-align: center;">Actions</th>
                                <th style="text-align: center;">Launch Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($raids as $raid)
                            <tr style="text-align: center;">
                                <td>{{ $raid->raid->name }}</td>
                                <td><a href="/raids/crew/{{ $raid->id }}">Raid</a></td>
                                <td>Launch / Join</td>
                                <td>{{ $raid->launch_at }}</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>

                    <div style="margin: 0 auto; text-align: center;">
                        {{ $raids->links() }}
                    </div>


                </div>
            </div>
        </div>
    </div>
</div>
@endsection
