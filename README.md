# movie_watchlist
Scrimba solo project

## Requirements
- Index = search page. Calls to OMD API
- Button to "add to watchlist" => saves data to local storage
- Watchlist.html loads and displays data from local storage

## Notes:
- It turns out that `innerHTML` actually replaces the entire thing even if we do a `+=` assignment. Because of this, the prior eventListeners I added to the elements all kept getting reset. In the future, I want to use something like `insertAdjacentHTML` so that the prior HTML is not deleted