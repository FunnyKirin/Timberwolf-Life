// In-Game Chat
var ID_MESSAGE_CONTENT = 'message';
var ID_MESSAGE_FORM = 'message-form';
var ID_MESSAGE_SUBMIT = 'submit';
var ID_MESSAGES = 'messages';

// Template for messages.
var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
    '<div class="chat-spacing"></div>' +
    '<div class="chat-message"></div>' +
    '</div>';

var Chat = function() {
    console.log('[INFO] Loading Chat module');

    this.messageList = document.getElementById(ID_MESSAGES);

    this.messageContent = $('#' + ID_MESSAGE_CONTENT);
    this.messageSubmit = $('#' + ID_MESSAGE_SUBMIT);
    this.messageForm = $('#' + ID_MESSAGE_FORM);

    // room_key
    this.room_key = window.location.search.substring(1);

    // on form submit save message to database
    this.messageForm.on('submit', this.saveMessage.bind(this));

    // Toggle for the button.
    this.messageContent.on('keyup', this.toggleButton.bind(this));
    this.messageContent.on('change', this.toggleButton.bind(this));

    this.init();
};

// display message on the textfield
Chat.prototype.displayMessage = function(key, name, text) {
    var div = document.getElementById(key);

    // If an element for that message does not exists yet we create it.
    if (!div) {
        var container = document.createElement('div');
        container.innerHTML = MESSAGE_TEMPLATE;
        div = container.firstChild;
        div.setAttribute('id', key);
        this.messageList.appendChild(div);
    }

    var messageElement = div.querySelector('.chat-message');
    if (text) { // If the message is text.
        messageElement.textContent = name + ": " + text;
        // Replace all line breaks by <br>.
        messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
    }
    // Show the card fading-in.
    this.messageList.scrollTop = this.messageList.scrollHeight;
    this.messageContent.focus();
};

// Loads chat messages and listens for upcoming ones.
Chat.prototype.loadMessages = function() {
    // Make sure we remove all previous listeners.
    this.chatRef.off();

    // Loads the last 12 messages and listen for new ones.
    var setMessage = function(snapshot) {
        var val = snapshot.val();
        console.log(snapshot.key + ' ' + val.pid + ' ' + val.text);
        this.displayMessage(snapshot.key, val.pid, val.text);
    }.bind(this);

    this.chatRef.child(this.room_key).limitToLast(12).on('child_added', setMessage);
    this.chatRef.child(this.room_key).limitToLast(12).on('child_changed', setMessage);
};

Chat.prototype.saveMessage = function(e) {
    e.preventDefault();

    // Check that the user entered a message and is signed in.
    if (this.messageContent.val() && this.auth.currentUser) {
        // Add a new message entry to the Firebase Database.
        var chatKey = this.chatRef.child(this.room_key).push().key;
        var update = {};
        update[this.room_key + '/' + chatKey] = {
            text: this.messageContent.val(),
            pid: playerId
        };

        this.chatRef.update(update).then(function() {
            // Clear message text field and SEND button state.
            this.messageContent.val('');
            this.toggleButton();
        }.bind(this)).catch(function(error) {
            // error problems
            console.error('Error writing new message to Firebase Database', error);
        });

    }
};

Chat.prototype.init = function() {
    this.chatRef = firebase.database().ref('chat');
    this.auth = firebase.auth();

    this.auth.onAuthStateChanged(this.chatHandler.bind(this));
};

// handles those who signed in and those who didn't
Chat.prototype.chatHandler = function(player) {
    if (player) { // player signed in
        this.messageContent.removeAttr('disabled');
        this.loadMessages();
    } else { // player signed out
        this.messageContent.attr('disabled', 'true');
    }
};

// enables or disables button
Chat.prototype.toggleButton = function() {
    if (this.messageContent.val()) {
        this.messageSubmit.removeAttr("disabled");
    } else {
        this.messageSubmit.attr('disabled', 'true');
    }
};
