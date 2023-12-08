// used ChatGPT to write this component
import React from 'react';

const Movies = ({ moviesData, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!moviesData || moviesData.length === 0) {
    return <div>No movies data available</div>;
  }

  return (
    <div>
      <h2>Top Movies</h2>
      <div>
        {moviesData.map((movie, index) => (
          <div key={index}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p>Average Votes: {movie.vote_average}</p>
            <p>Total Votes: {movie.vote_count}</p>
            <p>Popularity: {movie.popularity}</p>
            <p>Released On: {movie.release_date}</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
