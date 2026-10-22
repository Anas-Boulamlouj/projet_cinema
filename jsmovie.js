const movieContainer = document.getElementById("movie-container");

async function loadMovie() {
    const movie = await fetchMoviesDetails();

    if (movie) {
        movieContainer.innerHTML = '';
        const poster = document.createElement("img");
        poster.src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg";
        poster.alt = movie.Title;
        const title = document.createElement("h1");
        title.textContent = movie.Title;
        const year = document.createElement("p");
        year.textContent = `Année: ${movie.Year}`;
        const plot = document.createElement("p");
        plot.textContent = `Synopsis: ${movie.Plot}`;
        const genre = document.createElement("p");
        genre.textContent = `Genre: ${movie.Genre}`;
        const actors = document.createElement("p");
        actors.textContent = `Acteur: ${movie.Actors}`

        const link = document.createElement("a");
        link.href = `http://www.omdbapi.com/?apikey=[yourkey]&`;
        link.target = "_blank";


        movieContainer.appendChild(poster);
        movieContainer.appendChild(title);
        movieContainer.appendChild(year);
        movieContainer.appendChild(plot);
        movieContainer.appendChild(genre);
        movieContainer.appendChild(actors)
        movieContainer.appendChild(link);
    } else {
        movieContainer.innerHTML = "<p>Film introuvable.</p>";
    }
}

window.onload = loadMovie;
