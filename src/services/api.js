const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
if (!API_KEY) {
  throw new Error("Missing TMDB API key. Set VITE_TMDB_API_KEY in a .env file.");
}
const BASE_URL = "https://api.themoviedb.org/3";

const fetchPage = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

const fetchAllPages = async (baseUrl, maxPages = 5) => {
  const first = await fetchPage(`${baseUrl}&page=1`);
  let results = first.results || [];
  const totalPages = first.total_pages || 1;
  const pagesToFetch = Math.min(totalPages, maxPages);
  
  if (pagesToFetch > 1) {
    const tasks = [];
    for (let p = 2; p <= pagesToFetch; p++) {
      tasks.push(fetchPage(`${baseUrl}&page=${p}`));
    }
    
    console.log(tasks,"here is tasks")
    const pages = await Promise.allSettled(tasks);
    for (const pg of pages) {
      if(pg.status==="fulfilled"){
        results = results.concat(pg.value.results || []);
      }
    }
  }

  console.log(results,"here is result")
  
  return results;
};
export const getPopularMovies = async (maxPages = 90) => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`; 
  return fetchAllPages(url, maxPages);
};

export const searchMovies = async (query, maxPages = 4) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;
  return fetchAllPages(url, maxPages);
};

export const getMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
  return fetchPage(url);
};
