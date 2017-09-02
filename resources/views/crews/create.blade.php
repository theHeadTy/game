@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Create Crew</div>

                <div class="panel-body">

                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif


                    <form class="form-horizontal" method="POST" action="{{ route('crews.store') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Name</label>

                            <div class="col-md-4">
                                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required>
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('rank1') ? ' has-error' : '' }}">
                            <label for="rank1" class="col-md-4 control-label">Rank 1</label>

                            <div class="col-md-4">
                                <input id="rank1" type="text" class="form-control" name="rank[1]" value="Rank 1">
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('rank1') ? ' has-error' : '' }}">
                            <label for="rank2" class="col-md-4 control-label">Rank 2</label>

                            <div class="col-md-4">
                                <input id="rank2" type="text" class="form-control" name="rank[2]" value="Rank 2">
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('rank1') ? ' has-error' : '' }}">
                            <label for="rank3" class="col-md-4 control-label">Rank 3</label>

                            <div class="col-md-4">
                                <input id="rank3" type="text" class="form-control" name="rank[3]" value="Rank 3">
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('rank1') ? ' has-error' : '' }}">
                            <label for="rank4" class="col-md-4 control-label">Rank 4</label>

                            <div class="col-md-4">
                                <input id="rank4" type="text" class="form-control" name="rank[4]" value="Rank 4">
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('rank1') ? ' has-error' : '' }}">
                            <label for="rank5" class="col-md-4 control-label">Rank 5</label>

                            <div class="col-md-4">
                                <input id="rank5" type="text" class="form-control" name="rank[5]" value="Rank 5">
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('rank1') ? ' has-error' : '' }}">
                            <label for="description" class="col-md-4 control-label">Description</label>

                            <div class="col-md-6">
                                <input id="description" type="text" class="form-control" name="description">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">Create</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
