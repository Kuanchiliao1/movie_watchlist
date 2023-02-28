// index.js
// Extra features:
// - Add search to local storage
// - Auto load movies from local storage on search page
// - Error message if search invalid

import getMovieHtml from "./utils.js"
import {deleteMovieFromLocalStorage, getSearchFromLocalStorage, getMoviesFromLocalStorage, addMovieToLocalStorage, storeSearchInLocalStorage} from './localstorage.js'


const apiKey = "f67d1b01"
// DOM Elements
const moviesContainer = document.getElementById("movies-container")
const searchForm = document.getElementById("search-form")

// Set page to either watchlist or search
let page = "search"

// Add default search to local storage if empty
if (!getSearchFromLocalStorage()) {
  storeSearchInLocalStorage("Blade Runner")
}

// Run this code if the search page is loaded
if (page === "search") {
  renderMovies()
  // FORM EVENT LISTENER
  searchForm.addEventListener("submit", renderMovies)
  function renderMovies(e) {
    // How are we accessing `e` even though I'm not passing it in as an argument?
    try {
      e.preventDefault()
    } catch(error) {
      console.log("hello?")
    }
    
    // Clear the movies container
    moviesContainer.innerHTML = ""
    let searchInput = document.getElementById("search-input").value
    
    searchInput ? storeSearchInLocalStorage(searchInput) : searchInput = getSearchFromLocalStorage()

    // Grab a list of movie objects from the OMDB API
      fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`)
        .then(response => response.json())
        .then(data => {
          // What's the diff between a try catch block and doing this?
          if (data.Error) {
            moviesContainer.insertAdjacentHTML("beforeend", `<h1>${data.Error}</h1>`)
            return
          }
          // Iterate through the list of movies
          data.Search.forEach(movie => {
            const movieId = movie.imdbID
            // Use the ID to make a request to the OMDB API for more details on a specific movie
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
            .then(response => response.json())
            .then(movieData => {
              // Generate the HTML and add it to the DOM
              moviesContainer.insertAdjacentHTML("beforeend", getMovieHtml(movieData)) 
              const addBtn = document.getElementById(movieId)
              addBtn.addEventListener("click", () => {
                if (addBtn.textContent === "✅ Added") {
                  deleteMovieFromLocalStorage(movieId)
                  addBtn.textContent = "➕ Watchlist"
                } else {
                  addMovieToLocalStorage(movieData)
                  addBtn.textContent = "✅ Added"
                }
              })
            })
          })
        })
      }
}




