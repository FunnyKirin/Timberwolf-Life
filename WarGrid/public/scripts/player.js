var GOOGLE_SIGNIN_ID = "google-sign-in";
var FACEBOOK_SIGNIN_ID = "facebook-sign-in";
var SIGNOUT_ID = "sign-out";
var PROFILE_PIC_ID = "profile-pic";
var PLAYER_ID_ID = "player-id";
var PLAYER_PROFILE_ID = "player-profile-desktop";
var PLAYER_PROFILE_ID_2 = "player-profile-mobile";

var playerId;

var Player = function() {
    console.log('[INFO] Loading Player Module...');

    this.profilePic = document.getElementById(PROFILE_PIC_ID);
    this.playerId = document.getElementById(PLAYER_ID_ID);
    this.buttonSigninGoogle = document.getElementById(GOOGLE_SIGNIN_ID);
    this.buttonSigninFacebook = document.getElementById(FACEBOOK_SIGNIN_ID);
    this.buttonSignout = document.getElementById(SIGNOUT_ID);
    this.buttonProfile = document.getElementById(PLAYER_PROFILE_ID);

    this.init();
};

Player.prototype.playerHandler = function(player) {
    if (player) { // logged in
        var profilePicUrl = player.photoURL;
        var displayName = player.displayName;
        var email = player.email;

        // html element display
        $("." + GOOGLE_SIGNIN_ID).hide();
        $("." + FACEBOOK_SIGNIN_ID).hide();
        $("." + SIGNOUT_ID).show();
        $("." + PLAYER_PROFILE_ID).html("<i class=\"material-icons\">person</i> " + displayName);

        // database management of players
        this.ref.child('player').child(email).once('value', function(pid) {
            if (pid) { // user already registered
                this.ref.child('player').child(pid).once('value', function(player) {
                    var p = player.val();
                    p[online] = true;
                    this.ref.child('player').child(pid).update(p);
                });
            } else { // prompt user to register
                var id = prompt("First time? Get yourself a unique name");
                this.ref.child('player').child(pid).once('value', function(attempt) {
                    if (attempt) { // lol username taken
                        alert('lol Player ID taken');
                    } else { // cool, update database
                        var p = {
                            online: true,
                            id: id,
                            totalWins: 0,
                            history: {}
                        };
                        this.ref.child('player').push(p);
                        playerId = id;
                    }
                }, function(error) {
                    console.log("[ERROR] Error signing in player: ", error);
                });
            }
        }, function(error) {
            console.log("[ERROR] Error signing in player: ", error);
        });

        //console.log("Hello, ", playerId);
        //console.log("You signed in with ", email);

    } else { // logged out
        $("." + GOOGLE_SIGNIN_ID).show();
        $("." + FACEBOOK_SIGNIN_ID).show();
        $("." + SIGNOUT_ID).hide();
        $("." + PLAYER_PROFILE_ID).html("<i class=\"material-icons\">person</i> Login");

        // player offline
        this.ref.child('player').child(playerId).once('value', function(player) {
            var p = player.val();
            p[online] = false;
            this.ref.child('player').child(playerId).update(player);
        });
    }
};

Player.prototype.googleSignIn = function() {
    console.log("Google authentication");

    var google = new firebase.auth.GoogleAuthProvider();
    google.addScope("https://www.googleapis.com/auth/userinfo.email");
    google.addScope("https://www.googleapis.com/auth/userinfo.profile");

    this.auth.signInWithPopup(google).catch(function(error) {
        console.log("ERROR: ", error);
    });
};

Player.prototype.facebookSignIn = function() {
    console.log("Facebook authentication");

    var facebook = new firebase.auth.FacebookAuthProvider();

    this.auth.signInWithPopup(facebook).catch(function(error) {
        console.log("ERROR: " + error);
    });
};

Player.prototype.signOut = function() {
    this.auth.signOut();
};

Player.prototype.init = function() {
    // Shortcuts to Firebase SDK features.
    this.ref = firebase.database().ref();
    this.auth = firebase.auth();
    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.playerHandler.bind(this));
};
