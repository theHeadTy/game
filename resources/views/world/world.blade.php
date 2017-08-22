@extends('layouts.app')

@section('styles')
    <link href="{{ asset('css/all.css') }}" rel="stylesheet">
@endsection

@section('content')

<div class="container">
    <div class="row">
        <!--<div class="col-md-8 col-md-offset-2">-->
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">

                    <world-map
                        :world="{{ $world->data }}"
                        v-on:send="sendMobs">
                    </world-map>

                    <div class="col-md-6">
                          <span>Mobs in room:</span>

                      <world-mobs
                        v-for="mob in mobs"
                        :key="mob.id"
                        :mob="mob">
                      </world-mobs>

                  </div>

               </div>
          </div>
      </div>
   </div>
</div>


@endsection
