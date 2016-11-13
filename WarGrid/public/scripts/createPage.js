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
            innerHTML += "; style=\"width:100%\" ; onclick=\"game_open()\"\>";
<<<<<<< HEAD
            innerHTML += "\<p class=\"w3-left\"\>"+ snapshot.val() + "\<\/p\>\<p class=\"w3-right\"\>OwnerName1\<\/p\>\<\/div\>\<\/div\>";
=======
            innerHTML += "\<p class=\"w3-left\"\>"+data.val().map + "\<\/p\>\<p class=\"w3-right\"\>"+ data.val().creator+"\<\/p\>\<\/div\>\<\/div\>";
>>>>>>> b1893adda412de5887b5abd08d1de756df5f14bb
            count += 1;
        });

        $("#" + SELECT_MAP_ID).html(innerHTML);

        console.log("Number of maps: ", count);
    });

}
