/* globals $ */

$(() => {
  const socket = io();
  $('form').submit(() => {
    if ($.trim($('#inputTxtBox').val()) === '') {
      // no alerts, check es lint and www for more on the subject
    } else {
      socket.emit('chat message', $('.input-msg-box').val());
    }
    $('.input-msg-box').val('');
    return false;
  });
  socket.on('chat message', (msg) => {
    const username = $('.profile-link span').text();
    const now = new Date();
    const time = now.getHours() + ':' + now.getMinutes();
    $('#chat-messages').append($('<li>' + '<b>' + '<i>' + time + '</i> | ' +
      username + ': </b>' + msg + '</li>'));
  });
});
