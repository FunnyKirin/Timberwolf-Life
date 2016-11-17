function loadMaps() {
    var SELECT_MAP_ID = "maps";
    this.ref = firebase.database().ref();
    this.auth = firebase.auth();
    this.ref.child('maps').on('value', function (snapshot) {
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
    });
}

function createRoom(map) {
    var newKey = this.ref.child("lobby").push().key;
    var lobby = {};
    var grid = [];

    //  load map into grid
    this.ref.child('maps').orderByValue().limitToLast(100).on("value", function (snapshot) {
        snapshot.forEach(function (data) {
            //console.log("The key:   " + data.key + " map is:  " + data.val().map + "data: " + data.val().data);
            if (data.val().map === map) {
                grid = data.val().data;
            }
        });
    });
    //create room
    var lobbyData = {
        map: map
        , challenger: ''
        , owner: firebase.auth().currentUser.uid
        , grid: grid
        , currentPlayer: 1
    };
    lobby['/lobby/' + newKey] = lobbyData;
    this.ref.update(lobby);
    game_open(newKey);
}
