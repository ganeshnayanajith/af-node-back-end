//import packages

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;

//create a server using imported http
const server = http.createServer(app);



server.listen(port,function(){
    console.log('server listening on port: '+port);
});