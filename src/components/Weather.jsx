// used ChatGPT to write this component

import React from 'react';

function Weather({ forecastData }) {
  return (
    <div>
      <h2>Weather Forecast for {forecastData.city_name}</h2>
      {forecastData.city && forecastData.city.length > 0 ? (
        <div>
          <p>Date: {forecastData.city[0].valid_date}</p>
          <p>Description: {forecastData.city[0].weather.description}</p>
          {/* Add other weather details as needed */}
        </div>
      ) : (
        <p>No forecast data available</p>
      )}
    </div>
  );
}

export default Weather;