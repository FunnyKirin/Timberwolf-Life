<!DOCTYPE html>
<html>

<head>
    <title>Game</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <script src="scripts/wScript.js"></script>
    <script src="scripts/jquery-1.12.4.min.js"></script>
    <script src="scripts/map.js"></script>
    <script src="scripts/main.js"></script>
</head>

<body class="w3-grey w3-content" style="max-width:1600px">

        <div id="gameDiv" class="w3-container w3-center  w3-padding-64">

            <canvas id="game_canvas" class="w3-container w3-card-24 w3-sand w3-round-xlarge" width="512" height="512">
            </canvas>
            <!--
            <input id="confirmButton" type="button" value="Confirm" />
            -->
            <div class="w3-container w3-row w3-center">
              <span id="text" >123</span>
            </div>
            <div class="w3-container w3-row w3-center">
              <button id="confirmButton" value="Confirm" class="w3-btn w3-dark-grey w3-large w3-round-large w3-animate-zoom">Confirm</button>
              <button id="confirmButton" class="w3-btn w3-dark-grey w3-large w3-round-large w3-animate-zoom">Surrender</button>
            </div>
        </div>


        <script>
            initGameOfLife();
            loadMap('maps/test_map_1.json');
            loadMap('maps/test_map_2.json');
            loadMap('maps/test_map_3.json');
        </script>
    </body>
</html>