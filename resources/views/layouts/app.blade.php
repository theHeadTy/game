<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Elite-RPG') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <link href="{{ asset('css/all.css') }}" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" type="text/css">

    @yield('styles')


    <script src="https://use.fontawesome.com/997d2663c0.js"></script>


</head>
<body>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Elite-RPG') }}
                    </a>

                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">

                    @if (!Auth::guest())

                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        <li><a href="/map">Explore</a></li>
                        <li><a href="/profile/{{ Auth::id() }}">Profile</a></li>

                        <!-- Actions -->
                        <ul class="nav navbar-nav">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" role="button" aria-expanded="false" data-toggle="dropdown">
                                    Actions<span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="/attack">Attack</a></li>
                                    <li><a href="/attack/log/out">Attack Log</a></li>
                                </ul>
                            </li>
                        </ul>

                        <!-- Crews -->
                        <ul class="nav navbar-nav">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" role="button" aria-expanded="false" data-toggle="dropdown">
                                    Crew
                                        @if ($crewRaid)
                                            <small>*Raid*</small>
                                        @endif
                                    <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                @if (!$userInCrew)
                                    <li><a href="/crews/create">Create</a></li>
                                    <li><a href="/crews/invites">Invites</a></li>
                                @else
                                    <li><a href="/crews/profile/{{ $crewId }}">Profile</a></li>
                                    <li><a href="/crews/manage">Manage</a></li>
                                    <li><a href="/crews/permissions">Permissions</a></li>
                                    <li><a href="/crews/raids">Raids</a></li>
                                @endif
                                </ul>
                            </li>
                        </ul>
                        <li><a href="/blacksmith">Blacksmith</a></li>

                    </ul>

                @endif

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        @if (Auth::guest())
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>


                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a @click="openBackpack">Backpack</a>
                                        <a @click="openEquipment">Equipment</a>
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Backpack -->
        <div v-show="showbp">
            <backpack @close="closeBackpack"></backpack>
        </div>

        <!-- Equipment -->
        <div v-show="showeq">
            <equipment @close="closeEquipment"></equipment>
        </div>

        @yield('content')

    </div>

    <!-- Webpack manifest, vendor & app - js -->
    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/app.js') }}"></script>

    <!-- Scripts -->
    @stack('scripts')

</body>
</html>
