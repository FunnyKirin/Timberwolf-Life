var SELECT_CAMPAIGN_ID = "campaign";

var Campaign = function() {
    console.log("[INFO] Loading Campaign Module...");
    firebase.auth().onAuthStateChanged(this.loadCampaign.bind(this));
};
//
// for now, campaign is only made for players who logged in
// firebase ref('campaign')
// the maps cannot be directly edited?
// campaign editor available to public for now
// compared to normal maps, campaign has a story it does not have a chat
Campaign.prototype.loadCampaign = function(player) {
    var campaignRef = firebase.database().ref('campaign');

    campaignRef.orderByChild('level').on('value', function(campaignSnap) {
        var count = 0; // counts the number of maps
        var innerHTML = ""; // content, // divide the layout into three vertical sections
        var innerHTML_array = [3]; // vertical section array
        var divider_num = 0; // use divider_num to determine which vertical section need to write on
        var i; // for the iteration of innerHTML_array

        // assign the open outter div.
        for (i = 0; i < 3; i++) {
            innerHTML_array[i] = "\<div class=\"w3-third w3-container \"\>";
        }

        campaignSnap.forEach(function(data) { // the image
            // finally, retrieve map images
            var storageRef = firebase.storage().ref();
            var returnImage = storageRef.child('campaign/' + data.val().map).toString();

            if (returnImage.startsWith('gs://')) {
                firebase.storage().refFromURL(returnImage).getMetadata().then(function(metadata) {
                    var mapImageSrc = document.getElementById(data.val().map);
                    mapImageSrc.src = metadata.downloadURLs[0];
                });
            }

            // for each map, distribute into three vertical sections by row order.
            innerHTML_array[divider_num] += "\<div name=\"myCards\" class=\"myMapCard w3-container  w3-card-2 w3-round-large w3-section \"\>\<img id=\"" + data.val().map + "\"src=\"";
            innerHTML_array[divider_num] += "https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_1.PNG?alt=media&token=636a2622-cb06-473d-8144-3efa2a92a186\"";
            innerHTML_array[divider_num] += "; style=\"width:100%\" ; class=\"w3-margin-top \" ; onclick=\"createRoom('" + data.val().map + "')\"\>";
            innerHTML_array[divider_num] += "\<p class=\"w3-left w3-margin-top\"\>" + data.val().map + "\<\/p\>\<p class=\"w3-right w3-margin-top\"\>Level " + data.val().level + "\<\/p\>\<\/div\>";

            // if reach to the third column, reset it.
            if (divider_num === 2) divider_num = -1;

            // increase index and count.
            divider_num++;
            count += 1;

        });

        // assign the close outter div.
        for (i = 0; i < 3; i++) {
            innerHTML_array[i] += "\<\/div\>";
            innerHTML += innerHTML_array[i];
        }

        // write the innerHTML into page.
        $("#" + SELECT_CAMPAIGN_ID).html(innerHTML);
    });

};

// triggers when the picture of a map is clicked in campaign page
function createRoom(map) {
    if (playerId) { // player is logged in
        var playerRef = firebase.database().ref('players');
        var playerUidRef = firebase.database().ref('playerUID');

        playerUidRef.child(player.uid).once('value', function(uidSnap) {
            var playerId = uidSnap.val();
            playerRef.child(playerId).once('value', function(snapshot) {
                var player = snapshot.val();
                console.log("You are at level", player.campaign);

                var dbRef = firebase.database().ref(); // reference to root of database
                var newKey = dbRef.child("lobby").push().key; // new key for room
                var lobby = {}; // lobby placeholder
                var grid = []; // grid placeholder

                // load map into grid
                dbRef.child('campaign').child(map).once('value', function(snapshot) {
                    if (snapshot.val()) { // if the map exists of course
                        var level = snapshot.val().level; // set the grid data

                        if (player.campaign >= level) {
                            enterLocalGame(map); // game!
                        } else {
                            alert('You are only at level: ' + player.campaign);
                        }
                    }
                });

            });
        });
    } else { // player is a guest
        alert('You need to login first');
    }
}

function enterLocalGame(map) {
    window.open("campaignGame.html?" + map + 2, "_self");
}
