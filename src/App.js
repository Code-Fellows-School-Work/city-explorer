// App.js
import { useState } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import CityForm from './components/CityForm.jsx';
import Map from './components/Map.jsx';
import CityInfo from './components/CityInfo.jsx';
import ErrorDisplay from './components/ErrorCode.jsx';
import Weather from './components/Weather.jsx';
import Movies from './components/Movies.jsx';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [moviesData, setMoviesData] = useState([]);

  async function getWeatherData(lat, lon) {
    try {
      const weatherResponse = await axios.get(`http://localhost:5513/api/weather?lat=${lat}&lon=${lon}`);
      setWeatherData(weatherResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data');
    }
  }

  async function getMoviesData(cityName) {
    try {
      const moviesResponse = await axios.get(`http://localhost:5513/api/movies?cityName=${cityName}`);
      setMoviesData(moviesResponse.data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setError('Error fetching movie data');
    }
  }

  function changeCity(newCity) {
    getLocation(newCity);
    console.log('Changing to', newCity);

    getMoviesData(newCity);
  }

  async function getLocation(cityName) {
    const locationUrl = `http://localhost:5513/api/location?cityName=${cityName}`;

    try {
      const locationResponse = await axios.get(locationUrl);
      const firstResult = locationResponse.data[0];

      setCity(firstResult.display_name);
      setLatitude(firstResult.lat);
      setLongitude(firstResult.lon);
      setError(null);

      // Call the function to fetch weather data
      getWeatherData(firstResult.lat, firstResult.lon);
    } catch (error) {
      setError(error.response ? error.response.status : 500);
    }
  }

  return (
    <div>
      <Header />
      <CityForm city={city} handleChangeCity={changeCity} />
      {error ? (
        <ErrorDisplay errorCode={error} />
      ) : (
        <>
          <Map latitude={latitude} longitude={longitude} />
          {city && <CityInfo cityName={city} latitude={latitude} longitude={longitude} />}
          {weatherData && <Weather weatherData={weatherData} />}
          {moviesData ? <Movies moviesData={moviesData} error={error} /> : <p>Hello World</p>}
        </>
      )}
    </div>
  );
}

export default App;
