// used ChatGPT to write this component.

import React from 'react';

const Weather = ({ forecastData, error }) => {
    if (error) {
      // Display an error message to the user
      return <div>Error: {error}</div>;
    }
  
    if (!forecastData || !forecastData.city || !forecastData.city.data) {
      // Display a loading message or handle the absence of data
      return <div>Loading...</div>;
    }
  
    // Assuming forecastData follows the structure you provided
    const cityName = forecastData.city.city_name;
  
    return (
      <div>
        <h1>Weather in {cityName}</h1>
        {forecastData.city.data.map((day, index) => (
          <div key={index}>
            <p>Date: {day.valid_date}</p>
            <p>Weather: {day.weather.description}</p>
            {/* Add other information you want to display for each day */}
          </div>
        ))}
      </div>
    );
  };
  
  export default Weather;