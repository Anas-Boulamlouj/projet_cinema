
document.getElementById('searchInput').addEventListener('input', async function () {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();

    if (input.length >= 2) {
        const filmDiv = document.getElementById('films');
        filmDiv.innerHTML = '<p>Searching...</p>';

        try {
            const data = await fetchMoviesDetails(input);
            if (data && data.Search) { // Vérifie aussi que data.Search existe
                displayMovies(data.Search);
            } else {
                filmDiv.innerHTML = `<p>No movies found for "${input}".</p>`;
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
            filmDiv.innerHTML = `<p>An error occurred while searching for movies. Please try again later.</p>`;
        }
    } else if (input.length === 0) { // Correction ici : utilisation de "input" au lieu de "searchInput"
        document.getElementById('films').innerHTML = '';
    }
});

function displayMovies(movies) {
    const filmDiv = document.getElementById('films');
    filmDiv.innerHTML = ''; // Clear previous results

    // La boucle est bien à l'intérieur de la fonction displayMovies
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
    }); // Fin de forEach
} // Fin de displayMovies

// Fonction pour afficher les résultats dans le DOM
function displayResults(results) {
    // Vider le conteneur
    resultsContainer.innerHTML = '';

    // Vérifier si l'API renvoie des résultats
    if (!results || results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">Aucun résultat trouvé</div>';
        return;
    }

    // Créer une liste pour les résultats
    const ul = document.createElement('ul');

    results.forEach(item => {
        const li = document.createElement('li');
        // Adaptez "item.title" selon la structure JSON renvoyée par votre API
        li.textContent = item.title;

        // Action au clic sur un résultat
        li.addEventListener('click', () => {
            searchInput.value = item.title;
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'none';
            // Vous pouvez rediriger l'utilisateur ici, ex: window.location.href = `/produit/${item.id}`;
        });

        ul.appendChild(li);
    });

    resultsContainer.appendChild(ul);
    resultsContainer.style.display = 'block';
}