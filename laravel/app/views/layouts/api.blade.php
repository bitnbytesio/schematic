<?php
/*
 * @project Schematic
 * @version 1.0
 * @email artisangang@gmail.com
 * @git https://github.com/artisangang/
 */

?>
<!DOCTYPE HTML>
<html lang = "en">
    <head>
        <meta charset = "UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
        <title>{{ $title }}</title>
        {{ HTML::style('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css') }}
        {{ HTML::style('css/schematic.css') }}
    </head>
    <body>
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Justripe</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="{{ (Route::input('param1')) ? '' : 'active' }}"><a href="{{ URL::to('/api/help/v1') }}">Home</a></li>
                        <li class="{{ (Route::input('param1') == 'auth') ? 'active' : '' }}"><a href="{{ URL::to('/api/help/v1/auth') }}">Authentication</a></li>
                        
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </nav>
        <div class="container" role="main">
            <div id="schematic-container" style="margin-top: 70px;">
                <?= $body ?>
            </div>
        </div>
    </div>
    {{ HTML::script('//code.jquery.com/jquery-1.11.2.min.js'); }}
    {{ HTML::script('js/schematic.js') }}
    {{ HTML::script('api/help/v1/'.Route::input('param1').'/config.js') }}
</body>

</html>