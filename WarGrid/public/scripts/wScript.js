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

    //console.log("x: ", x);
    //console.log("y: ", y);

    //console.log("x: ", x);
    //var left = (x - 512 - 100) / 2;
    //console.log("left: ", left);
    

    //console.log("canvas x: ", $(".game_canvas_box").attr("width"));
    //console.log("canvas y: ", $(".game_canvas_box").attr("height"));
    
    // Step 1: set the canvas size;
    if(x > 975)     // if browser window greater than 975, meaning larger screen, then -> set canvas to 512x512.
    {
        $(".game_canvas_box").attr("width","512"); 
        $(".game_canvas_box").attr("height","512");
        // Also change the class vars.
        $(".game_canvas_div").attr("class","w3-container w3-padding-16 w3-col m6 w3-center");
        //$(".game_canvas_box").attr("style","margin:auto");
        $(".game_canvas_box").attr("class","game_canvas_box w3-sand w3-round-xlarge");

        //console.log("canvas x: large");
    }
    else if(x <= 975 && x > 583)     // if browser window between (583, 975] , meaning medium screen, then -> set canvas to 512x512.
    {
        $(".game_canvas_box").attr("width","512"); 
        $(".game_canvas_box").attr("height","512");
        // Also change the class vars.
        $(".game_canvas_div").attr("class","w3-container w3-padding-16 w3-center");
        //$(".game_canvas_box").attr("style","margin:auto");
        $(".game_canvas_box").attr("class","game_canvas_box w3-sand w3-round-xlarge");

        //console.log("canvas x: medium");
    }
    else if(x <= 583)       // if browser window less than 583, meaning small screen, then -> set canvas to 256x256.
    {
        $(".game_canvas_box").attr("width","256"); 
        $(".game_canvas_box").attr("height","256"); 
        // Also change the class vars.
        $(".game_canvas_div").attr("class","w3-container w3-padding-16 w3-center");
        //$(".game_canvas_box").attr("style","margin:auto");
        $(".game_canvas_box").attr("class","game_canvas_box w3-sand w3-round-xlarge");

        //console.log("canvas x: small");
    }
    else
    {
        alert("Error: in  determineCanvasSize");
    }

    //console.log("canvas x: ", $(".game_canvas_box").attr("width"));
    //console.log("canvas y: ", $(".game_canvas_box").attr("height"));
   
}


// for larger screen, game_page_message_box needs to be div with some style;
// for small screen, game_page_message_box needs to be nav (side nav) with some style;
function changeChatRoomDtoN()
{
    // Step 0: get the browser window size.
    var x = $(window).width();
    var y = $(window).height();

    console.log("canvas x: ", x);
    
    var html_string =       "<span id='message-filler'>"
                    +       "</span>"
                    +   "</div>"
                    +   "<div id='chat'>"
                    +       "<form id='message-form' action='#'' class='w3-container w3-margin-top'>"
                    +           "<div class='mdl-textfield mdl-js-textfield mdl-textfield-floating-label'>"
                    +               "<input class='game_page_message_input w3-input w3-dark-grey w3-animate-input' type='text' placeholder='Message...' id='message'>"
                    +           "</div>"
                    +           "<button id='submit' disabled type='submit' class='w3-btn w3-teal w3-round-large w3-margin-top w3-left w3-animate-zoom w3-hover-sand'>Send</button>"
                    +       "</form>"
                    +   "</div>"; 


    if(x > 975)
    {
        //console.log("large screen.");

        $(".chatRoom_div_section").html("<div class='w3-col w3-container w3-padding-16 m3 w3-right'>" 
                                       +    "<div id='messages' class='game_page_message_box w3-container w3-card-0 w3-sand w3-round' style='height:450px; width:300px; margin-left:10px; margin-top:0px'>"
                                       +        html_string
                                       +"</div>");

    
        //console.log("style: " , $(".game_page_message_box").attr("style"));

        
        
    }
    else if(x <= 975 && x > 583)     // if browser window between (583, 975] , meaning medium screen, then -> set canvas to 512x512.
    {
        $(".chatRoom_div_section").hide();

        //console.log("medium screen.");
    }
    else if(x <= 583)
    {

        $(".chatRoom_div_section").html("<nav class='right_side_chat_room-style w3-sidenav w3-animate-right w3-dark-grey w3-center w3-text-grey w3-top' id='online_right_side_chat_panel'>" 
                                       +    "<div id='messages' class='game_page_message_box w3-container w3-card-0 w3-sand w3-round' style='height:350px; width:180px; margin-left:10px; margin-top:10px'>"
                                       +        html_string
                                       +"</nav>");

        

        //console.log("style: " , $(".game_page_message_box").attr("style"));
        //console.log("small screen.");
    }
    else
    {
        alert("Error: in  changeChatRoomDtoN");
    }



    //console.log("canvas x: ", x);
}
