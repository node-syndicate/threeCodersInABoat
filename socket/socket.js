const attachTo = (server) => {
    const io = require('socket.io').listen(server);
    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
        });
    });
};

module.exports = {
    attachTo,
};
