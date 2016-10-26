<!DOCTYPE html>

<html>
  <head>
    <title>Create</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <script src="wScript.js"></script>

  </head>


  <body class="w3-light-grey w3-content" style="max-width:1600px">




    <!-- Sidenav/menu -->
    <nav class="w3-sidenav w3-white w3-center w3-text-grey w3-collapse w3-top" style="z-index:3;width:300px;font-weight:bold" id="mySidenav"><br>
      <h3 class="w3-padding-64"><b>WARGRID</b></h3>
          <a href="#index" onclick="index_open()" class="w3-padding">HOME</a>
          <a href="#profile" onclick="profile_open()" class="w3-padding">PROFILE</a>
          <a href="#create" onclick="create_open()" class="w3-padding">CREATE</a>
          <a href="#playwithfriend" onclick="playwfriend_open()" class="w3-padding">PLAY WITH FRIEND</a>
          <a href="#ai" onclick="ai_open()" class="w3-padding">A.I.</a>
          <a href="#editor" onclick="editorPage_open()" class="w3-padding">EDITOR</a>
          <a href="#about" onclick="about_open()" class="w3-padding">ABOUT</a>
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


        <div class="w3-container">
            <h1>Create Room</h1>
            <p>Select Maps:</p>

        
            <div class="w3-row-padding w3-card-8 w3-panel w3-twothird w3-round-large">
                <div class="w3-third w3-padding-24">
                    <img src="https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_1.PNG?alt=media&token=636a2622-cb06-473d-8144-3efa2a92a186"; style="width:80%"; 
                    onclick="game_open()">
                    <p>...</p>
                </div>
                <div class="w3-third w3-padding-24">
                    <img src="https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_2.PNG?alt=media&token=914a072d-223d-4aab-99e5-72d3e6e4bb08"; style="width:80%";
                    onclick="game_open()">
                    <p>...</p>
                </div>
                <div class="w3-third w3-padding-24">
                    <img src="https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_3.PNG?alt=media&token=fecdad9e-9675-4951-b530-5709bf446c42"; style="width:80%";
                    onclick="game_open()">
                    <p>...</p>
                </div>
            </div>


        </div> 

    </div>
