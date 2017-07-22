$(function() {
      var socket = io();
      $('form').submit(function () {
        if ($.trim( $("#inputTxtBox").val()) === "") {
          alert('you did not fill the input field, bitch!');
        }
        else {
          socket.emit('chat message', $('.input-msg-box').val());
        }
        $('.input-msg-box').val('');
        return false;
      });
      socket.on('chat message', function(msg) {
        var username = $('.profile-link span').text();
        var now = new Date();
        var time = now.getHours() + ':' + now.getMinutes();
        $('#chat-messages').append( $('<li>' + '<b>' + '<i>' + time + '</i> | ' +
           username + ': </b>' + msg + '</li>') );
      });
});