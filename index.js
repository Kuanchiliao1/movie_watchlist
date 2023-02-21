const apiKey = "f67d1b01"
const moviesContainer = document.getElementById("movies-container")
const searchForm = document.getElementById("search-form")


// if we're on the watchlist page, run this code
const moviesContainerWatchlist = document.getElementById("movies-container--watchlist")
if (moviesContainerWatchlist) {
  // Get the movies from local storage
  const movies = JSON.parse(localStorage.getItem("movies"))
  // Iterate through the movies
  movies.forEach(movie => {
    // Generate the HTML and add it to the DOM
    moviesContainerWatchlist.insertAdjacentHTML("beforeend", getMovieHtml(movie))
  })
}

// Wait until content is loaded before running the code
searchForm.addEventListener("submit", (e) => {
  e.preventDefault()
  // Clear the movies container
  moviesContainer.innerHTML = ""

  const searchInput = document.getElementById("search-input").value
  console.log(searchInput)
  // Grab a list of movie objects from the OMDB API
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`)
    .then(response => response.json())
    .then(data => {
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
            addToLocalStorage(movieData)
            console.log(JSON.parse(localStorage.getItem("movies")).map(movie => movie.Title))
          })
        })
      })
    })
})

// Pseudocode
// - Check if there is anything in local storage
//   - If there is nothing in local storage, add the movie to local storage as an array
//   - If there is something in local storage, check if the movie is already in local storage
//     - If the movie is already in local storage, do nothing
//     - If the movie is not in local storage, add the movie to local storage
function addToLocalStorage(movieData) {
  // const storageArray = [JSON.parse(localStorage.getItem("movies")] || [])
  // (storageArray === []) ? localStorage.setItem("movies", JSON.stringify([movieData])) : storageArray.push(movieData)
  // console.log(storageArray)
  
  // If there is nothing in local storage, add the movie to local storage as an array
  if (!localStorage.getItem("movies")) {
    localStorage.setItem("movies", JSON.stringify([movieData]))
  } else {
    if (isMovieInLocalStorage(movieData)) return
    const storageArray = JSON.parse(localStorage.getItem("movies"))
    storageArray.push(movieData)
    localStorage.setItem("movies", JSON.stringify(storageArray))
  }
}

function isMovieInLocalStorage(movieData) {
  const storageArray = JSON.parse(localStorage.getItem("movies"))
  return storageArray.some(movie => movie.imdbID === movieData.imdbID)
}


// Steps:
// Use search query parameter to search for a movie
// Retrieve the imdbID from the response
// Use the imdbID to make a request to the OMDB API
// Use the response from the OMDB API to render the movie details


function getMovieHtml(movieData) {
  const { Title, Poster, imdbRating, imdbID, Runtime, Genre, Plot } = movieData

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
        <button class="movie-add-btn" id="${imdbID}">➕ Watchlist</button>
      </div>
    </div>
    <p class="movie-description">${Plot}</p>
  </div>
  `
}