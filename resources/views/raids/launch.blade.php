@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Crew Raid</div>

                <div class="panel-body">


                    <!-- Crew & boss name/image -->
                    <div class="col-md-8 col-md-offset-2">
                      <div class="col-md-4">
                        <div style="text-align: right">
                            <strong>{{ $crew }}</strong>
                        </div>
                        <img src="http://via.placeholder.com/250x250">
                      </div>
                      <div class="col-md-4 col-md-offset-2">
                        <div style="text-align: right">
                          <strong>{{ $boss }}</strong>
                        </div>
                        <img src="http://via.placeholder.com/250x250">
                      </div>
                    </div>



                    <raid-attack
                        :data="{{ $log->data }}"
                        crew="{{ $crew }}"
                        boss="{{ $boss }}">
                    </raid-attack>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
