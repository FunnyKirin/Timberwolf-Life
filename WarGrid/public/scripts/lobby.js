var BUTTON_CREATE_ID = 'create';
var ROOM_GRID_ID = 'room-grid';
var KEY_LOBBY = 'lobby';

var key;

var Lobby = function() {
    console.log('[INFO] Loading Lobby Module...');

    this.authorized = false;
    this.buttonCreate = document.getElementById(BUTTON_CREATE_ID);

    this.buttonCreate.addEventListener('click', this.create.bind(this));

    this.init();
};

Lobby.prototype.lobbyHandler = function(player) {
    this.authorized = player ? true : false;
};

Lobby.prototype.init = function() {

    this.ref = firebase.database().ref();
    this.auth = firebase.auth();

    this.ref.child('maps').on('value', function(snapshot) {
        var count = 0;
        var innerHTML = "";

        snapshot.forEach(function(data) {
            innerHTML += "\<div class=\"w3-third w3-panel\"\>";
            innerHTML += "\<div name=\"myCards\" class=\"w3-card-12\"\>\<img src=\"";
            innerHTML += "https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_1.PNG?alt=media&token=636a2622-cb06-473d-8144-3efa2a92a186\"";
            innerHTML += "; style=\"width:100%\" ; onclick=\"game_open()\"\>";
            innerHTML += "\<p class=\"w3-left\"\>RoomName1\<\/p\>\<p class=\"w3-right\"\>OwnerName1\<\/p\>\<\/div\>\<\/div\>";


            count += 1;
        });

        $("#" + ROOM_GRID_ID).html(innerHTML);

        console.log("Number of maps: ", count);
    });



    this.auth.onAuthStateChanged(this.lobbyHandler.bind(this));
};

Lobby.prototype.create = function() {
    var newKey = this.ref.child(KEY_LOBBY).push().key;
    var lobby = {};
    var lobbyData = {
        map: '',
        challenger: '',
        owner: ''
    };

    lobby['/' + KEY_LOBBY + '/' + newKey] = lobbyData;
    return this.ref.update(lobby);
};

Lobby.prototype.leave = function() {

};

Lobby.prototype.join = function() {

};

Lobby.prototype.invite = function() {

};
