const express = require('express');

// This makes a Router object for us to use
const router = express.Router();

// Move routes ( GET/POST ) from server.js into here
// Set up route to return movies
const movieData = require(`./modules/movies.module`);
router.get('/', (req, res) => {
    res.send(movieData);
    // res.sendStatus(500);
})
router.post('/', (req, res) => {
    // Get the movie from the request
    let newMovie = req.body; //requires body-parser
    console.log('We are adding the movie', newMovie);
    // Add it onto the array of movies
    movieData.push(newMovie);
    // A good server always responds, 200 = OK, 201 = created
    res.sendStatus(201);
})

module.exports = router;