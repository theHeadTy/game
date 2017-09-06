@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">

                    <div class="col-md-4 col-md-offset-4">
                        <div class="panel panel-default">
                            <div class="panel-heading" style="text-align:center">
                                Creating raid against <strong>{{ $raid->name }}</strong>
                            </div>
                            <div class="panel-body">

                                <form method="POST" action="{{ route('raids.store') }}">

                                    {{ csrf_field() }}

                                    <div style="text-align: center">
                                        <select name="time" required>
                                            <option>1 Minute</option>
                                            <option>10 Minutes</option>
                                            <option>60 Minutes</option>
                                        </select>
                                    </div>

                                    <div style="text-align: center; padding: 10px;">
                                        <textarea name="message" style="resize: none;" rows="5" cols="30" placeholder="Create a message for your crew to view for this raid"></textarea>
                                    </div>

                                    <input type="hidden" name="id" value="{{ $raid->id }}">

                                    <div style="text-align: center; padding: 10px;">
                                        <button class="btn btn-primary">Create</button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</div>
@endsection
