@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">
        <!--<div class="col-md-8 col-md-offset-2">-->
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    <div class="row">

                        <!-- left col -->
                        <div class="col-xs-6">

                            <!-- begin profile info -->
                            <table class="table table-condensed table-hover">
                                <tr>
                                    <td colspan="2" style="text-align:center;">Player Information</td>
                                </tr>
                                <tr>
                                    <td>Username</td>
                                    <td>{{ $user->name }}</td>
                                </tr>
                                <tr>
                                    <td>Class</td>
                                    <td>Level 1 Knight</td>
                                </tr>
                                <tr>
                                    @if($user->isOnline())
                                    <td class="alert alert-success">Status</td>
                                    <td class="alert alert-success">Online</td>
                                    @else
                                    <td class="alert alert-danger">Status</td>
                                    <td class="alert alert-danger">Offline</td>
                                    @endif
                                </tr>
                                <tr>
                                    <td>Growth Yesterday</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align:center;">
                                        Leader of Crew name
                                    </td>
                                </tr>
                            </table>
                            <!-- end profile info -->

                            <!-- begin profile image -->
                            <div align="center">
                                @if (!$user->avatar)
                               <img class="img-rounded" src="http://placehold.it/250x250" />
                               @else
                               <img class="img-rounded" src="{{ Storage::disk()->url($user->avatar) }} ">
                           @endif
                           </div>
                           <hr></hr>
                           <!-- end profile image -->


                           <!-- begin masteries -->

                           <!-- end masteries -->


                            <!-- begin comments -->

                            <!-- end comments -->

                        </div> <!-- end left col -->

                        <!-- begin right col -->
                        <div class="col-xs-6">

                            <!-- begin user bio -->
                            <blockquote>
                                <p>Elite RPG default bio text.</p>
                            </blockquote>
                            <!-- end user bio -->

                            <profile-equipment :items="{{ $items }}"></profile-equipment>


                        </div>
                        <!-- end user profile -->

                    </div> <!-- end row -->

               </div>
          </div>
      </div>
   </div>
</div>


{{--}}@push('scripts')
    <script src="{{ mix('js/world.js') }}"></script>
@endpush--}}

@endsection
