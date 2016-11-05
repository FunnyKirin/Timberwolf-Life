// jsonfile module

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

// save the updated object to url
function updateMap(json, url) {

}
