@extends('layouts.app')

@section('styles')
    <link href="{{ asset('css/all.css') }}" rel="stylesheet">
@stop

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">

                  <div class="col-md-6">
                      <div id="stage">
                          <canvas id="map" height="350" width="350" moz-opaque>Canvas not supported</canvas>
                          <canvas id="player" width="350" height="350" moz-opaque></canvas>
                          <canvas id="path" width="20" height="20" moz-opaque></canvas>
                      </div>
                      <span id="coords"></span>
                  </div>

                  <div class="col-md-6">
                      <div id="mobs"></div>
                  </div>

                </div>
            </div>
        </div>
    </div>
</div>


@push('scripts')
    <script src="{{ asset('js/world.js') }}"></script>
@endpush

@endsection
