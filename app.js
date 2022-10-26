const http = require('http');

function handleRequest(request, response) {
    if (request.url === '/currenttime') {
        response.statusCode = 200;
        response.end('<h1>' + new Date().toISOString() +'</h1>');
    } else if (request.url === '/') {
        response.statusCode = 200;
        response.end('<h1>Hello World!</h1>');
}
    }
    // localhost:3000/currenttime  will show current time stamp also in webpage
    // localhost:3000   will show the response we fix, here.. hello world
     // For success Request parsed response will be send without hassle.
    // For 404: Client side error, request/url not found
    // for 401: client side error, client not authorized to access the request
    // 500 : server side error, something went wrong on server
    // there are more status code of Website response.
    

const server = http.createServer(handleRequest);

server.listen(3000); // port no. used for local servers

// Typically ports are by-default closed for security reasons. When we call we  request for the port entrypoint i.e, port no.
