// watchlist.js
import getMovieHtml from "./utils.js"
import {deleteMovieFromLocalStorage, getSearchFromLocalStorage, getMoviesFromLocalStorage, addMovieToLocalStorage, isMovieInLocalStorage, storeSearchInLocalStorage} from "./localstorage.js"

const moviesContainerWatchlist = document.getElementById("movies-container--watchlist")
const movies = getMoviesFromLocalStorage()

if (moviesContainerWatchlist) {
  setHtmlIfWatchlistEmpty(movies)
  // Iterate through the movies
  movies.forEach(movie => {
  // Generate the HTML and add it to the DOM
      moviesContainerWatchlist.insertAdjacentHTML("beforeend", getMovieHtml(movie, "watchlist"))
      const removeMovieBtn = document.getElementById(movie.imdbID)
      removeMovieBtn.addEventListener("click", () => {      
          // Is there a better way to remove the parent parent parent element here?
          removeMovieBtn.parentElement.parentElement.parentElement.remove()
          deleteMovieFromLocalStorage(movie.imdbID)
      })
  })
}

function setHtmlIfWatchlistEmpty() {
  if (getMoviesFromLocalStorage().length === 0 && moviesContainerWatchlist) {
    moviesContainerWatchlist.insertAdjacentHTML("beforeend", `<h1 style="padding-top: 5rem;">Nothing in your watchlist</h1><p></p>Search for movies <a href="index.html">here</a></p>`)
  }
}

export {setHtmlIfWatchlistEmpty}