const apiKey = "19fb7e21";
async function fetchMovies(name) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=[yourkey]&
=${apiKey}&s=${name}`);
        const data = await response.json();
        return data.Response === "True" ? data.Search : [];
    } catch (error) {
        console.error("Error fetching movies:", error);
        return null;
    }
}

async function fetchMoviesDetails(name) {
    const ID = localStorage.getItem("selectedMovieID");

    let url = `https://www.omdbapi.com/?apikey=${apiKey}`;
    if (name) {
        url += `&s=${name}`;
    } else if (ID) {
        url += `&i=${ID}`;
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
            return data;
        } else {
            console.error("Movies not found:", data.Error);
            return null;
        }
    } catch (e) {
        console.error("Error fetching movies:", e);
        return null;
    }
}