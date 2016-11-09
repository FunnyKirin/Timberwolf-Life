var BUTTON_CREATE_ID = 'create';
var ROOM_GRID_ID = 'room-grid';

var Session = function() {
    console.log('[INFO] Loading Session Module...');

    this.authorized = false;
    this.buttonCreate = document.getElementById(BUTTON_CREATE_ID);

    this.buttonCreate.addEventListener('click', this.create.bind(this));

    this.init();
};

Session.prototype.sessionHandler = function(player) {
    this.authorized = player ? true : false;
};

Session.prototype.init = function() {
    this.dbRef = firebase.database().ref();
    this.auth = firebase.auth();

    this.dbRef.on('child_added', function(snapshot) {
        snapshot.forEach(function(data) {
            var innerHTML = "\<div class=\"w3-third w3-panel\"\>";
            innerHTML += "\<div name=\"myCards\" class=\"w3-card-12\"\>\<img src=\"";
            innerHTML += "https://firebasestorage.googleapis.com/v0/b/wargrid-cbca4.appspot.com/o/images%2Fmap_t_1.PNG?alt=media&token=636a2622-cb06-473d-8144-3efa2a92a186\"";
            innerHTML += "; style=\"width:100%\" ; onclick=\"game_open()\"\>";
            innerHTML += "\<p class=\"w3-left\"\>RoomName1\<\/p\>\<p class=\"w3-right\"\>OwnerName1\<\/p\>\<\/div\>\<\/div\>";
            $("#" + ROOM_GRID_ID).html(innerHTML);
        });
    });

    this.auth.onAuthStateChanged(this.sessionHandler.bind(this));
};

Session.prototype.create = function() {
    var newKey = this.dbRef.child('session').push().key;
    var session = {};
    var sessionData = {
        map: 'null',
        challenger: 'null',
        owner: this.auth.currentUser
    };

    session['/session/' + newKey] = sessionData;

    console.log('new session: ', newKey);

    return this.dbRef.update(session);
};

Session.prototype.leave = function() {

};

Session.prototype.join = function() {

};

Session.prototype.invite = function() {

};
