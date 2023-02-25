// localstorage.js
import {setHtmlIfWatchlistEmpty} from './watchlist.js'

function getMoviesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("movies"))
}

function getSearchFromLocalStorage() {
  return localStorage.getItem("search")
}

function deleteMovieFromLocalStorage(movieId) {
  const movies = getMoviesFromLocalStorage()
  const filteredMovies = movies.filter(movie => movie.imdbID !== movieId)
  localStorage.setItem("movies", JSON.stringify(filteredMovies))
  setHtmlIfWatchlistEmpty()
}

// Pseudocode for addMovieToLocalStorage
// - Check if there is anything in local storage
//   - If nothing in local storage, add the movie to local storage
//   - If something in local storage, check if the movie is already in local storage
//     - If the movie is already in local storage, do nothing
//     - If the movie is not in local storage, add the movie to local storage
function addMovieToLocalStorage(movieData) {
  // Return early if the movie is already in local storage
  if (isMovieInLocalStorage(movieData)) return
  // If there is nothing in local storage, add the movie to local storage as an array
  const storageArray = JSON.parse(localStorage.getItem("movies")) || []
  storageArray.unshift(movieData)
  localStorage.setItem("movies", JSON.stringify(storageArray))
}

function isMovieInLocalStorage(movieData) {
  const storageArray = JSON.parse(localStorage.getItem("movies")) || []
  return storageArray.some(movie => movie.imdbID === movieData.imdbID)
}

function storeSearchInLocalStorage(searchInput) {
  localStorage.setItem("search", searchInput)
}

export {deleteMovieFromLocalStorage, getSearchFromLocalStorage, getMoviesFromLocalStorage, addMovieToLocalStorage, isMovieInLocalStorage, storeSearchInLocalStorage}