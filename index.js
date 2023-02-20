const apiKey = "f67d1b01"
const moviesContainer = document.getElementById("movies-container")

let input = "guardian"

// fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${input}`)
//   .then(response => response.json())
//   .then(data => {
//     data.Search.forEach(movie => {
//       const movieId = movie.imdbID
//       fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
//       .then(response => response.json())
//       .then(movieData => {
//         moviesContainer.innerHTML += getMovieHtml(movieData)
//         const addBtn = document.getElementById(movieId)
//         console.log(addBtn)
//         setTimeout(() => {
//           addBtn.addEventListener("click", () => {
//             console.log("testing")
//           })
//         }, 5000)
//       })
//     })

//     // console.log(getMovieHtml(data.Search[0]))
    
//   })

// Wait until content is loaded before running the code
document.addEventListener("DOMContentLoaded", () => {
  // Grab a list of movie objects from the OMDB API
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${input}`)
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
            if (!localStorage.getItem(movieId)) {
              localStorage.setItem(movieId, JSON.stringify(movieData))
            }
            console.log(movieId)
          })
            
        })
      })
    })
})


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
      <div class="movie-img-container">
        <img src="${Poster}" alt="picture of movie">
      </div>
      <div class="movie-info-container">
        <h2 class="movie-title">${Title}
          <span class="rating">⭐${imdbRating}</span>
        </h2>
        <p class="movie-time">${Runtime}</p>
        <p class="movie-genre">${Genre}</p>
        <button class="movie-add-btn" id="${imdbID}">+ Watchlist</button>
      </div>
    </div>
    <p class="movie-description">${Plot}</p>
  </div>
  `
}