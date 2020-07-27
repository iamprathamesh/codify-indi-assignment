const http = require('http');
const app = require('./app');
const appProp = require('./app-properties');

const server = http.createServer(app);

server.listen(process.env.PORT || appProp.ServerPort, () => {
    console.log(`Server started on port: ${process.env.PORT || appProp.ServerPort}`);
});