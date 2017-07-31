/* globals $  io*/

$(() => {
  const socket = io();
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  const escapeHtml = (string) => {
    return String(string).replace(/[&<>"'`=\/]/g, (s) => {
      return entityMap[s];
    });
  };

  $('form').submit(() => {
    if ($.trim($('#inputTxtBox').val()) === '') {
      // no alerts, check es lint and www for more on the subject
    } else {
      const username = $('.profile-link span').text();
      const message = $('.input-msg-box').val();
      const chatMsg = `${username}: ${message}`;

        socket.emit('chat message', escapeHtml(chatMsg));
    }
    $('.input-msg-box').val('');
    return false;
  });
  socket.on('chat message', (msg) => {
    const now = new Date();
    const time = now.getHours() + ':' + now.getMinutes();
    $('#chat-messages').append($(`<li><b><i>${time}</i>|</b>${msg}</li>`));
  });
});
