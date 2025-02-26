// comment récupérer l'id du film qui se trouve dans le path (query)
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idMovie = urlParams.get('id');

fetch('http://127.0.0.1:8000/movie/' + idMovie)
        .then(function (response) {
            return response.json();
        })
            .then(movie=> { 
                displayMovieDetail(movie);
            })
            .catch(function (err) {
                console.log("Something went wrong!", err);
                });

function displayMovieDetail(movie){
    let elements = document.getElementById("editMovieForm").elements;
    for (let i = 0, element; element = elements[i++];) {
        if (element.type === "text")
            element.value = movie[element.name];
    }
}

const editMovieForm = document.getElementById("editMovieForm");
editMovieForm.addEventListener("submit", clickUpdateButton);

async function clickUpdateButton(event) {
    event.preventDefault();
    // fetch PUT /movies/lkssf354s4fd34sf5s
    let url = "http://127.0.0.1:8000/movies/" + idMovie;
    const form = event.currentTarget;
        try {
                const formData = new FormData(form);
                const responseData = await putFormDataAsJson({ url, formData });
                window.location = "http://127.0.0.1:8000";
        } 
        catch (error) {
            console.error(error);
        };
}

async function putFormDataAsJson({ url, formData }) {
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);
        const fetchOptions = {
            method: "PUT",
            headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json"
                    },
            body : formDataJsonString
            };
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
            }       
        return response;
}
