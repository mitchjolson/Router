console.log('Hello Playfair');

$(document).ready(onReady);

function onReady(){
    // ajax is asyncronous
    // $.ajax returns a Promise - 
    // the Promise is that when the server responds, we call the function in the 'then'
    getAllMovies();
    // we don't wait for the server to respond before moving on
    // to run this next line of code, we just do the requesting
    console.log('down here...')

    $('#add-movie').on('click', handleAddMovie);
}

function handleAddMovie(event){
    event.preventDefault();
    let name = $('#in-name').val();
    let movie = $('#in-movie').val()

    $.ajax({
        method: 'POST',
        url: '/movies',
        data: {
            name: name,
            movie: movie
        }
    })
    .then( function (response) {
        // POST (add movie) was good
        // Clear out input fields on form
        $('#in-name').val('');
        $('#in-movie').val('');
        // GET all my movies again, so the updated array appends to the page
        getAllMovies();
    })
    .catch( function (error) {
        console.log('Something bad happened...');
        alert('Something bad happened. Try again later.');
    })
}

// This will add all our movies to the DOM
function renderMovies(movieList){
    $('#movies').empty();
    for( let movie of movieList ){
        $('#movies').append(`
        <tr>
            <td>${movie.name}</td>
            <td>${movie.movie}</td>
        </tr>
        `);
    }
}

function getAllMovies(){
    $.ajax({
        method: 'GET',
        url: '/movies'
    })
    .then(function (response) {
        console.log('
        Got some movies!!!', response);
        renderMovies(response);
    })
     .catch(function (error) {
        console.log('Something bad happened...');
        alert('Something bad happened. Try again later.');
    })
}