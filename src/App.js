// Inside your App.js file

import { useState } from 'react';
import axios from 'axios';
import Header from "./components/Header.jsx";
import CityForm from "./components/CityForm.jsx";
import Map from './components/Map.jsx';
import CityInfo from './components/CityInfo.jsx';
import ErrorDisplay from './components/ErrorCode.jsx';
import Weather from './components/Weather';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  // console.log("API Key:", API_KEY);

  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);

  // New function to fetch weather data
  async function getWeatherData(lat, lon, searchQuery) {
    try {
      let weatherResponse = await axios.get(`http://localhost:5510/weather`, {
        params: {
          lat: lat,
          lon: lon,
          searchQuery: searchQuery,
        },
      });

      // Log the entire response for debugging
      console.log('Weather Response:', weatherResponse.data);

      // Access the city and forecast data from the response
      const cityData = weatherResponse.data.city;
      const forecastData = weatherResponse.data.forecast;
      setForecast(forecastData);

      // Do something with the city and forecast data (e.g., update state)
      console.log('City Data:', cityData);
      console.log('Forecast Data:', forecastData);
    } catch (error) {
      // Handle errors from the /weather endpoint
      console.error('Error fetching weather data:', error);
    }
  }

  // Use API (locationIQ) to get the lat/lon
  async function getLocation(cityName) {
    // 1. Call the API asynchronously
    let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${cityName}&format=json`;
    try {
      let response = await axios.get(url);
      // 2. Put the city into state
      setCity(response.data[0].display_name);

      // 3. Put the lat/lon into state
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);

      // 4. clears previous errors
      setError(null);

      // 5. Make a new request to the /weather endpoint
      getWeatherData(
        parseFloat(response.data[0].lat).toFixed(2),
        parseFloat(response.data[0].lon).toFixed(2),
        cityName
      );
    } catch (error) {
      setError(error.response ? error.response.status : 500);
    }
  }

  function changeCity(newCity) {
    // get the location data
    getLocation(newCity);

    // print a map
    console.log("Changing to", newCity);
  }

  return (
    <div>
      <Header />
      <CityForm city={city} handleChangeCity={changeCity} />
      {error ? (
        <ErrorDisplay errorCode={error} />
      ) : (
        <Map latitude={latitude} longitude={longitude} />
      )}
      {city && <CityInfo cityName={city} latitude={latitude} longitude={longitude} />}
      {forecast && <Weather forecastData={forecast} />}
    </div>
  );
}

export default App;
