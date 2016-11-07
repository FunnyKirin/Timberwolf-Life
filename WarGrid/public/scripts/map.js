// Map Module
var Map = function() {
    this.init();
};

Map.prototype.mapHandler = function(player) {

};

Map.prototype.loadMap = function(name) {
    return this.dbRef.child('map').child(name);
};

Map.prototype.updateMap = function(name, json) {

};

Map.prototype.init = function() {
    this.dbRef = firebase.database().ref();
    this.auth = firebase.auth();

    //this.auth.onAuthStateChanged(this.mapHandler.bind(this));
};

// load json file from server
var loadMap = function(url) {
    return $.getJSON(url, function(data) {
            console.log("Name: " + data.name);
            console.log("Creator: " + data.creator);
            console.log("Data: " + data.data);
    }).done(function() {
        console.log("Map Loading Success");
    }).fail(function() {
        console.log("Map Loading Error");
    }).always(function() {
        console.log("End of loadMap()");
    });
};
