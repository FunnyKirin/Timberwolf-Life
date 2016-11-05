var SIGNIN_ID = "sign-in";
var SIGNOUT_ID = "sign-out";
var PROFILE_PIC_ID = "profile-pic";
var PLAYER_ID_ID = "player-id";
var PLAYER_PROFILE_ID = "player-profile";

function Session() {
    this.profilePic = document.getElementById(PROFILE_PIC_ID);
    this.playerId = document.getElementById(PLAYER_ID_ID);
    this.buttonSignin = document.getElementById(SIGNIN_ID);
    this.buttonSignout = document.getElementById(SIGNOUT_ID);
    this.buttonProfile = document.getElementById(PLAYER_PROFILE_ID);

    this.buttonSignin.addEventListener('click', this.googleSignIn.bind(this));
    this.buttonSignout.addEventListener('click', this.googleSignOut.bind(this));

    this.initFirebase();
}

Session.prototype.sessionHandler = function(player) {
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
        this.buttonSignin.setAttribute('hidden', 'true');

        console.log("Hello, " + playerId);
        console.log("You signed in with " + email);
    } else { // logged out
        // hide player's profile and sign-out button.
        this.playerId.setAttribute('hidden', 'true');
        this.profilePic.setAttribute('hidden', 'true');
        this.buttonProfile.setAttribute('hidden', 'true');
        this.buttonSignout.setAttribute('hidden', 'true');

        // show sign-in button.
        this.buttonSignin.removeAttribute('hidden');

        console.log("Bye");
    }
};

Session.prototype.googleSignIn = function() {
    console.log("Google authentication");

    var google = new firebase.auth.GoogleAuthProvider();
    google.addScope("https://www.googleapis.com/auth/userinfo.email");
    google.addScope("https://www.googleapis.com/auth/userinfo.profile");

    this.auth.signInWithPopup(google).catch(function(error) {
        console.log("ERROR: " + error);
    });
};

Session.prototype.googleSignOut = function() {
    this.auth.signOut();
};

Session.prototype.initFirebase = function() {
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.sessionHandler.bind(this));
};

window.onload = function() {
    window.session = new Session();
};
