// const { createServer } = require('node:http');
//
// const hostname = '127.0.0.1';
// const port = 5000;
//
// const server = createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello Octen');
// });
//
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

const {createServer} = require('node:http');

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        data: 'Hello Octen!',
    }));
});

server.listen(8000, () => {
    console.log('Server is listening on port 8000');
});