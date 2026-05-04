import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import "../css/MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadMovie();
    }
  }, [id]);

  if (loading) {
    return <div className="movie-detail loading">Loading movie details...</div>;
  }

  if (error) {
    return <div className="movie-detail error">{error}</div>;
  }

  if (!movie) {
    return <div className="movie-detail error">Movie not found.</div>;
  }

  return (
    <div 
      className="movie-detail"
      style={movie.backdrop_path ? {
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
      } : {}}
    >
      <div className="detail-backdrop-overlay"></div>

      <section className="detail-hero">
        <div className="detail-poster-card">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className="detail-poster-placeholder">No Image</div>
          )}
        </div>

        <div className="hero-content">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="detail-tagline">{movie.tagline}</p>}
          <div className="hero-meta">
            <span>{movie.release_date}</span>
            <span>{movie.runtime ? `${movie.runtime} min` : "Runtime unavailable"}</span>
            <span>⭐ {movie.vote_average?.toFixed(1)} / 10</span>
          </div>
          <p className="hero-overview">{movie.overview}</p>
          <Link to="/" className="detail-back-link">← Back to Home</Link>
        </div>
      </section>

      <div className="detail-header">
        <div className="detail-summary">
          <h2>About</h2>
          <p className="detail-overview">{movie.overview}</p>
          {movie.budget ? (
            <p className="detail-extra"><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
          ) : null}
          {movie.revenue ? (
            <p className="detail-extra"><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
          ) : null}
        </div>
      </div>

      <div className="detail-additional">
        <div>
          <h2>More Info</h2>
          <ul>
            <li><strong>Status:</strong> {movie.status || "Unknown"}</li>
            <li><strong>Original language:</strong> {movie.original_language?.toUpperCase() || "N/A"}</li>
            <li><strong>Popularity:</strong> {movie.popularity?.toFixed(1) || "N/A"}</li>
            <li><strong>Vote count:</strong> {movie.vote_count?.toLocaleString() || "N/A"}</li>
          </ul>
        </div>
        <div>
          <h2>Genres</h2>
          <div className="detail-genres">{movie.genres?.map((g) => (
            <span key={g.id} className="detail-genre">{g.name}</span>
          ))}</div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
