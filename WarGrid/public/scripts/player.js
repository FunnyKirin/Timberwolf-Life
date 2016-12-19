// Constants for sign-ins

// These are for the login button
var GOOGLE_SIGNIN_ID = "google-sign-in";
var FACEBOOK_SIGNIN_ID = "facebook-sign-in";
var SIGNOUT_ID = "sign-out";
var PROFILE_PIC_ID = "profile-pic";
var PLAYER_ID_ID = "player-id";
var PLAYER_PROFILE_ID = "player-profile-desktop";
var PLAYER_PROFILE_ID_2 = "player-profile-mobile";

// These are for Profile Page
var CLASS_PLAYER_ID = 'pid';
var CLASS_PLAYER_WINS = 'win';
var CLASS_PLAYER_LOSSES = 'loss';
var CLASS_PLAYER_GAME = 'in-room';


//TODO: localize these variable
var playerId = ''; // online user ID
var totalWins = -1; // use -1 as uninitialized...for now
var totalLosses = -1; // use -1 as uninitialized...for now

// Player class (object)
var Player = function() {
    console.log('[INFO] Loading Player Module...');
    this.playerId = '';
    this.profilePic = document.getElementById(PROFILE_PIC_ID);
    this.playerId = document.getElementById(PLAYER_ID_ID);
    this.buttonSigninGoogle = document.getElementById(GOOGLE_SIGNIN_ID);
    this.buttonSigninFacebook = document.getElementById(FACEBOOK_SIGNIN_ID);
    this.buttonSignout = document.getElementById(SIGNOUT_ID);
    this.buttonProfile = document.getElementById(PLAYER_PROFILE_ID);

    this.init();
};

// handles player status and changes variable when user signed in or signed out
Player.prototype.playerHandler = function(player) {
    if (player) { // logged in
        var uid = player.uid;
        // check if user is already registered
        this.ref.child('playerUID').child(uid).once('value', function(snapshot) {
            if (snapshot.val()) { // already registered
                playerId = snapshot.val();
                console.log('Logged in as', playerId);

                // get player data for display
                firebase.database().ref('players/' + playerId).once('value', function(obj) {
                    $("." + CLASS_PLAYER_ID).text('Player ID: ' + playerId);
                    $("." + CLASS_PLAYER_WINS).text('Total Wins: ' + obj.val().totalWins);
                    $("." + CLASS_PLAYER_LOSSES).text('Total Losses: ' + obj.val().totalLosses);
                    //$("." + CLASS_PLAYER_GAME).html('In Game: ' + gameRoom);
                });

                // html element display
                $("." + GOOGLE_SIGNIN_ID).hide();
                $("." + FACEBOOK_SIGNIN_ID).hide();
                $("." + SIGNOUT_ID).show();
                $("." + PLAYER_PROFILE_ID).html("<i class=\"material-icons\">person</i> " + playerId);

            } else { // user registration
                var rootRef = firebase.database().ref();
                playerId = validateInput(prompt('Get yourself a username'));

                // check if playerId is empty
                while (!playerId) {
                    playerId = validateInput(prompt('Get yourself a username'));
                }

                playerId = playerId.toLowerCase();
                rootRef.child('players').once('value', function(check) {
                    // regulation in database
                    while (check.hasChild(playerId)) {
                        alert(playerId + ' exists');
                        playerId = validateInput(prompt('Taken. Try again'));
                    }

                    // html element display
                    $("." + GOOGLE_SIGNIN_ID).hide();
                    $("." + FACEBOOK_SIGNIN_ID).hide();
                    $("." + SIGNOUT_ID).show();
                    $("." + PLAYER_PROFILE_ID).html("<i class=\"material-icons\">person</i> " + playerId);

                    // database operations
                    rootRef.child('playerUID').child(uid).set(playerId);
                    rootRef.child('players').child(playerId).set({
                        totalWins: 0,
                        totalLosses: 0,
                        online: true,
                        game_room: '',
                        campaign: 1
                    });

                    // for profile page
                    $("." + CLASS_PLAYER_ID).text('Player ID: ' + playerId);
                    $("." + CLASS_PLAYER_WINS).text('Total Wins: 0');
                    $("." + CLASS_PLAYER_LOSSES).text('Total Losses: 0');
                    //$("." + CLASS_PLAYER_GAME).html('In Game: No');

                    // 'initialize' global variables
                    totalWins = 0;
                    totalLosses = 0;

                });

                console.log('Logged in as', playerId);
            } // if user's not registered
        });
    } else { // logged out
        playerId = '';

        $("." + GOOGLE_SIGNIN_ID).show();
        $("." + FACEBOOK_SIGNIN_ID).show();
        $("." + SIGNOUT_ID).hide();
        $("." + PLAYER_PROFILE_ID).html("<i class=\"material-icons\">person</i> Login");
    }
};

// Google Sign-In
Player.prototype.googleSignIn = function() {
    console.log("Google authentication");
    var google = new firebase.auth.GoogleAuthProvider();
    google.addScope("https://www.googleapis.com/auth/userinfo.email");
    google.addScope("https://www.googleapis.com/auth/userinfo.profile");
    this.auth.signInWithPopup(google).catch(function(error) {
        console.log("ERROR: ", error);
    });
};

//TODO: Facebook Sign-In
Player.prototype.facebookSignIn = function() {
    console.log("Facebook authentication");
    var facebook = new firebase.auth.FacebookAuthProvider();
    this.auth.signInWithPopup(facebook).catch(function(error) {
        console.log("ERROR: ", error);
    });
};

// Sign-Out
Player.prototype.signOut = function() {
    playerId = '';
    this.auth.signOut();
};

// Initialize
Player.prototype.init = function() {
    // Shortcuts to Firebase SDK features.
    this.ref = firebase.database().ref();
    this.auth = firebase.auth();

    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.playerHandler.bind(this));
};

// validate username
var validateInput = function(s) {
    var regulation = ['+', '-', '@', '.', ',', '=', '*', '&', ' '];
    var invalid = true;
    var ret = s;
    if (ret) {
        while (invalid) {
            invalid = false;
            for (var i = 0; i < length; i++) {
                if (ret.includes(regulation[i])) {
                    ret = prompt('Don\'t add special characters besides _');
                    invalid = true;
                } else if (ret.length <= 3) {
                    ret = prompt('Too short');
                    invalid = true;
                } else if (ret.length >= 32) {
                    ret = prompt('Too long');
                    invalid = true;
                }
                if (invalid) {
                    break;
                }
            }
        }
    }
    return ret;
};
