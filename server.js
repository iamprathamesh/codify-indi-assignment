const http = require('http');
const app = require('./app');
const constants = require('./app-properties');

const server = http.createServer(app);

server.listen(process.env.PORT || constants.ServerPort, () => {
    console.log(`Server started on port: ${process.env.PORT || constants.ServerPort}`);
});