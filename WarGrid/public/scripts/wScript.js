//open and close side nav;
function w3_open() {
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

// for local game page, left game info panel.
function w3_local_left_open() {
    document.getElementById("local_left_side_info_panel").style.display = "block";
    document.getElementById("myLocalLeftlay").style.display = "block";
}

function w3_local_left_close() {
    document.getElementById("local_left_side_info_panel").style.display = "none";
    document.getElementById("myLocalLeftlay").style.display = "none";
}


// for local game page, right chat room panel.
function w3_local_right_open() {
    document.getElementById("local_right_side_chat_panel").style.display = "block";
    document.getElementById("myLocalRightlay").style.display = "block";
}

function w3_local_right_close() {
    document.getElementById("local_right_side_chat_panel").style.display = "none";
    document.getElementById("myLocalRightlay").style.display = "none";
}


// for online game page, left game info panel.
function w3_online_left_open() {
    document.getElementById("online_left_side_info_panel").style.display = "block";
    document.getElementById("myOnlineLeftlay").style.display = "block";
}

function w3_online_left_close() {
    document.getElementById("online_left_side_info_panel").style.display = "none";
    document.getElementById("myOnlineLeftlay").style.display = "none";
}


// for online game page, right chat room panel.
function w3_online_right_open() {
    document.getElementById("online_right_side_chat_panel").style.display = "block";
    document.getElementById("myOnlineRightlay").style.display = "block";
}

function w3_online_right_close() {
    document.getElementById("online_right_side_chat_panel").style.display = "none";
    document.getElementById("myOnlineRightlay").style.display = "none";
}



function profile_open() {
    window.open("profilePage.html", "_self");
}

function index_open() {
    window.open("index.html", "_self");
}

function about_open() {
    window.open("aboutPage.html", "_self");
}

function create_open() {
    window.open("createPage.html", "_self");
}

function playwfriend_open() {
    window.open("playwfriendPage.html", "_self");
}

function ai_open() {
    window.open("aiPage.html", "_self");
}

function editorPage_open() {
    window.open("editorPage.html", "_self");
}

function game_open(key) {
    lobbyJoin(key);
    //window.location.href  = '/player_detail?username=123' ;
}

function localGame_open()
{
  window.open("localGamePage.html","_self" );
}

function campaign_open()
{
  window.open("campaign.html","_self" );
}

function campaignEditor_open()
{
  window.open("campaignEditor.html","_self" );
}

// link each team image to their website. Order follows the google doc spreadsheets.
function openAd(x)
{

    if(x===1)
        window.open("http://www.awesome-life-game.appspot.com/",    "_blank");
    else if(x===2)
        window.open("https://canary-life.firebaseapp.com/",         "_blank");
    else if(x===3)
        window.open("https://firebrick-life.firebaseapp.com/",      "_blank");
    else if(x===4)
        window.open("https://ikb-life.firebaseapp.com/",            "_blank");
    else if(x===5)
        window.open("https://jet-life.firebaseapp.com/",            "_blank");
    else if(x===6)
        window.open("https://purplelifegame.firebaseapp.com/",      "_blank");
    else if(x===7)
        window.open("https://salmon-life.firebaseapp.com/",         "_blank");
    else if(x===8)
        window.open("http://www.the-scarlet-life.appspot.com/",     "_blank");
    else if(x===9)
        window.open("https://wisteria-life.appspot.com/",           "_blank");

}
// randomly pick ad pic and display it.
function pick_and_display_adPic(x)
{
    var n = Math.floor(Math.random() *9);       // so far there are only 4 pics right now, later need to change this.
    var i;
    var x;
    if(x === 1)
        x = document.getElementsByClassName("local_adSlides");
    else if(x === 2)
        x = document.getElementsByClassName("game_adSlides");       

    for(i = 0; i < x.length; i++)
    {
        if(i === n)
        {
            x[i].style.display = "block";
            break;
        }
    }

}


//search bar from home page
function searchRoom() {
    var input, filter, cards, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    cards = document.getElementsByName("myCards");
    //window.alert(cards.length);
    for (i = 0; i < cards.length; i++) {
        if (cards[i].getElementsByTagName("p")[0].innerHTML.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        }
        else {
            cards[i].style.display = "none";
        }
    }
}


function click_map(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}

/*  show the drop_down menu which contains google and facebook sign in when user click the login icon */
function show_drop_down_menu_on_large_screen() {
    var x = document.getElementById("dropdown_menu_on_large_screen");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    }
    else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function show_drop_down_menu_on_medium_small_screen() {
    var x = document.getElementById("dropdown_menu_on_medium_small_screen");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    }
    else {
        x.className = x.className.replace(" w3-show", "");
    }
}
/* for icon button to send image */
function handleBrowseClick() {
    var fileinput = document.getElementById("mediaCapture");
    fileinput.click();
}



function determineCanvasSize() {
    // Step 0: get the browser window size.
    var x = $(window).width();
    var y = $(window).height();

    console.log("x: ", x);
    console.log("y: ", y);

    //var canvas = document.getElementById('local_game_canvas')[0];
    // Step 1: set the canvas size;
    if(x > 600)     // if browser window greater than 990, meaning larger screen, then -> set canvas to 512x512.
    {
        $("#game_canvas").attr("width","512"); 
        $("#game_canvas").attr("height","512");
        // Also change the class vars.
        $("#game_canvas_div").attr("class","w3-container w3-padding-16 w3-col m6 w3-center");
        $("#game_canvas").attr("class","w3-sand w3-round-xlarge");
    }
    else if(x <= 600)       // if browser window less than 990, meaning small screen, then -> set canvas to 256x256.
    {
        $("#game_canvas").attr("width","256"); 
        $("#game_canvas").attr("height","256"); 
        // Also change the class vars.
        $("#game_canvas_div").attr("class","w3-container w3-padding-16 w3-center w3-border");
        $("#game_canvas").attr("class","w3-sand w3-round-xlarge w3-center w3-border");
    }
    else
    {
        alert("Error: in  determineCanvasSize");
    }

    console.log("canvas x: ", $("#game_canvas").attr("width"));
    console.log("canvas y: ", $("#game_canvas").attr("height"));
   
}
