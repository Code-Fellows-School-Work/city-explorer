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
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  // console.log("API Key:", API_KEY);

  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  // changed to [] instead of null? -- I changed state to an empty array then modified weather.jsx file to use map and it sucessfully rendered the server weather data onto the webpage
  // const [forecast, setForecast] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  async function getWeatherData(lat, lon) {
    try {
      let weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}&days=2`);
      console.log('Weather Response:', weatherResponse.data);

      // Set the weather data in state
      setWeatherData(weatherResponse.data);

      // Do something with the weather data
      console.log('Weather Data:', weatherResponse.data);
    } catch (error) {
      // Handle errors from the weather API
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data');
    }
  }

  async function getLocation(cityName) {
    let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${cityName}&format=json`;

    try {
      let response = await axios.get(url);
      setCity(response.data[0].display_name);
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
      setError(null);

      // Call the function to fetch weather data
      getWeatherData(response.data[0].lat, response.data[0].lon);
    } catch (error) {
      setError(error.response ? error.response.status : 500);
    }
  }

  function changeCity(newCity) {
    getLocation(newCity);
    console.log("Changing to", newCity);
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
        </>
      )}
    </div>
  );
}

export default App;
