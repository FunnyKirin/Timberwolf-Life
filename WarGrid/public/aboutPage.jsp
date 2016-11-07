<!DOCTYPE html>

<html>
  <head>
    <title>About</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <script src="scripts/wScript.js"></script>

  </head>
    <!--
    <style>
    .mySlides {display:none;}
    </style>

    -->
  <body class="w3-light-grey w3-content" style="max-width:1600px">




    <!-- Sidenav/menu -->
    <nav class="w3-sidenav w3-white w3-center w3-text-grey w3-collapse w3-top" style="z-index:3;width:300px;font-weight:bold" id="mySidenav"><br>
      <h3 class="w3-padding-64"><b>WARGRID</b></h3>
          <a href="#index" onclick="index_open()" class="w3-padding">HOME</a>
          <a href="#profile" onclick="profile_open()" class="w3-padding">PROFILE</a>
          <a id="create" href="#create" onclick="create_open()" class="w3-padding">CREATE A GAME</a>
          <a href="#playwithfriend" onclick="playwfriend_open()" class="w3-padding">INVITE A FRIEND</a>
          <a href="#ai" onclick="ai_open()" class="w3-padding">PLAY AGAINST A.I.</a>
          <a href="#editor" onclick="editorPage_open()" class="w3-padding">MAP EDITOR</a>
          <a href="#about" onclick="about_open()" class="w3-padding">ABOUT</a>
    </nav>

    <!-- Top menu on small screens -->
    <header class="w3-container w3-top w3-hide-large w3-white w3-xlarge w3-padding-16">
      <span class="w3-left w3-padding">WG</span>
      <a class="w3-right w3-btn-floating w3-white" onclick="w3_open()">&#9776</a>
    </header>

    <!-- Overlay effect when opening sidenav on small screens -->
    <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

    <!-- !WEB PAGE CONTENT! -->
    <div class="w3-main" style="margin-left:300px">
        <!-- Push down content on small screens  -->
        <div class="w3-hide-large" style="margin-top:83px"></div>
    

        <h2 class="w3-center">WARGRID Slideshow</h2>
        

            <div class="w3-content w3-display-container" style="max-width:1000px">
              <img class="mySlides" src="https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fpic_1.PNG?alt=media&token=13033dc6-2998-4da5-9274-a0c91d1e7009" style="width:100%">
              <img class="mySlides" src="https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fpic_2.PNG?alt=media&token=bda3a28b-af38-4b4a-8364-2236712c894f" style="width:100%">
              <img class="mySlides" src="https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fpic_3.PNG?alt=media&token=303d1ff4-9e2f-47c6-a0a3-637c32928000" style="width:100%">
              <img class="mySlides" src="https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fpic_4.PNG?alt=media&token=fe4605f8-7783-4ea8-a980-480a8ecf2146" style="width:100%">
              <img class="mySlides" src="https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fpic_5.PNG?alt=media&token=b137a528-cee9-42aa-afa6-2d666f25448d" style="width:100%">

              <div class="w3-center w3-section w3-large w3-text-white w3-display-bottommiddle" style="width:100%">
                <div class="w3-left w3-padding-left w3-hover-text-khaki" onclick="plusDivs(-1)">&#10094;</div>
                <div class="w3-right w3-padding-right w3-hover-text-khaki" onclick="plusDivs(1)">&#10095;</div>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(1)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(2)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(3)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(4)"></span>
                <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(5)"></span>
              </div>
            </div>

        
        <script>
          showDivs(slideIndex);
        </script>
        
    </div>
    
    </body>




</html>