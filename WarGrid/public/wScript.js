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
	window.open("profilePage.jsp","_self" );
}

function index_open()
{
	window.open("index.html","_self" );
}


function about_open()
{
	window.open("aboutPage.jsp","_self" );
	
}

function create_open()
{
	window.open("createPage.jsp","_self" );
	
}

function playwfriend_open()
{
  window.open("playwfriendPage.jsp","_self" );
}

function ai_open()
{
  window.open("aiPage.jsp","_self" );
}

function editorPage_open()
{
  window.open("editorPage.jsp","_self" );
}

function game_open()
{
  window.open("gamePage.jsp","_self" );
}



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
    setTimeout(carousel, 2000); // Change image every 2 seconds
}





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



function click_map(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}