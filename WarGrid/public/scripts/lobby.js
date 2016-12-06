var BUTTON_CREATE_ID = 'create';
var ROOM_GRID_ID = 'room-grid';
var KEY_LOBBY = 'lobby';
//TODO: localize these
var authorized = false;
var auth;
var dbref;

var roomSetting=0;

function lobby() {
    console.log('[INFO] Loading Lobby Module...');
    this.room_key = '';
    this.buttonCreate = document.getElementById(BUTTON_CREATE_ID);
    lobbyInit();
}
// initialize lobby
function lobbyInit() {
    // initialize variables for easier access
    dbref = firebase.database().ref();
    auth = firebase.auth();
    dbref.child('lobby').on('value', function (snapshot) {
        var count = 0;
        // divider the layout into three vertical sections.
        var innerHTML = "";
        var innerHTML_array = [3]; // vertical section array.
        // assign the open outter div.
        innerHTML_array[0] = "\<div class=\"w3-third w3-container \"\>";
        innerHTML_array[1] = "\<div class=\"w3-third w3-container \"\>";
        innerHTML_array[2] = "\<div class=\"w3-third w3-container \"\>";
        // use divider_num to determine which vertical section need to write
        var divider_num = 0;
        snapshot.forEach(function (data) {
            if ((data.val().challenger == ""&&roomSetting==0)||roomSetting==1) {
                var randomID = Math.floor((Math.random() * 1000) + 1);
                //retrieve map images
                var storageRef = firebase.storage().ref();
                var returnimage = storageRef.child('images/' + data.val().map).toString();
                var mapImageSrc;
                if (returnimage.startsWith('gs://')) {
                    firebase.storage().refFromURL(returnimage).getMetadata().then(function (metadata) {
                        mapImageSrc = document.getElementById(data.val().map + randomID);
                        mapImageSrc.src = metadata.downloadURLs[0];
                    });
                }
                // for each map, distribute into three vertical sections by row order.
                innerHTML_array[divider_num] += "\<div name=\"myCards\" class=\"myMapCard w3-container w3-center w3-card-2 w3-round-large w3-section\"\>\<img id = \"" + data.val().map + randomID + "\"src=\"";
                innerHTML_array[divider_num] += "https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_1.PNG?alt=media&token=636a2622-cb06-473d-8144-3efa2a92a186\"";
                innerHTML_array[divider_num] += "; style=\"width:100%\" ; onclick=\"lobbyJoin(\'" + data.key + "\')\"\>";
                innerHTML_array[divider_num] += "\<p class=\"w3-left w3-section\"\>" + data.val().map + "\<\/p\>\<p class=\"w3-right w3-section\"\>" + data.val().owner + "\<\/p\>\<\/div\>"; // if reach to the third column, reset it.
                // if reach to the third column, reset it.
                if (divider_num === 2) divider_num = -1;
                // increase index and count.
                divider_num++;
                count += 1;
            }
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
    auth.onAuthStateChanged(function (player) {
        authorized = player ? true : false;
        console.log(authorized ? 'authorized' : 'unauthorized');
    });
    dbref.child('lobby').on('child_removed', function (snapshot) {
        window.location.href(window.location.origin);
    });
}

function changeRoomSetting(){
    if(roomSetting)
        roomSetting=0;
    else
        roomSetting=1;
    lobbyInit();
}

// handles the operation of leaving a game room
function lobbyLeave(room_key) {
    if (authorized) { // user has logged in
        var roomRef = firebase.database().ref('lobby/' + room_key); // game session
        var challenger = roomRef.child('challenger');
        var owner = roomRef.child('owner');
        challenger.once('value', function (snapshot) {
            if (snapshot.val()) { // we have a challenger
                challenger.transaction('');
                if (playerId != snapshot.val()) { // you are a challenger
                    console.log('Player ' + playerId + ' has been promoted to owner');
                    owner.transaction(playerId);
                }
            }
            else { // there's only an owner
                // [IMPORTANT] in this case, we are getting rid of the room
                roomRef.remove();
            }
        });
    }
    else { //TODO: anonymous users
    }
}
// handles the operation of joining a room
function lobbyJoin(room_key) {
    var ref = firebase.database().ref();
    var challenger = ref.child('lobby').child(room_key).child('challenger');
    var owner = ref.child('lobby').child(room_key).child('owner');
    if (authorized) {
        owner.transaction(function (currentData) {
            if (currentData == playerId) { // what is this
                window.open("gamePage.html?" + room_key, "_self");
            }
            else {
                challenger.transaction(function (currentData) {
                    return playerId;
                });
                window.open("gamePage.html?" + room_key, "_self");
            }
        });
    }
    else {
        owner.once("value", function (snapshot) {
            owner = snapshot.val();
        });
        challenger.once("value", function (snapshot) {
            challenger = snapshot.val();
        });
        if (owner === "") {
            window.open("gamePage.html?" + room_key + " 1", "_self");
            ref.child('lobby').child(room_key).child('owner').set("Anonymous");
        }
        else if (challenger === "") {
            window.open("gamePage.html?" + room_key + " 2", "_self");
            ref.child('lobby').child(room_key).child('challenger').set("Anonymous");
        }
        else {
            window.open("gamePage.html?" + room_key, "_self");
        }
    }
}