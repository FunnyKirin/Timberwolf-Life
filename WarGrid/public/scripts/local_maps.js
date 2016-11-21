
var ROOM_GRID_ID = 'local_maps';
var ref;
var auth;

function local_maps_init() 
{
    ref = firebase.database().ref();
    auth = firebase.auth();
    this.ref.child('lobby').on('value', function (snapshot)
    {

        var count = 0;
        // divider the layout into three vertical sections.
        var innerHTML = "";
        var innerHTML_array = [3];  // vertical section array.
        // assign the open outter div.
        innerHTML_array[0] = "\<div class=\"w3-third w3-panel\"\>";
        innerHTML_array[1] = "\<div class=\"w3-third w3-panel\"\>";
        innerHTML_array[2] = "\<div class=\"w3-third w3-panel\"\>";


        // use divider_num to determine which vertical section need to write
        var divider_num = 0;
        snapshot.forEach(function (data)
        {
          //retrieve map images
          var storageRef = firebase.storage().ref();
          var returnimage = storageRef.child('images/' + data.val().map).toString();
          var mapImageSrc;
          console.log("returnimage " + returnimage.key);
          if (returnimage.startsWith('gs://')){
              console.log("startswith gs://");
              firebase.storage().refFromURL(returnimage).getMetadata().then(function(metadata){
                  console.log("metadata: " + metadata.downloadURLs[0]);
                  mapImageSrc = metadata.downloadURLs[0];
              });
          }
          console.log("returnimage: "  + returnimage);

            // for each map, distribute into three vertical sections by row order.
            innerHTML_array[divider_num] += "\<div name=\"myCards\" class=\"w3-card-12 w3-section\"\>\<img src=\"";
            innerHTML_array[divider_num] += "https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_1.PNG?alt=media&token=636a2622-cb06-473d-8144-3efa2a92a186\"";
            innerHTML_array[divider_num] += "; style=\"width:100%\" ; onclick=\"openGameMap(\'" + data.key + "\')\"\>";
            innerHTML_array[divider_num] += "\<p class=\"w3-left \"\>" + data.val().map + "\<\/p\>\<p class=\"w3-right \"\>" + data.val().owner + "\<\/p\>\<\/div\>";

            // if reach to the third column, reset it.
            if(divider_num === 2)
                divider_num = -1;

            // increase index and count.
            divider_num++;
            count += 1;

        });
        // assign the close outter div.
        innerHTML_array[0] += "\<\/div\>";
        innerHTML_array[1] += "\<\/div\>";
        innerHTML_array[2] += "\<\/div\>";
        innerHTML = innerHTML_array[0] + innerHTML_array[1] + innerHTML_array[2];
        // write the innerHTML into page.
        $("#" + ROOM_GRID_ID).html(innerHTML);
        console.log("Number of rooms: ", count);
    });
    this.auth.onAuthStateChanged(lobbyHandler.bind(this));
}


function openGameMap(room_key)
{
    window.open("gamePage.html?" + room_key, "_self");
}






