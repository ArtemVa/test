require('dotenv').config();
const server = require('./server');

console.log(String(process.env.MONGODB_URI))
server.startServer();

