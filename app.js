// controlling the app through the terminal
// exit terminates the process

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	const input = process.stdin.read();
	if (input !== null) {
		process.stdout.write(input);
		const command = input.trim();
		if (command === 'exit') {
			process.exit(0);
		}
	}
});

const http = require('http');
const fs = require('fs');
const events = require('events');


http.createServer((request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/plain' }); response.end('Hello World\n');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
