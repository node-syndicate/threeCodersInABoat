$(() => {
      const socket = io();
      $('form').submit(function () {
        if ($.trim( $("#inputTxtBox").val()) === "") {
          alert('you did not fill the input field!');
        }
        else {
          socket.emit('chat message', $('.input-msg-box').val());
        }
        $('.input-msg-box').val('');
        return false;
      });
      socket.on('chat message', (msg) => {
        const username = $('.profile-link span').text();
        const now = new Date();
        const time = now.getHours() + ':' + now.getMinutes();
        $('#chat-messages').append( $('<li>' + '<b>' + '<i>' + time + '</i> | ' +
           username + ': </b>' + msg + '</li>') );
      });
});