const film = document.getElementById("films");
const podium = ["film1", "film2", "film3"];

async function loadPodiumMovies() {
    const movies = [
        { title: "F1 The Movie", id: "film1" },
        { title: "A Minecraft Movie", id: "film2" },
        { title: "Mr. Robot", id: "film3" }
    ];

    movies.forEach(async (movieData) => {
        const movie = await fetchMovies(movieData.title);
        const film = movie[0];
        const movieDiv = document.getElementById(movieData.id);
        const poster = document.createElement("img");
        poster.src = film.Poster !== "N/A" ? film.Poster : "placeholder.jpg";
        const title = document.createElement("p");
        title.textContent = film.Title;
        const link = document.createElement("a");
        link.href = "movie.html";
        link.textContent = "Plus d'infos";
        link.addEventListener("click", () => {
            localStorage.setItem("selectedMovieID", film.imdbID);
        });

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(link);
    });
}

async function loadMovies() {
    const movies = await fetchMovies("movie");
    if (movies.length === 0) {
        filmsContainer.innerHTML = "<p>Aucun film trouvé. Essayez un autre mot-clé.</p>";
    } else if (movies.length > 0) {
        movies.forEach(createMovieElement);
    }
    isFetching = false;
}

function createMovieElement(movie) {
    const movieDiv = document.createElement("div");
    movieDiv.className = "film";

    const poster = document.createElement("img");
    poster.src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg";
    poster.alt = movie.Title;

    const title = document.createElement("p");
    title.textContent = movie.Title;

    const link = document.createElement("a");
    link.href = "movie.html";
    link.textContent = "Plus d'infos";
    link.addEventListener("click", () => {
        localStorage.setItem("selectedMovieID", movie.imdbID);
    });
    movieDiv.appendChild(poster);
    movieDiv.appendChild(title);
    movieDiv.appendChild(link);
    film.appendChild(movieDiv);
}

document.getElementById("button").addEventListener("click", () => {
    loadMovies();
});

window.onload = () => {
    loadPodiumMovies();
    loadMovies();
};