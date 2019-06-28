const express = require('express');

// Set up the app
const app = express();

// Set up static files
app.use( express.static( 'server/public' ) );

// When we do a POST and want to get data from a request, we need help.
// We need body-parser  (it gets installed in node_modules by express, or you can npm install it)
let bodyParser = require('body-parser');
app.use( bodyParser.urlencoded( {extended: true} ));

// Configure Routers
const movieRouter = require('./routers/movie.router');
app.use('/movies', movieRouter);

// Start the server listening. Do this last, after setting up routes and stuff.
const PORT = 5000;
app.listen( PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});