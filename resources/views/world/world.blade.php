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

                    <!-- World map -->
                    <world-map
                        :world="{{ $world->data }}"
                        v-on:sendmobs="getMobs"
                        v-on:sendraids="getRaids">
                    </world-map>

                    <!-- Mobs -->
                    <div class="col-md-4">
                        <strong>Mobs in room:</strong>

                        <world-mobs
                            v-for="mob in mobs"
                            :key="mob.id"
                            :mob="mob">
                        </world-mobs>

                    </div>

                    <!-- Raids -->
                    <div class="col-md-4">
                      <strong>Raids in room:</strong>

                      <world-raids :raids="raids"></world-raids>

                  </div>



                </div>
            </div>
        </div>
   </div>
</div>

@endsection
