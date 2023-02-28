// utils.js
import {isMovieInLocalStorage} from './localstorage.js'

export default function getMovieHtml(movieData, page="search") {
  const { Title, Poster, imdbRating, imdbID, Runtime, Genre, Plot } = movieData
  // if page is watchlist, set btn name to - remove, else set btn name to + watchlist
  let btnName
  page === "watchlist" ? btnName = "➖ Remove" : btnName = "➕ Watchlist"

  if (isMovieInLocalStorage(movieData) && page === "search") {
    btnName = "✅ Added"
  }

  // if window width is less than 65ch, return the following html. NOTE: the only difference is that the last p element with the class move-description is shifted
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

