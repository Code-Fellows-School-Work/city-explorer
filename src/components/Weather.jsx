// used ChatGPT to write this component.

import React from 'react';

const Weather = ({ weatherData, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData || weatherData.count === 0 || !weatherData.data[0]) {
    return <div>Loading...</div>;
  }

  const { datetime, weather } = weatherData.data[0];

  return (
    <div>
      <h2>Weather in {weatherData.data[0].city_name}</h2>
      <div>
        <p>Date and Time: {datetime}</p>
        <p>Weather: {weather.description}</p>
      </div>
    </div>
  );
};

export default Weather;