<!DOCTYPE html>

<html>
  <head>
    <title>Editor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">



      <script src="https://www.gstatic.com/firebasejs/3.5.3/firebase.js"></script>
      <script>
        // Initialize Firebase
        var config = {
          apiKey: "AIzaSyCg8q3JPOVremSm5Exz74by1Rsv4ljk970",
          authDomain: "llylly-95353.firebaseapp.com",
          databaseURL: "https://llylly-95353.firebaseio.com",
          storageBucket: "llylly-95353.appspot.com",
          messagingSenderId: "745498047349"
        };
        firebase.initializeApp(config);
      </script>



    <script src="scripts/wScript.js"></script>
    <script src="scripts/editor.js"></script>
      case expression:

        break;
      default:

    }

  </head>


  <body class="w3-light-grey w3-content" style="max-width:1600px">

    <!-- Top header for login on screens: hide on small screen since on small screen, there will be another header. -->
    <header class="w3-container w3-top w3-hide-small w3-hide-medium w3-xlarge w3-padding-16">
        <a class="w3-right w3-btn w3-dark-grey w3-padding w3-round-jumbo"><i class="material-icons">person</i>  Login</a>
    </header>


    <!-- Sidenav/menu -->
    <nav class="w3-sidenav w3-white w3-center w3-text-grey w3-collapse w3-top" style="z-index:3;width:300px;font-weight:bold" id="mySidenav"><br>
      <h3 class="w3-padding-64"><b>WARGRID</b></h3>
          <a href="#index" onclick="index_open()" class="w3-padding">HOME</a>
          <a href="#profile" onclick="profile_open()" class="w3-padding">PROFILE</a>
          <a id="create" href="#create" onclick="create_open()" class="w3-padding">CREATE A GAME</a>
          <a href="#playwithfriend" onclick="playwfriend_open()" class="w3-padding">INVITE A FRIEND</a>
          <a href="#ai" onclick="ai_open()" class="w3-padding">PLAY AGAINST A.I.</a>
          <a href="#editor" onclick="editorPage_open()" class="w3-padding">MAP EDITOR</a>
    </nav>

    <!-- Top menu on small screens -->
    <header class="w3-container w3-top w3-hide-large w3-white w3-xlarge w3-padding-16">
      <span class="w3-left w3-padding">WARGRID</span>
      <a class="w3-right w3-btn w3-white" onclick="w3_open()">&#9776</a>
    </header>

    <!-- Overlay effect when opening sidenav on small screens -->
    <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

    <!-- !WEB PAGE CONTENT! -->
    <div class="w3-main" style="margin-left:300px">
        <!-- Push down content on small screens  -->
        <div class="w3-hide-large" style="margin-top:83px"></div>


        <!--
        <div class="w3-container w3-group w3-row" style="margin-top:83px">
          <button class="w3-col m3 w3-center w3-dark-grey w3-round-large w3-animate-zoom">Size</button>
          <button class="w3-col m3 w3-center w3-dark-grey w3-round-large w3-animate-zoom">Pattern</button>
          <button class="w3-col m3 w3-center w3-dark-grey w3-round-large w3-animate-zoom">Color</button>
          <button class="w3-col m3 w3-center w3-dark-grey w3-round-large w3-animate-zoom">Save</button>


        </div>
        -->
        <div class="w3-container" style="margin-top:83px">
          <form id = "load-map-form" action = "#">
            <input id="loadMapField" type="text" name="input a map" />
            <input id="loadMap_button" type="button" value="loadMap" />
          </form>
              <input id="reset_button" type="button" value="Reset" />
                <select id="cell_type">
                  <option value="images/Void.png">Void Cell</option>
                  <option value="images/P1_LIVE.png">player1 live cell</option>
                  <option value="images/P2_LIVE.png">player2 live cell</option>
                  <option value="images/P1_DEAD.png">player1 dead cell</option>
                  <option value="images/P2_DEAD.png">player2 dead cell</option>
                  <option value="images/EMPTY_CELL.png">remove cell</option>

                </select>
                <form id = "map-form" action = "#">
                  Creator:
                  <input id = "creator" type = "text" name = "creator">
                  map name:
                  <input id = "mapname" type = "text" name = "map name">
                    <input id = "save_button" type = "button" value = "save"/>
                </form>

                <canvas id="editor_canvas" width="512" height="512">
                </canvas>


        </div>


    </div>

<script>initEditor();</script>
  </body>
</html>
