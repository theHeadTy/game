@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading"><strong>{{ $crew->name }}</strong> Crew Profile</div>

                <div class="panel-body">

                    <div class="col-md-6">
                        <table class="table table-condensed table-hover">
                            <tr>
                                <th colspan="2" style="text-align:center">Crew Information</th>
                            </tr>
                            <tr>
                                <td>Crew Name</td>
                                <td>{{ $crew->name }}</td>
                            </tr>
                            <tr>
                                <td>Created</td>
                                <td>{{ $crew->created_at }}</td>
                            </tr>
                            <tr>
                                <td>Leader</td>
                                <td>{{ $crew->leader->name }}</td>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align:center">
                                    <a href="/raids/log/{{ $crew->id }}">Raid Results</a>
                                </td>
                            </tr>
                        </table>

                        <!-- Profile Image -->
                        <div align="center">
                            <img class="img-rounded" src="http://placehold.it/250x250" />
                        </div>

                    </div>
                    <!-- end left col -->

                    <!-- Right Col -->
                   <div class="col-md-6">
                        {{--}}<div class="panel panel-default">
                            <div class="panel-heading">Description</div>
                            <div class="panel-body">
                                {{ $crew->description }}
                            </div>
                        </div>--}}
                        <blockquote>
                            @if (!$crew->description)
                                Default Description...
                            @else
                                {{ $crew->description }}
                            @endif
                        </blockquote>
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
</div>
@endsection
