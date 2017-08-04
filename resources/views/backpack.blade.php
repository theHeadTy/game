<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/all.css') }}" rel="stylesheet">

</head>
<body>
    <table cellspacing="0" cellpadding="0" border="0" style="background-color:#000000;">
        <tr>
            <td colspan="3" align="center" style="height:21px;background-image:url('{{ asset('images/backpack/bp_top_border.gif') }}'); background-repeat:repeat-x;">

                <img class="whichBackpack" id="regular" src="{{ asset('images/backpack/bp_top_regular.gif') }}">

                <img class="whichBackpack" id="quest" border="0" src="{{ asset('images/backpack/bp_top_quest_2.gif') }}">

                <img class="whichBackpack" id="orb" border="0" src="{{ asset('images/backpack/bp_top_orb_2.gif') }}">

                <img class="whichBackpack" id="potion" border="0" src="{{ asset('images/backpack/bp_top_potion_2.gif') }}">

                <img class="whichBackpack" id="key" border="0" src="{{ asset('images/backpack/bp_top_key_2.gif') }}">

            </td>
        </tr>

        <td style="width:7px;background-image:url('{{ asset('images/backpack/bp_left_b.gif') }}');background-repeat:repeat-y;"></td>
        <td>

            <!-- Players items in backpack -->
            @for ($i = 0; $i < $totalItems; $i++)

                <div style="white-space: nowrap;text-align: center;float:left;height:60px;width:60px;background-image:url('{{ asset('images/backpack/bp_tile.gif') }}');">

                    @foreach ($items as $item)

                        <div id="item_border{{ $i }}" style="display:inline-block;height:100%;vertical-align:middle;">

                            <span style="display:inline-block;height:100%;vertical-align:middle;"></span>

                            <img onclick="makemenu(this, event, 100, '{{ $item->options }}', '{{ $item->type }}', {{ $i }}, {{ $item->iid }}, {{ Auth::user()->id }}, '{{ $item->slot }}');" style="vertical-align: middle;max-width:50px;max-height:50px;" src="/{{ $item->image }}">

                            <input style="display:none;width:0px;height:0px;" id="drop{{ $i }}" class="bp_check" type="checkbox" name="dropitem[]" value="{{ $item->iid }}">
                            <input style="display:none;width:0px;height:0px;" id="sell{{ $i }}" class="bp_check" type="checkbox" name="sellitem[]" value="{{ $item->iid }}">
                            <input style="display:none;width:0px;height:0px;" id="cv{{ $i }}" class="bp_check" type="checkbox" name="cvitem[]" value="{{ $item->iid }}">

                        </div>

                     @endforeach


                </div>

                @if ($i % 5 === 0)
                    <div>
                @endif
            @endfor

            <!-- Leftover empty backpack slots -->
            @for ($i = 0; $i < $bpSpace; $i++)
                <div style="white-space: nowrap;text-align: center;float:left;height:60px;width:60px;background-image:url('{{ asset('images/backpack/bp_tile.gif') }}');"></div>

                @if ($i % 5 === 0)
                    <div>
                @endif
            @endfor

        </td>

        <!-- right -->
        <td style="width:7px;background-image:url('{{ asset('images/backpack/bp_right_b.gif') }}');background-repeat:repeat-y;"></td>


        <!-- bottom -->
            <!--</tr>-->
                <tr>
                    <td style="background-image:url('{{ asset('images/backpack/bp_left_bc.gif') }}');"></td>
                    <td style="background-image:url('{{ asset('images/backpack/bp_bottom_border.gif') }}');background-repeat:repeat-x;height:6px"></td>
                    <td style="background-image:url('{{ asset('images/backpack/bp_right_bc.gif') }}');"></td>
                </tr>
                <tr>
                    <td colspan="3">
                        <table border="0" cellspacing="0" cellpadding="0">

                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="center">
                        <div id="crewVaultWarning" style="display: none; font-size: 11px; width: 300px;">
                            [ Crew Vault Warning Here...]
                        </div>
                        <div id="scrapWarning" style="display: none; font-size: 11px;">
                            [ Scrap Warning Here...]
                        </div>
                        <div id="security_prompt" style="display:none; font-size:11px;">
                            <input type="submit" name="eqdrop" value="Perform Action"><br>
                        </div>
                        <div id="confirmPrompt">
                        </div>
                    </td>
                </tr>

            </table>


    <script src="{{ mix('js/index.js') }}"></script>
    <script src="{{ asset('js/anylink.js') }}"></script>


</body>
</html>
