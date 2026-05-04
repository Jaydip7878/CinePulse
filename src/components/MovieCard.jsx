import "../css/MovieCard.css"
import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        e.stopPropagation()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return (
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-card">
          <div className="movie-poster">
            {movie.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            ) : (
                <div className="movie-poster-placeholder">
                    <span>No Image</span>
                </div>
            )}
            <div className="movie-overlay">
                {movie.backdrop_path && (
                    <div className="movie-overlay-backdrop"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
                      }}
                    />
                )}
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
          </div>
          <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.release_date?.split("-")[0]}</p>
          </div>
        </div>
      </Link>
    )
}

export default MovieCard
