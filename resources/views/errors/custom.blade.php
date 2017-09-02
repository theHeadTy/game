@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Custom Error Page</div>
                <div class="panel-body">

                    <div class="alert alert-info">
                        <strong>Error:</strong> {{ $exception->getMessage() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
