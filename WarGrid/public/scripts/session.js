var BUTTON_CREATE_ID = 'create';

var Session = function() {
    console.log('[INFO] Loading Session Module...');

    this.authorized = false;
    this.buttonCreate = document.getElementById(BUTTON_CREATE_ID);

    this.buttonCreate.addEventListener('click', this.create.bind(this));

    this.init();
};

Session.prototype.sessionHandler = function(player) {
    this.authorized = player ? true : false;
};

Session.prototype.init = function() {
    this.dbRef = firebase.database().ref();
    this.auth = firebase.auth();

    this.dbRef.on('value', function(snapshot) {

    });
    this.auth.onAuthStateChanged(this.sessionHandler.bind(this));
};

Session.prototype.create = function() {
    var newKey = this.dbRef.push().key;
    var session = {};
    var sessionData = {
        'map': null,
        'challenger': null,
        'owner': this.auth.currentUser
    };

    session['/session/' + newKey] = sessionData;

    console.log('new session: ', newKey);

    return this.dbRef.update(session);
};

Session.prototype.leave = function() {

};

Session.prototype.join = function() {

};

Session.prototype.invite = function() {

};
