const io = require('socket.io');

const attachTo = (server) => {
    io.listen(server);
};

module.exports = {
    attachTo,
};
