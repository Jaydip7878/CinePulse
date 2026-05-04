import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    loadPopularMovies();
  }, []);

  // reset to first page when movies change (e.g., after search)
  useEffect(() => {
    setCurrentPage(1);
  }, [movies]);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setError(null);
    } catch {
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch {
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(movies.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = movies.slice(startIndex, startIndex + itemsPerPage);
  const featuredMovie = paginated[0];
  const gridMovies = paginated;

  function goToPage(page) {
    const p = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getPaginationPages() {
    const pages = [];
    const pageSet = new Set();

    pageSet.add(1);

    pageSet.add(totalPages);
    if (totalPages > 1) pageSet.add(totalPages - 1);

    const windowStart = Math.max(2, currentPage - 1);
    const windowEnd = Math.min(totalPages - 2, currentPage + 2);
    for (let i = windowStart; i <= windowEnd; i++) {
      pageSet.add(i);
    }

    const sorted = Array.from(pageSet).sort((a, b) => a - b);

    for (let i = 0; i < sorted.length; i++) {
      const current = sorted[i];// 1,2,3,4,5,6,7  1,4,5,6,7,9,10
      const prev = sorted[i - 1];//0,1,2,3,4,5,6, 0,1,4,5,6,7,9

      if (prev !== undefined && current - prev > 1) {
        pages.push("...");
      }
      pages.push(current);//{1...4,5,6,7,...9,10}
    }

    return pages;
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button" disabled={!searchQuery.trim()}>
          Search
        </button>
        {searchQuery.trim() && (
          <button 
            type="button" 
            className="clear-button"
            onClick={() => {
              setSearchQuery("");
              setError(null);
              loadPopularMovies();
            }}
          >
            × Clear
          </button>
        )}
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {featuredMovie && featuredMovie.backdrop_path && (
            <div className="featured-movie">
              <img
                src={`https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path}`}
                alt={featuredMovie.title}
              />
              <div className="featured-overlay">
                <h2>{featuredMovie.title}</h2>
                <p>{featuredMovie.overview?.substring(0, 150)}...</p>
                <Link to={`/movie/${featuredMovie.id}`} className="featured-btn">
                  View Details →
                </Link>
              </div>
            </div>
          )}
          <div className="movies-grid">
            {gridMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination" role="navigation" aria-label="Pagination">
              <button
                className="page-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {getPaginationPages().map((page, idx) => 
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="page-ellipsis">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`page-btn ${page === currentPage ? "active" : ""}`}
                    onClick={() => goToPage(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="page-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
