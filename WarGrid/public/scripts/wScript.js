//open and close side nav;

function w3_open()
{
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close()
{
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

function profile_open()
{
	window.open("profilePage.html","_self" );
}

function index_open()
{
	window.open("index.html","_self" );
}


function about_open()
{
	window.open("aboutPage.html","_self" );

}

function create_open()
{
	window.open("createPage.html","_self" );

}

function playwfriend_open()
{
  window.open("playwfriendPage.html","_self" );
}

function ai_open()
{
  window.open("aiPage.html","_self" );
}

function editorPage_open()
{
  window.open("editorPage.html","_self" );
}

function game_open(key)
{
  window.open("gamePage.html?"+key,"_self" );
    
    //window.location.href  = '/player_detail?username=123' ;
}


/*//Automatic slideshow
function carousel()
{
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 5000); // Change image every 2 seconds
}
*/



//search bar from home page
function myFunction() {
    var input, filter, cards, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    cards = document.getElementsByName("myCards");

    //window.alert(cards.length);
    for (i = 0; i < cards.length; i++)
    {
        if (cards[i].getElementsByTagName("p")[0].innerHTML.toUpperCase().indexOf(filter) > -1)
        {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

/*
function myFunction()
{
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
*/


function click_map(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}




//SlideShow from aboutPage
var slideIndex = 1;
//showDivs(slideIndex);

function plusDivs(n)
{
  showDivs(slideIndex += n);
}

function currentDiv(n)
{
  showDivs(slideIndex = n);
}

function showDivs(n)
{
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1; }
  if (n < 1) {slideIndex = x.length; }
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-white";
}



/*  show the drop_down menu which contains google and facebook sign in when user click the login icon */
function show_drop_down_menu_on_large_screen()
{
  var x = document.getElementById("dropdown_menu_on_large_screen");


  if( x.className.indexOf("w3-show") == -1 )
  {
    x.className += " w3-show";
  }
  else
  {
    x.className = x.className.replace(" w3-show", "");
  }

}



function show_drop_down_menu_on_medium_small_screen()
{
  var x = document.getElementById("dropdown_menu_on_medium_small_screen");


  if( x.className.indexOf("w3-show") == -1 )
  {
    x.className += " w3-show";
  }
  else
  {
    x.className = x.className.replace(" w3-show", "");
  }

}



// progess bar from map editor page.

/* put it into editor.js
function barMove()
{
  var elem = document.getElementById("myBar");
  var width = 0;
  var id = setInterval(frame, 10);

  function frame()
  {
    if(width >= 100)
    {
    clearInterval(id);
    }
    else
    {
      width++;
      elem.style.width = width + '%';
      document.getElementById("progressbar_num").innerHTML = width * 1 + '%';
    }
  }
}
*/
                    