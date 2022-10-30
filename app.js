const fs = require('fs');  // filesystem used to store the user data generated or get from the user
const path = require('path')  // path package required to direct the file sys to the desired folder for storing the data
const express = require('express');


const app = express();  

app.use(express.urlencoded({extended: false})); // middle func to parse the userData in order to be used by the JS.

app.get('/currenttime', function(request, response) {  // also write short req and res 
    response.send('<h1>' + new Date().toISOString() +'</h1>');
    
} ); // localhost:3000/currenttime 

app.get('/', function(req, res){
    res.send('<form action="/store-user" method="POST"><label>Your Name: </label><input type="text" name="username"><button>Submit</button></form>')
})// localhost:3000/     // method= post coz we want to store the data 

app.post('/store-user', function(req, res ){  // post request will be stored where the /store-user will be the path
    const userName = req.body.username;
    
    const filePath = path.join(__dirname, 'data' , 'users.json'); // path of the file where requested data will be stored.

    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    existingUsers.push(userName);

    fs.writeFileSync(filePath, JSON.stringify(existingUsers));

    res.send('<h1>Username Stored Successfully!</h1>')
});

app.get('/users' , function(req , res){
    const filePath = path.join(__dirname, 'data' , 'users.json'); // path of the file where requested data will be stored.

    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    let responseData = '<ul>';

    for (const user of existingUsers) {
        responseData += '<li>' + user  +'</li>';
    }

    responseData += '</ul>';

    res.send(responseData);
});


app.listen(3000);

// function handleRequest(request, response) {
//     if (request.url === '/currenttime') {
//         response.statusCode = 200;
//         response.end('<h1>' + new Date().toISOString() +'</h1>');
//     } else if (request.url === '/') {
//         response.statusCode = 200;
//         response.end('<h1>Hello World!</h1>');
// }
//     }
    // localhost:3000/currenttime  will show current time stamp also in webpage
    // localhost:3000   will show the response we fix, here.. hello world
     // For success Request parsed response will be send without hassle.
    // For 404: Client side error, request/url not found
    // for 401: client side error, client not authorized to access the request
    // 500 : server side error, something went wrong on server
    // there are more status code of Website response.
    

//const server = http.createServer(handleRequest);

// server.listen(3000); // port no. used for local servers

// Typically ports are by-default closed for security reasons. When we call we  request for the port entrypoint i.e, port no.
// Package.json file is used for installing 3rd party packaging. like ExpressJS this file also called configuration file for the project. json is file format like txt but store object like value pairs.