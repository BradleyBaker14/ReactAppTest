import React, { useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    padding: '2rem',
    maxWidth: '500px',
    textAlign: 'center',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  form: {
    marginBottom: '1rem',
  },
  input: {
    padding: '0.5rem',
    marginRight: '0.5rem',
    width: '60%',
  },
  button: {
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
  weatherContainer: {
    marginTop: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
  },
  weatherDetails: {
    marginTop: '1rem',
  },
  iconContainer: {
    marginTop: '1rem',
  },
};

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: process.env.REACT_APP_WEATHER_API_KEY,
          q: city,
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found! Please Try Again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Weather Map</h1>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Get Weather
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && !loading && (
        <div style={styles.weatherContainer}>
          <h2>
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <div style={styles.weatherDetails}>
            <p>Temperature: {weatherData.current.temp_c} °C</p>
            <p>Humidity: {weatherData.current.humidity}</p>
            <p>Wind Speed: {weatherData.current.wind_kph}</p>
            <div style={styles.iconContainer}>
              {weatherData?.current?.condition?.icon && (
                <img
                  src={weatherData.current.condition.icon}
                  alt="Weather Icon"
                />
              )}
              <p>{weatherData?.current?.condition?.text || 'No description available'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
