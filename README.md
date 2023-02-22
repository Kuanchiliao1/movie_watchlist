# movie_watchlist
Scrimba solo project

## Requirements
- Index = search page. Calls to OMD API
- Button to "add to watchlist" => saves data to local storage
- Watchlist.html loads and displays data from local storage

## Future notes for self:
- It turns out that `innerHTML` actually replaces the entire thing even if we do a `+=` assignment. Because of this, the prior eventListeners I added to the elements all kept getting reset. In the future, I want to use something like `insertAdjacentHTML` so that the prior HTML is not deleted
- Remember that array === [] will ALWAYS return false even if array is []
- Parse when getting string from local storage, and stringify when putting it in. Make localstorage functions to make the task a bit easier
- Look into event delegation

## Potential future improvements:
- extract logic into util.js and watchlist.js
- store all search results in local storage so we don't have to use API every time
- store only the neccessary info in local storage instead of the whole object
- make getMovieHtml() a bit more versatile. rn im using hard code to modify DOM order for responsiveness
- use event delegation instead of adding separate eventlisteners
- replace async code with async await

## Questions:
- How might I get started with changing this so it uses event delegation instead of event listeners added separately?
- How is `renderMovies()` accessing `e` even though I'm not passing it in as an argument? Does addEventListener pass in the argument automatically?
- What's the advantage of using a try catch block vs my conditional in `search()`? (its somewhere under the first `fetch()`)
- What are the pros and cons to using a ch unit for media queries?
- What might be a better way to implement the last part of `getMovieHtml()`? Have notes there explaining what's happening