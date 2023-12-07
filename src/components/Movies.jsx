// used ChatGPT to write this component
import React from 'react';

const Movies = ({ moviesData, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!moviesData || moviesData.length === 0) {
    return <div>No movies found for the selected city.</div>;
  }

  return (
    <div>
      <h2>Top Movies Set in the City</h2>
      {moviesData.map((movie, index) => (
        <div key={index}>
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <p>Average Votes: {movie.average_votes}</p>
          <p>Total Votes: {movie.total_votes}</p>
          <p>Popularity: {movie.popularity}</p>
          <p>Released On: {movie.released_on}</p>
          <img src={movie.image_url} alt={movie.title} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Movies;