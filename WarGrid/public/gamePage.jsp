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
    <script src="https://www.gstatic.com/firebasejs/3.5.3/firebase.js"></script>
    <script>
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCg8q3JPOVremSm5Exz74by1Rsv4ljk970"
            , authDomain: "llylly-95353.firebaseapp.com"
            , databaseURL: "https://llylly-95353.firebaseio.com"
            , storageBucket: "llylly-95353.appspot.com"
            , messagingSenderId: "745498047349"
        };
        firebase.initializeApp(config);
    </script>
</head>

<body class="w3-grey w3-content" style="max-width:1600px">
    <div id="gameDiv" class="w3-container w3-center  w3-padding-64">
        <div class="w3-container w3-card-24 w3-dark-grey w3-round-xlarge">
            <div class="w3-container w3-padding-32">
<<<<<<< HEAD
              <canvas id="game_canvas"  class="w3-sand w3-round-xlarge"  width="512" height="512" >
              </canvas>
=======
                <canvas id="game_canvas" class="w3-sand w3-round-xlarge" width="512" height="512"> </canvas>
>>>>>>> 05314a34bf0943e2636af239c1b8848a7e92bd66
            </div>
        </div>
        <!--
            <input id="confirmButton" type="button" value="Confirm" />
            -->
        <div class="w3-container w3-row w3-center"> <span id="text">Cell left: 0</span> </div>
        <div class="w3-container w3-row w3-center">
            <button id="resetButton" class="w3-btn w3-dark-grey w3-large w3-round-large w3-animate-zoom">Reset</button>
            <button id="confirmButton" value="Confirm" class="w3-btn w3-dark-grey w3-large w3-round-large w3-animate-zoom">Confirm</button>
            <button id="ghostButton" class="w3-btn w3-dark-grey w3-large w3-round-large w3-animate-zoom">Ghost On/Off </button>
            <button id="surrenderButton" class="w3-btn w3-dark-grey w3-large w3-round-large w3-animate-zoom">Surrender</button>
        </div>
    </div>
    <script>
        initGameOfLife();
    </script>
</body>

</html>
