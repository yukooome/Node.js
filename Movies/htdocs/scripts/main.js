// ouvrir dans web http://127.0.0.1:8000/


// afficher la liste des films suite à une requête vers le service /movies
fetch('http://127.0.0.1:8000/movies')
    .then(function (response) {
        return response.json();
    })
        .then(movies => { 
            displayMoviesList(movies);
            const movieCreate = document.getElementById("movieCreate");
            movieCreate.addEventListener("click", function() {
                window.location.replace("./createMovie.html");
                });
        })
    .catch(function (err) {
        console.log("Something went wrong!", err);
    });

function displayMoviesList(movies){
    const ul = document.createElement("ul");
    movies.forEach(movie => {
        const li = document.createElement("li");
        li.addEventListener("click", function() {
            fetch('http://127.0.0.1:8000/movie/' + movie._id)
                .then(function (response) {
                    return response.json();
                })
                    .then(movie=> { displayMovieDetail(movie); })
                    .catch(function (err) {
                        console.log("Something went wrong!", err);
                        });
                });
        li.innerText =  movie.Series_Title;
        ul.appendChild(li);
    });
    const movieListElement = document.getElementById("moviesList");
    movieListElement.appendChild(ul);
}

function displayMovieDetail(movie){
        const movieTitle = document.getElementById("movieTitle");
        movieTitle.innerText = movie.Series_Title;
        const movieImg = document.getElementById("movieImage");
        movieImg.src = movie.Poster_Link;
        const movieDateDirector = document.getElementById("dateDirector");
        movieDateDirector.innerText = movie.Released_Year + ", " + movie.Director;
        const movieDuration = document.getElementById("movieDuration");
        movieDuration.innerText = movie.Runtime;
        const movieType = document.getElementById("movieType");
        movieType.innerText = movie.Genre;
        const movieDescription = document.getElementById("movieDescription");
        movieDescription.innerText = movie.Overview;
        const movieDelete = document.getElementById("movieDelete");
        movieDelete.addEventListener("click", function() {
            fetch('http://127.0.0.1:8000/movie/' + movie._id,  { method: 'DELETE' })
                .then(function (response) {
                    location.reload();
                })
                .catch(function (err) {
                        console.log("Something went wrong!", err);
                });
            });
        const movieEdit = document.getElementById("movieEdit");
        movieEdit.addEventListener("click", 
            function() {
                window.location = "./editMovie.html?id=" + movie._id;
            });
}