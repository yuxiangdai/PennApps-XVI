// Template for messages.

MESSAGE_TEMPLATE =
'<div class="message-container">' +
  '<div class="spacing">Test</div>' +
  '<div class="message"></div>' +
  '<div class="name"></div>' +
'</div>';

loadMessages = function() {
    this.eventsRef = firebase.database().ref('/events/');
    this.eventsRef.off();

    var setMessage = function(data) {
        var val = data.val();
        this.displayMessage(data.key, "JEFF", "TESTSTE");
      }.bind(this);
    this.eventsRef.limitToLast(12).on('child_added', setMessage);
    this.eventsRef.limitToLast(12).on('child_changed', setMessage);
  };

// Displays a Message in the UI.
displayMessage = function(key, name, text) {
    var div = document.getElementById(key);
    // If an element for that message does not exists yet we create it.
    if (!div) {
      var container = document.createElement('div');
      container.innerHTML = FriendlyChat.MESSAGE_TEMPLATE;
      div = container.firstChild;
      div.setAttribute('id', key);
      this.messageList.appendChild(div);
    }

    div.querySelector('.name').textContent = name;
    var messageElement = div.querySelector('.message');
    if (text) { // If the message is text.
      messageElement.textContent = text;
      // Replace all line breaks by <br>.
      messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
    } 
    // Show the card fading-in.
    setTimeout(function() {div.classList.add('visible')}, 1);
    this.messageList.scrollTop = this.messageList.scrollHeight;
    this.messageInput.focus();
  };