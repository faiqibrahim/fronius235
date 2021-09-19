const SolarService = require('../services/SolarService');
let io = null;

const setup = (_io) => {
    io = _io;
    io.on('connection', (socket) => {
        console.info("Socket Client Connected");

        socket.emit('WELCOME', "Welcome to Froinus 235 A Stats.");

        emitCurrentOutput(socket);
    })
};

const emitCurrentOutput = (socket) => {
    SolarService.getCurrentOutput()
        .then(output => {
            socket.emit("CURRENT_OUTPUT", output);
        })
        .catch(console.error);
}

module.exports = {
    setup,
    broadcastCurrentOutput : () => emitCurrentOutput(io)
}

