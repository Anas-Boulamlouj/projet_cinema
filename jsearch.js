document.getElementById('searchInput').addEventListener('input', async function () {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();

    if (input.length >= 2) {
        const filmDiv = document.getElementById('films');
        filmDiv.innerHTML = '<p>Searching...</p>';

        try {
            const data = await fetchMoviesDetails(input);
            if (data) {
                displayMovies(data.Search);
            } else {
                filmDiv.innerHTML = `<p>No movies found for "${input}".</p>`;
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
            filmDiv.innerHTML = `<p>An error occurred while searching for movies. Please try again later.</p>`;
        }
    } else if (searchInput.length === 0) {
        document.getElementById('films').innerHTML = '';
    }
});

function displayMovies(movies) {
    const filmDiv = document.getElementById('films');
    filmDiv.innerHTML = ''; // Clear previous results
}
movies.forEach(movie => {
    const film = document.createElement("div");
    film.className = "film";

    const poster = document.createElement("img");
    poster.src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.png";
    poster.alt = `${movie.Title} Poster`;

    const name = document.createElement("p");
    name.textContent = `Nom: ${movie.Title}`;

    const year = document.createElement("p");
    year.textContent = `Année: ${movie.Year}`;

    const lien = document.createElement("a");
    lien.href = "movie.html";
    lien.textContent = `Plus d'infos`;
    lien.addEventListener("click", () => {
        localStorage.setItem("selectedMovieID", movie.imdbID);
    });

    film.appendChild(poster);
    film.appendChild(name);
    film.appendChild(year);
    film.appendChild(lien);
    filmDiv.appendChild(film);
}