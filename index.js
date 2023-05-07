const searchField = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", search);
const EPISODE_ORDER = [0, 4, 5, 6, 1, 2, 3];
//search films
async function search() {
  try {
    const apiRequest = await (
      await fetch(`https://swapi.dev/api/films/?search=${searchField.value}`)
    ).json();
    const { count, results } = apiRequest;
    //if not
    //show placeholder that none found
    if (count == 0) {
      console.log("not here it is what you seek");
    }
    //if found films
    else {
      const movies = document.getElementById("movies-container");
      //clear entries first or else it will duplicate results
      while (movies.hasChildNodes()) {
  movies.removeChild(movies.firstChild);
}
      //display details of found films //poster //name
      //on  click of card - show modal(dialog) with description
      //and other bits
      results.forEach((result) => {
        const movie = document.createElement("div");
        movie.classList.add("movie");
        const poster = document.createElement("img");
        poster.classList.add("movie-img");
        poster.setAttribute("src",`https://starwars-visualguide.com/assets/img/films/${EPISODE_ORDER.indexOf(result.episode_id)}.jpg`);
        poster.setAttribute("alt", `${result.title} poster`);
        const title = document.createElement("p");
        title.classList.add("movie-title");
        title.innerText = result.title;

        movie.appendChild(poster)
        movie.appendChild(title)
        movies.appendChild(movie)
      });
    }
  } catch (e) {
    console.log("handle network errors", e);
  }
}

//stretch:
// - watch later - localstorage
