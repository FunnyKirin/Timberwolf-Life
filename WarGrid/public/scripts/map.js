// Map Module
var Map = function () {
    console.log('[INFO] Loading Map Module...');
    this.init();
};
Map.prototype.mapHandler = function (player) {};

Map.prototype.loadMap = function (name) {
    /*
    var loadMapName = name;
    this.db = firebase.database();
    dbref = this.db.ref().child('maps');
    //  this.dbref = this.db.ref('map');
    dbref.orderByValue().limitToLast(100).on("value", function (snapshot) {
        snapshot.forEach(function (data) {
            //console.log("The key:   " + data.key + " map is:  " + data.val().map + "data: " + data.val().data);
            if (data.val().map === loadMapName) {
                key = data.key;
                return data.val().data;

            }
        });
    });
    */

<<<<<<< HEAD
Map.prototype.loadMap = function(name) {
    var map;
    firebase.database().ref('/map/').child(name).on('value', function(snapshot) {
        map = snapshot.val();
=======
    this.db.ref('/map/' + name).on('value', function(snapshot) {
        return snapshot.val();
>>>>>>> 3012787d669ca45827e1f60509fe4e094c42d6f1
    }, function(error) {
        console.log("[ERROR] Failed to load: ", name, " (" + error + ")");
    });
<<<<<<< HEAD
    return map;
};
=======
>>>>>>> 3012787d669ca45827e1f60509fe4e094c42d6f1

};
//
Map.prototype.updateMap = function (json) {
    var map = {};
    var name = json.name;
    var data = json.data;
    var creator = json.creator;
    var x = json.x;
    var y = json.y;
    map['/map/' + name] = {
        "data": data
        , "creator": creator
        , "x": x
        , "y": y
    };
    return this.db.ref().update(map);
};
Map.prototype.init = function () {
    this.db = firebase.database();
    this.auth = firebase.auth();
<<<<<<< HEAD
    //this.auth.onAuthStateChanged(this.mapHandler.bind(this));
=======
    this.auth.onAuthStateChanged(this.mapHandler.bind(this));
>>>>>>> 3012787d669ca45827e1f60509fe4e094c42d6f1
};
