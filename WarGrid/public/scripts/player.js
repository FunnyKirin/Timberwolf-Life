var GOOGLE_SIGNIN_ID = "google-sign-in";
var FACEBOOK_SIGNIN_ID = "facebook-sign-in";
var SIGNOUT_ID = "sign-out";
var PROFILE_PIC_ID = "profile-pic";
var PLAYER_ID_ID = "player-id";
var PLAYER_PROFILE_ID = "player-profile";

var Player = function() {
    console.log('[INFO] Loading Player Module...');

    this.profilePic = document.getElementById(PROFILE_PIC_ID);
    this.playerId = document.getElementById(PLAYER_ID_ID);
    this.buttonSigninGoogle = document.getElementById(GOOGLE_SIGNIN_ID);
    this.buttonSigninFacebook = document.getElementById(FACEBOOK_SIGNIN_ID);
    this.buttonSignout = document.getElementById(SIGNOUT_ID);
    this.buttonProfile = document.getElementById(PLAYER_PROFILE_ID);

    this.buttonSigninGoogle.addEventListener('click', this.googleSignIn.bind(this));
    this.buttonSigninFacebook.addEventListener('click', this.facebookSignIn.bind(this));
    this.buttonSignout.addEventListener('click', this.signOut.bind(this));

    this.init();
};

Player.prototype.playerHandler = function(player) {
    if (player) { // logged in
        var profilePicUrl = player.photoURL;
        var playerId = player.displayName;
        var email = player.email;

        this.profilePic.style.backgroundImage = 'url(' + profilePicUrl + ')';
        this.playerId.textContent = playerId;

        // show player's profile and sign-out button.
        this.profilePic.removeAttribute('hidden');
        this.playerId.removeAttribute('hidden');
        this.buttonSignout.removeAttribute('hidden');
        this.buttonProfile.removeAttribute('hidden');

        // hide sign-in button.
        this.buttonSigninGoogle.setAttribute('hidden', 'true');
        this.buttonSigninFacebook.setAttribute('hidden', 'true');

        console.log("Hello, ", playerId);
        console.log("You signed in with ", email);

    } else { // logged out
        // hide player's profile and sign-out button.
        this.playerId.setAttribute('hidden', 'true');
        this.profilePic.setAttribute('hidden', 'true');
        this.buttonProfile.setAttribute('hidden', 'true');
        this.buttonSignout.setAttribute('hidden', 'true');

        // show sign-in button.
        this.buttonSigninGoogle.removeAttribute('hidden');
        this.buttonSigninFacebook.removeAttribute('hidden');

        console.log("Bye");
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
    this.auth = firebase.auth();
    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.playerHandler.bind(this));
};