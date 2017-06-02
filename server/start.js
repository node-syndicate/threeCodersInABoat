const http = require('http');
const fs = require('fs');
const events = require('events');


http.createServer((request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/plain' }); response.end('Hello World\n');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
