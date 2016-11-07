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

<body>
        <div id="gameDiv">
            <canvas id="game_canvas" width="512" height="512">
            </canvas>
            <input id="confirmButton" type="button" value="Confirm" />
            <p id="text">123</p>
        </div>


        <script>
            initGameOfLife();
            loadMap('maps/test_map_1.json');
            loadMap('maps/test_map_2.json');
            loadMap('maps/test_map_3.json');
        </script>
    </body>
</html>