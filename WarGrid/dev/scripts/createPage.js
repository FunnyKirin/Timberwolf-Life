function loadMaps() {
    var SELECT_MAP_ID = "maps";
    this.ref = firebase.database().ref();
    this.auth = firebase.auth();
    this.ref.child('maps').on('value', function(snapshot) {
        /*
        var count = 0;
        var innerHTML = "";
        snapshot.forEach(function (data) {
            innerHTML += "\<div class=\"w3-third w3-panel\"\>";
            innerHTML += "\<div name=\"myCards\" class=\"w3-card-12\"\>\<img src=\"";
            innerHTML += "https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_1.PNG?alt=media&token=636a2622-cb06-473d-8144-3efa2a92a186\"";
            innerHTML += "; style=\"width:100%\" ; onclick=\"createRoom('" + data.val().map + "')\"\>";
            innerHTML += "\<p class=\"w3-left\"\>" + data.val().map + "\<\/p\>\<p class=\"w3-right\"\>" + data.val().creator + "\<\/p\>\<\/div\>\<\/div\>";
            count += 1;
        });
        $("#" + SELECT_MAP_ID).html(innerHTML);
        console.log("Number of maps: ", count);
        */
        var count = 0;
        // divider the layout into three vertical sections.
        var innerHTML = "";
        var innerHTML_array = [3]; // vertical section array.
        // assign the open outter div.
        innerHTML_array[0] = "\<div class=\"w3-third w3-container \"\>";
        innerHTML_array[1] = "\<div class=\"w3-third w3-container\"\>";
        innerHTML_array[2] = "\<div class=\"w3-third w3-container\"\>";
        // use divider_num to determine which vertical section need to write
        var divider_num = 0;
        snapshot.forEach(function(data) {
            //retrieve map images
            var storageRef = firebase.storage().ref();
            var returnimage = storageRef.child('images/' + data.val().map).toString();
            var mapImageSrc;
            if (returnimage.startsWith('gs://')) {
                firebase.storage().refFromURL(returnimage).getMetadata().then(function(metadata) {
                    mapImageSrc = document.getElementById(data.val().map);
                    mapImageSrc.src = metadata.downloadURLs[0];
                });
            }
            // for each map, distribute into three vertical sections by row order.
            innerHTML_array[divider_num] += "\<div name=\"myCards\" class=\"myMapCard w3-container  w3-card-2 w3-round-large w3-section \"\>\<img id=\"" + data.val().map + "\"src=\"";
            innerHTML_array[divider_num] += "https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_1.PNG?alt=media&token=636a2622-cb06-473d-8144-3efa2a92a186\"";
            innerHTML_array[divider_num] += "; style=\"width:100%\" ; class=\"w3-margin-top \" ; onclick=\"createRoom('" + data.val().map + "')\"\>";
            innerHTML_array[divider_num] += "\<p class=\"w3-left w3-margin-top\"\>" + data.val().map + "\<\/p\>\<p class=\"w3-right w3-margin-top\"\>" + data.val().creator + "\<\/p\>\<\/div\>";
            // if reach to the third column, reset it.
            if (divider_num === 2) divider_num = -1;
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
        $("#" + SELECT_MAP_ID).html(innerHTML);
        console.log("Number of maps: ", count);
    });
}

// triggers when the picture of a map is clicked in create page
function createRoom(map) {
    var dbRef = firebase.database().ref(); // ref to db
    var newKey = dbRef.child("lobby").push().key; // new key for room
    var lobby = {};
    var grid = [];

    // don't know why this is here
    if (!authorized) {
        playerId = "";
    }

    // load map into grid
    dbRef.child('maps').child(map).once('value', function(snapshot) {
        if (snapshot.val()) { // if the map exists of course
            grid = snapshot.val().data; // set the grid data

            // actual data
            var lobbyData = {
                map: map,
                challenger: '',
                owner: playerId,
                grid: grid,
                currentPlayer: 1
            };

            lobby['/lobby/' + newKey] = lobbyData; // directory
            dbRef.update(lobby); // updates the database, create the room
            game_open(newKey); // redirection
        }
    });
}
