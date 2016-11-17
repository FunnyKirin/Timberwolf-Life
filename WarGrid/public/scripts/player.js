var GOOGLE_SIGNIN_ID = "google-sign-in";
var FACEBOOK_SIGNIN_ID = "facebook-sign-in";
var SIGNOUT_ID = "sign-out";
var PROFILE_PIC_ID = "profile-pic";
var PLAYER_ID_ID = "player-id";
var PLAYER_PROFILE_ID = "player-profile-desktop";
var PLAYER_PROFILE_ID_2 = "player-profile-mobile";

var playerId;
var playerObj = {};

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
        //var profilePicUrl = player.photoURL;
        //var displayName = player.displayName;
        //var email = player.email;
        var uid = player.uid;
        var registered = false;

        console.log("UID: ", uid);
        var thisThis = this;

        // check if user is already registered
        this.ref.child('playerID').once('value', function(snapshot) {
            if (snapshot.hasChild(uid)) { // already registered
                playerId = snapshot.val();
                registered = true;
            } else { // user registration
                registered = false;
            }
        });

        // user registration process
        if (!registered) {
            var regulation = ['+', '-', '@', '.', ',', '=', '*', '&', ' '];
            var temp = validateInput(prompt('Get yourself a username: '), regulation);

            if (temp) {
                this.ref.child('players').once('value', function(check) {
                    while (check.hasChild(temp) || !temp) {
                        alert(temp + ' exists');
                        temp = validateInput(prompt('Taken. Try again'), regulation);
                    }

                    playerId = temp;
                });


                this.ref.child('players').child(playerId).set({
                    totalWins: 0,
                    online: true,
                    bio: ''
                });
                this.ref.child('playerUID').child(uid).set(playerId);

                console.log('Logged in as', playerId);
            }
        }

        // html element display
        $("." + GOOGLE_SIGNIN_ID).hide();
        $("." + FACEBOOK_SIGNIN_ID).hide();
        $("." + SIGNOUT_ID).show();
        $("." + PLAYER_PROFILE_ID).html("<i class=\"material-icons\">person</i> ");

        //console.log("Hello, ", playerId);
        //console.log("You signed in with ", email);
    } else { // logged out
        $("." + GOOGLE_SIGNIN_ID).show();
        $("." + FACEBOOK_SIGNIN_ID).show();
        $("." + SIGNOUT_ID).hide();
        $("." + PLAYER_PROFILE_ID).html("<i class=\"material-icons\">person</i> Login");

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
        console.log("ERROR: ", error);
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

var validateInput = function(s, regulation) {
    var invalid = true;
    var ret = s;

    if (ret) {
        while (invalid) {
            invalid = false;
            for (var i = 0; i < length; i++) {
                if (ret.includes(regulation[i])) {
                    ret = prompt('Don\'t add special characters besides _');
                    invalid = true;
                    break;
                }
            }
        }
    }

    return ret;
};
