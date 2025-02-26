const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);

app.listen(8000, function() {
    console.log('Server is running and listening on port 8000');
   });

app.use('/', express.static(__dirname+"/htdocs"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// traitement de la route GET /movies (R de Read dans CRUD)
// pour le test : GET http://localhost:8000/movies
app.get('/movies', function(request, response) {
    findAllMovies().then(function(movies){
        response.setHeader('Content-Type', 'application/json');
        response.send(movies);
    });
});

// traitement de la route GET /movie/id  (R de Read dans CRUD)
// pour le test : GET http://localhost:8000/movie/66e045c78482ccc436c7316e
app.get('/movie/:id', function(request, response) {
    findMovieFromId(request.params.id).then(function(movie){
        response.setHeader('Content-Type', 'application/json');
        response.send(movie);
    });
});

// traitement de la route DELETE /movie/id (D de Delete dans CRUD)
// pour le test : DELETE http://localhost:8000/movie/66e045c78482ccc436c7316e
app.delete('/movie/:id', function(request, response) {
    deleteMovieFromId(request.params.id).then(function(){
        response.setHeader('Content-Type', 'application/json');
        response.send("Object deleted");
    });
});

app.post('/movies', function(request, response) {
    createMovie(request.body).then(function(){
        response.redirect('/');
    });
});

app.put('/movies/:id', function(request, response) {
    updateMovie(request.params.id, request.body).then(function(){
        response.setHeader('Content-Type', 'application/json');
        response.send("Object created");
    });
});

async function updateMovie(id, updatedMovie){
    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("imdb");
        const movieCollection = imdbDatabase.collection("movies");
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedDocument = { $set: updatedMovie };
        const result = await movieCollection.updateOne(filter, updatedDocument, options);
        console.log(result);
    }
    catch (error) { console.error(error); }
}

async function findMovieFromId(movieId) {
    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("imdb");
        const movieCollection = imdbDatabase.collection("movies");
        const options = {
            projection: { },  // projection : on garde tout
            };
        const query = {_id : new ObjectId(movieId)};    // requête de sélection
        const movie = await movieCollection.find(query, options).toArray();
        return movie[0];
    }
    catch (error) { console.error(error); }
   }


async function createMovie(body){
    let newMovie = {
        Poster_Link: body.Poster_Link,
        Series_Title: body.Series_Title,
        Released_Year: parseInt(body.Released_Year),
        Certificate: body.Certificate,
        Runtime: body.Runtime,
        Genre: body.Genre,
        IMDB_Rating: parseFloat(body.IMDB_Rating),
        Overview: body.Overview,
        Meta_score: parseInt(body.Meta_score),
        Director: body.Director,
        Star1: body.Star1,
        Star2: body.Star2,
        Star3: body.Star3,
        Star4: body.Star4,
        No_of_Votes: parseInt(body.No_of_Votes),
        Gross: body.Gross
       };
    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("imdb");
        const movieCollection = imdbDatabase.collection("movies");
        const result = await movieCollection.insertOne(newMovie);
    }
    catch (error) { console.error(error); }
}

async function findMovieFromId(movieId) {
    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("imdb");
        const movieCollection = imdbDatabase.collection("movies");
        const options = {
            projection: { },  // projection : on garde tout
            };
        const query = {_id : new ObjectId(movieId)};    // requête de sélection
        const movie = await movieCollection.find(query, options).toArray();
        return movie[0];
    }
    catch (error) { console.error(error); }
   }


async function findAllMovies() {
    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("imdb");
        const movieCollection = imdbDatabase.collection("movies");
        const movies = await movieCollection.find().toArray();
        return movies;
    }
    catch (error) { console.error(error); }
   }

async function deleteMovieFromId(movieId) {
    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("imdb");
        const movieCollection = imdbDatabase.collection("movies");
        const query = {_id : new ObjectId(movieId)};    // requête de sélection
        const response = await movieCollection.deleteOne(query);
    }
    catch (error) { console.error(error); }
   }

  // \\WEB-PCPROF\Users\rudi.giot\Desktop\NodeJS\WEB2024
  // file://web-pcprof/Users/rudi.giot/Desktop/NodeJS/WEB2024/



// const express = require('express');
// const app = express();
// const MongoClient = require('mongodb').MongoClient;
// const { ObjectId } = require('mongodb');

// const url = 'mongodb://127.0.0.1:27017/';
// const mongoClient = new MongoClient(url);

// app.listen(8000, function() {
//     console.log('Server is running and listening on port 8000');
// });

// app.use('/', express.static(__dirname + "/htdocs"));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // traitement de la route GET /manga (R de Read dans CRUD)
// // pour le test : GET http://localhost:8000/manga
// app.get('/manga', function(request, response) {
//     findAllManga().then(function(manga) {
//         response.setHeader('Content-Type', 'application/json');
//         response.send(manga);
//     });
// });

// // traitement de la route GET /manga/id  (R de Read dans CRUD)
// // pour le test : GET http://localhost:8000/manga/66e045c78482ccc436c7316e
// app.get('/manga/:id', function(request, response) {
//     findMangaFromId(request.params.id).then(function(manga) {
//         response.setHeader('Content-Type', 'application/json');
//         response.send(manga);
//     });
// });

// // traitement de la route DELETE /manga/id (D de Delete dans CRUD)
// // pour le test : DELETE http://localhost:8000/manga/66e045c78482ccc436c7316e
// app.delete('/manga/:id', function(request, response) {
//     deleteMangaFromId(request.params.id).then(function() {
//         response.setHeader('Content-Type', 'application/json');
//         response.send("Object deleted");
//     });
// });

// app.post('/manga', function(request, response) {
//     createManga(request.body).then(function() {
//         response.redirect('/');
//     });
// });

// app.put('/manga/:id', function(request, response) {
//     updateManga(request.params.id, request.body).then(function() {
//         response.setHeader('Content-Type', 'application/json');
//         response.send("Object updated");
//     });
// });

// async function updateManga(id, updatedManga) {
//     try {
//         await mongoClient.connect();
//         const imdbDatabase = mongoClient.db("imdb");
//         const mangaCollection = imdbDatabase.collection("manga");
//         const filter = { _id: new ObjectId(id) };
//         const options = { upsert: true };
//         const updatedDocument = { $set: updatedManga };
//         const result = await mangaCollection.updateOne(filter, updatedDocument, options);
//         console.log(result);
//     } catch (error) { console.error(error); }
// }

// async function findMangaFromId(mangaId) {
//     try {
//         await mongoClient.connect();
//         const imdbDatabase = mongoClient.db("imdb");
//         const mangaCollection = imdbDatabase.collection("manga");
//         const options = { projection: {} };  // projection : on garde tout
//         const query = { _id: new ObjectId(mangaId) }; // requête de sélection
//         const manga = await mangaCollection.find(query, options).toArray();
//         return manga[0];
//     } catch (error) { console.error(error); }
// }

// async function createManga(body) {
//     let newManga = {
//         Poster_Link: body.Poster_Link,
//         Series_Title: body.Series_Title,
//         Released_Year: parseInt(body.Released_Year),
//         Certificate: body.Certificate,
//         Runtime: body.Runtime,
//         Genre: body.Genre,
//         IMDB_Rating: parseFloat(body.IMDB_Rating),
//         Overview: body.Overview,
//         Meta_score: parseInt(body.Meta_score),
//         Director: body.Director,
//         Star1: body.Star1,
//         Star2: body.Star2,
//         Star3: body.Star3,
//         Star4: body.Star4,
//         No_of_Votes: parseInt(body.No_of_Votes),
//         Gross: body.Gross
//     };
//     try {
//         await mongoClient.connect();
//         const imdbDatabase = mongoClient.db("imdb");
//         const mangaCollection = imdbDatabase.collection("manga");
//         const result = await mangaCollection.insertOne(newManga);
//     } catch (error) { console.error(error); }
// }

// async function findAllManga() {
//     try {
//         await mongoClient.connect();
//         const imdbDatabase = mongoClient.db("imdb");
//         const mangaCollection = imdbDatabase.collection("manga");
//         const manga = await mangaCollection.find().toArray();
//         return manga;
//     } catch (error) { console.error(error); }
// }

// async function deleteMangaFromId(mangaId) {
//     try {
//         await mongoClient.connect();
//         const imdbDatabase = mongoClient.db("imdb");
//         const mangaCollection = imdbDatabase.collection("manga");
//         const query = { _id: new ObjectId(mangaId) }; // requête de sélection
//         const response = await mangaCollection.deleteOne(query);
//     } catch (error) { console.error(error); }
// }
