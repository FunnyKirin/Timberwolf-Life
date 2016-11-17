var BUTTON_CREATE_ID = 'create';
var ROOM_GRID_ID = 'room-grid';
var KEY_LOBBY = 'lobby';
var authorized=false;
function initLobby () {
    console.log('[INFO] Loading Lobby Module...');
    this.room_key = '';
    this.buttonCreate = document.getElementById(BUTTON_CREATE_ID);
    lobbyInit();
};
function lobbyHandler(player) {
    authorized = player ? true : false;
};

function lobbyInit () {
    this.ref = firebase.database().ref();
    this.auth = firebase.auth();
    this.ref.child('lobby').on('value', function (snapshot) {
        // test for fix the search of lobby page
        var count = 0;
        // divider the layout into three vertical section.
        var innerHTML = "";
        var innerHTML_1 = "\<div class=\"w3-third w3-panel\"\>";
        var innerHTML_2 = "\<div class=\"w3-third w3-panel\"\>";
        var innerHTML_3 = "\<div class=\"w3-third w3-panel\"\>";
        // use divider_num to determine which vertical section need to write
        var divider_num = 1;
        snapshot.forEach(function (data) {
            if (divider_num === 1) {
                innerHTML_1 += "\<div name=\"myCards\" class=\"w3-card-12 w3-section\"\>\<img src=\"";
                innerHTML_1 += "https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_1.PNG?alt=media&token=636a2622-cb06-473d-8144-3efa2a92a186\"";
                innerHTML_1 += "; style=\"width:100%\" ; onclick=\"game_open(\'" + data.key + "\')\"\>";
                innerHTML_1 += "\<p class=\"w3-left \"\>" + data.val().map + "\<\/p\>\<p class=\"w3-right \"\>" + data.val().owner + "\<\/p\>\<\/div\>";
            }
            else if (divider_num === 2) {
                innerHTML_2 += "\<div name=\"myCards\" class=\"w3-card-12 w3-section\"\>\<img src=\"";
                innerHTML_2 += "https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_1.PNG?alt=media&token=636a2622-cb06-473d-8144-3efa2a92a186\"";
                innerHTML_2 += "; style=\"width:100%\" ; onclick=\"game_open(\'" + data.key + "\')\"\>";
                innerHTML_2 += "\<p class=\"w3-left \"\>" + data.val().map + "\<\/p\>\<p class=\"w3-right \"\>" + data.val().owner + "\<\/p\>\<\/div\>";
            }
            else if (divider_num === 3) {
                innerHTML_3 += "\<div name=\"myCards\" class=\"w3-card-12 w3-section\"\>\<img src=\"";
                innerHTML_3 += "https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_1.PNG?alt=media&token=636a2622-cb06-473d-8144-3efa2a92a186\"";
                innerHTML_3 += "; style=\"width:100%\" ; onclick=\"game_open(\'" + data.key + "\')\"\>";
                innerHTML_3 += "\<p class=\"w3-left \"\>" + data.val().map + "\<\/p\>\<p class=\"w3-right \"\>" + data.val().owner + "\<\/p\>\<\/div\>";
                divider_num = 0;
            }
            else {
                alter("Error: in lobby load map page.");
            }
            count += 1;
            divider_num++;
        });
        innerHTML_1 += "\<\/div\>";
        innerHTML_2 += "\<\/div\>";
        innerHTML_3 += "\<\/div\>";
        innerHTML = innerHTML_1 + innerHTML_2 + innerHTML_3;
        $("#" + ROOM_GRID_ID).html(innerHTML);
        console.log("Number of rooms: ", count);
    });
    this.auth.onAuthStateChanged(lobbyHandler.bind(this));
};
function lobbyLeave() {
    if (this.authorized) {
        var challenger = this.ref.child('lobby').child(room_key).child('challenger');
        challenger.transaction('');
    }
    else {
        alert('You need to login first');
    }
};
function lobbyJoin(room_key) {
    if (this.authorized) {
        var challenger = this.ref.child('lobby').child(room_key).child('challenger');
        challenger.transaction(function(currentData){
            if(currentData==undefined){
                return this.auth.currentUser.uid;
            }
        });
    }
    else {
        alert('You need to login first');
    }
    window.open("gamePage.html?" + room_key, "_self");

};
Lobby.prototype.invite = function () {};
