var SELECT_CAMPAIGN_ID = "campaign";

var Campaign = function() {

};

// for now, campaign is only made for players who logged in
Campaign.loadCampaign = function() {
    if (playerId) {
        var playerRef = firebase.database().ref('players');
        var campaignRef = firebase.database().ref('campaign');

        playerRef.child(playerId).once('value', function(snapshot) {
            var player = snapshot.val();

            mapRef.once('value', function(snapshot) {
                var count = 0; // counts the number of maps
                var innerHTML = ""; // content, // divide the layout into three vertical sections
                var innerHTML_array = [3]; // vertical section array
                var divider_num = 0; // use divider_num to determine which vertical section need to write on
                var i; // for the iteration of innerHTML_array

                // assign the open outter div.
                for (i = 0; i < 3; i++) {
                    innerHTML_array[i] = "\<div class=\"w3-third w3-container \"\>";
                }

                snapshot.forEach(function(data) {
                    var campaignMap = data.val();

                    // determine if a specific level should be shown
                    if (player.campaign >= campaignMap.level) {
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
                        innerHTML_array[divider_num] += "\<p class=\"w3-left w3-margin-top\"\>" + data.val().map + "\<\/p\>\<p class=\"w3-right w3-margin-top\"\>Level " + data.val().level + "\<\/p\>\<\/div\>";

                        // if reach to the third column, reset it.
                        if (divider_num === 2) divider_num = -1;

                        // increase index and count.
                        divider_num++;
                        count += 1;
                    }
                });

                // assign the close outter div.
                for (i = 0; i < 3; i++) {
                    innerHTML_array[i] += "\<\/div\>";
                    innerHTML += innerHTML[i];
                }

                // write the innerHTML into page.
                $("#" + SELECT_MAP_ID).html(innerHTML);
                console.log("You are at level ", player.campaign);
            });
        });


    } else { // go back to lobby
        alert('You need to login first');
        index_open();
    }
};
