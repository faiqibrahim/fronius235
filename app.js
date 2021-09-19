require('./db/pg');
require('./redis/Redis');

const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const routes = require('./express/routes/index');
const socketIO = require('./socket.io/index');

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

routes(app);
socketIO.setup(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.info(`Server up at port ${PORT}`);
});
