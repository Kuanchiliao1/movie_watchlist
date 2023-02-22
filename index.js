const apiKey = "f67d1b01"

// DOM Elements
const moviesContainer = document.getElementById("movies-container")
const searchForm = document.getElementById("search-form")
const moviesContainerWatchlist = document.getElementById("movies-container--watchlist")

// Set page to either watchlist or search
let page
moviesContainerWatchlist ? page = "watchlist" : page = "search"

// If nothing in local storage, add a default search
if (!getSearchFromLocalStorage()) {
  storeSearchInLocalStorage("Blade Runner")
}

// Run this code if the watchlist page is loaded
if (page === "watchlist") {
  // Get the movies from local storage
  let movies = getMoviesFromLocalStorage()
  setHtmlIfWatchlistEmpty()
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

// LOCAL STORAGE FUNCTIONS
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


search()

// FORM EVENT LISTENER
searchForm.addEventListener("submit", search)
function search(e) {
  // How are we accessing `e` even though I'm not passing it in as an argument?
  if (e) e.preventDefault()
  
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

// HELPER FUNCTIONS
function setHtmlIfWatchlistEmpty() {
  let movies = getMoviesFromLocalStorage()
  if (movies.length === 0 && page === "watchlist") {
    moviesContainerWatchlist.insertAdjacentHTML("beforeend", `<h1 style="padding-top: 5rem;">Nothing in your watchlist</h1><p></p>Search for movies <a href="index.html">here</a></p>`)
  }
}

// Steps:
// Use search query parameter to search for a movie
// Retrieve the imdbID from the response
// Use the imdbID to make a request to the OMDB API
// Use the response from the OMDB API to render the movie details
function getMovieHtml(movieData, page="search") {
  const { Title, Poster, imdbRating, imdbID, Runtime, Genre, Plot } = movieData
  // if page is watchlist, set page to watchlist, otherwise set btnName to search
  let btnName
  page === "watchlist" ? btnName = "➖ Remove" : btnName = "➕ Watchlist"

  if (isMovieInLocalStorage(movieData) && page === "search") {
    btnName = "✅ Added"
  }

  if (window.matchMedia("(max-width: 65ch)").matches) {
    return `
  <div class="movie-container">
    <div class="movie-img-info-container flex">
        <img src="${Poster}" alt="picture of movie">
      <div class="movie-info-container">
        <h2 class="movie-title">${Title}
          <span class="rating">⭐${imdbRating}</span>
        </h2>
        <p class="movie-time">${Runtime}</p>
        <p class="movie-genre">${Genre}</p>
        <button class="movie-add-btn" id="${imdbID}">${btnName}</button>
      </div>
    </div>
    <p class="movie-description">${Plot}</p>
  </div>
  `
  } else {
    return `
    <div class="movie-container">
      <div class="movie-img-info-container flex">
          <img src="${Poster}" alt="picture of movie">
        <div class="movie-info-container">
          <h2 class="movie-title">${Title}
            <span class="rating"> ⭐ ${imdbRating}</span>
          </h2>
          <p class="movie-time">${Runtime}</p>
          <p class="movie-genre">${Genre}</p>
          <button class="movie-add-btn" id="${imdbID}">${btnName}</button>
          <p class="movie-description">${Plot}</p>
        </div>
      </div>
    </div>
    `
  }
}