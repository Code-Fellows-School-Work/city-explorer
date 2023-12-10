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

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY

// Define the rounding function
function roundToDecimalPlaces(value, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Math.round(value * factor) / factor;
}

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

  async function getLocation(cityName) {
    const locationUrl = `https://us1.locationiq.com/v1/search?key=${REACT_APP_API_KEY}&q=${cityName}&format=json`;

    try {
      const response = await axios.get(locationUrl);

      // Round latitude and longitude to 4 decimal places
      const roundedLatitude = roundToDecimalPlaces(response.data[0].lat, 5);
      const roundedLongitude = roundToDecimalPlaces(response.data[0].lon, 5);

      setCity(response.data[0].display_name);
      setLatitude(roundedLatitude);
      setLongitude(roundedLongitude);
      
      getWeatherData(roundedLatitude, roundedLongitude);
    } catch (error) {
      setError(error.response ? error.response.status : 500);
    }
  }

  async function getMapData(lat, lon) {
    const mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${lat},${lon}&size=600x600&format=png`;

    try {
      const mapResponse = await axios.get(mapUrl);
      console.log('Map Data:', mapResponse.data);
    } catch (error) {
      console.error('Error fetching map data:', error);
    }
  }

  async function changeCity(newCity) {
    getLocation(newCity);
    console.log('Changing to', newCity);

    getMoviesData(newCity);

    // Round latitude and longitude before passing to getMapData
    const roundedLatitude = roundToDecimalPlaces(latitude, 5);
    const roundedLongitude = roundToDecimalPlaces(longitude, 5);
    
    getMapData(roundedLatitude, roundedLongitude);
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
