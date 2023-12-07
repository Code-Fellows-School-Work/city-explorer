// used ChatGPT to write this component.

import React from 'react';

const Weather = ({ weatherData, error }) => {
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!weatherData || weatherData.data.length === 0) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Weather in {weatherData.city_name}</h2>
        {weatherData.data.map((day, index) => (
          <div key={index}>
            <p>Description: Low of {day.low_temp}, high of {day.high_temp} with {day.weather.description}</p>
            <p>Date: {day.valid_date}</p>
            <hr />
          </div>
        ))}
      </div>
    );
  };
  
  export default Weather;