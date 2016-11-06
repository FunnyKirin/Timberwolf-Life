// Database
var Map = function() {
    console.log("[INFO] Loading Map Module");
    this.init();
};

Map.prototype.init = function() {
    // Shortcuts to Firebase SDK features.
    this.ref = firebase.database().ref();

};

Map.prototype.loadMap = function(name) {
    return this.ref.child('map').child(name);
};

Map.prototype.updateMap = function() {
    //TODO: do this
};
