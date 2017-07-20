const attachTo = (server) => {
    const io = require('socket.io').listen(server);
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });

        socket.io('disconnect', () => {
            console.log('a user disconnected');
        });
    });
};

module.exports = {
    attachTo,
};
