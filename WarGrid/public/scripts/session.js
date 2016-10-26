var BUTTON_LOGIN_ID = "#login-button";
var BUTTON_LOGOUT_ID = "#logout-button";
var FIELD_LOGIN_ID = "#login";
var FIELD_LOGOUT_ID = "#login";

var Session = function() {
    var login;
    var loginButton;
    var anonymous = true;

    function sessionHandler(user) {
        if (user) { // login
            console.log("Hello, " + user);
            anonymous = false;
            closeLogin();
            document.querySelector(BUTTON_LOGIN_ID).style.display = "none";
            document.querySelector(BUTTON_LOGOUT_ID).style.display = "block";

        } else { // logout
            if (!anonymous) {
                anonymous = true;
                window.location.reload();
            }
        }
    }

    function authGoogle() {
        console.log("Google authentication");

        var google = new firebase.auth.GoogleAuthProvider();
        google.addScope("https://www.googleapis.com/auth/userinfo.email");
        google.addScope("https://www.googleapis.com/auth/userinfo.profile");

        firebase.auth().signInWithPopup(google).catch(function(error) {
            console.log("ERROR: " + error);
        });
    }

    function closeLogin() {
        var loginScreen = document.querySelector(BUTTON_LOGIN_ID);
        if (loginScreen.open) {
            loginScreen.close();
        }
    }

    // return function
    return {
        init: function() {
            loginScreen = document.querySelector(BUTTON_LOGIN_ID);

            // add handler to login and logout
            firebase.auth().onAuthStateChanged(sessionHandler);

            // for now we only do Google Sign-In
            document.querySelector(FIELD_LOGIN_ID).addEventListener("click", authGoogle);
            document.querySelector(FIELD_LOGOUT_ID).addEventListener("click", function() {
                firebase.auth().signOut().then(function() {
                    console.log('Bye');
                }, function(error) {
                    console.error('ERROR: ' + error);
                });
            });
        }
    };
};
