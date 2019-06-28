const express = require('express');

// Set up the app
const app = express();

// Set up static files
app.use( express.static( 'server/public' ) );

// When we do a POST and want to get data from a request, we need help.
// We need body-parser  (it gets installed in node_modules by express, or you can npm install it)
let bodyParser = require('body-parser');
app.use( bodyParser.urlencoded( {extended: true} ));

// Set up route to return movies
const movieData = require(`./modules/movies.module`);
app.get( '/movies', (req, res) => {
    res.send(movieData);
   // res.sendStatus(500);
})
app.post( '/movies', (req, res) => {
    // Get the movie from the request
    let newMovie = req.body; //requires body-parser
    console.log('We are adding the movie', newMovie);
    // Add it onto the array of movies
    movieData.push(newMovie);
    // A good server always responds, 200 = OK, 201 = created
    res.sendStatus(201); 
})

// Start the server listening. Do this last, after setting up routes and stuff.
const PORT = 5000;
app.listen( PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});