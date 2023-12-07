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
const weather_API_KEY = process.env.weather_API_KEY;

function App() {
  // console.log("API Key:", API_KEY);

  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  // changed to [] instead of null? -- I changed state to an empty array then modified weather.jsx file to use map and it sucessfully rendered the server weather data onto the webpage
  const [forecast, setForecast] = useState([]);

  // New function to fetch weather data
  async function getWeatherData(lat, lon, searchQuery) {
    try {
      let weatherResponse = await axios.get(`http://localhost:5511/weather`, {
        params: {
          lat: lat,
          lon: lon,
          searchQuery: searchQuery,
        },
      });

      // Log the entire response for debugging
      console.log('Weather Response:', weatherResponse.data);

      // Set the forecast data in state
      setForecast(weatherResponse.data);

      // Do something with the forecast data
      console.log('Forecast Data:', weatherResponse.data);
    } catch (error) {
      // Handle errors from the /weather endpoint
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data');
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
