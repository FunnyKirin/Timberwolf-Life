// Database
var Map = function() {
    console.log("Map");
    this.init();
};

Map.prototype.init = function() {
    // Shortcuts to Firebase SDK features.
    this.dbMap = firebase.database().ref().child('map');

    this.dbMap.on("value", function(snapshot) {
        console.log(snapshot.val());
    }, function(error) {
        console.log(error);
    });

};
