@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">

                <!-- Crew Invites -->
                <table class="table table-striped table-hover">
                    <tr>
                        <th>Date</th>
                        <th>Crew</th>
                        <th style="text-align:center;">Action</th>
                    </tr>
                    @foreach ($invites as $invite)
                    <tr>
                        <td>{{ $invite->created_at }}</td>
                        <td>
                            <a href="/crews/profile/{{ $invite->crew_id }}">
                                {{ $invite->crew->name }}
                            </a>
                        </td>
                        <td style="text-align:center;">
                            <small>
                                <a href="/crews/invites/accept/{{ $invite->id }}">[Accept]</a>
                                <a href="/crews/invites/deny/{{ $invite->id }}">[Deny]</a>
                            </small>
                        </td>
                    </tr>
                    @endforeach
                </table>

                <div align="center">
                    {{ $invites->links() }}
                </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
