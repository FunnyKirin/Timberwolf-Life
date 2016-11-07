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
    this.db = firebase.database();
    this.auth = firebase.auth();

    this.auth.onAuthStateChanged(this.sessionHandler.bind(this));
};

Session.prototype.create = function() {
    if (this.authorized) {
        var newKey = this.db.ref().child('session').push().key;
        var session = {};
        var sessionData = {
            'map': null,
            'challenger': null,
            'owner': this.auth.currentUser
        };

        session['/sessions/' + newKey] = sessionData;

        console.log('new session: ', newKey);

        return this.db.ref().update(session);

    } else {
        alert('unable to create a room');
    }
};

Session.prototype.leave = function() {

};

Session.prototype.join = function() {

};

Session.prototype.invite = function() {

};
