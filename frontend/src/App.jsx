import React, { useState } from 'react';
import SearchDropdown from './components/SearchDropdown/SearchDropdown';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import ForecastGrid from './components/ForecastGrid/ForecastGrid';
import { useTopCities } from './hooks/useTopCities';
import { fetchWeather } from './api/weather';
import axios from 'axios';

export default function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { topCities, recordCityView } = useTopCities();

  const handleCitySelect = async (city) => {
    setSelectedCity(city);
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      await axios.post('/api/log/city-selected', {
        city: city.name,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
      });
    } catch {
      console.warn('Failed to log city selection to backend');
    }

    recordCityView(city);

    try {
      const data = await fetchWeather(city.latitude, city.longitude);
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">
            <i className="bi bi-cloud-sun-fill me-2" />
            Weather Forecast
          </h1>
          <p className="app-subtitle">Search any city for current weather and a 5-day forecast</p>
        </div>
      </header>

      <main className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <SearchDropdown onSelect={handleCitySelect} topCities={topCities} />
          </div>
        </div>

        {topCities.length > 0 && !selectedCity && (
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-md-8 col-lg-6">
              <p className="top-cities-label">
                <i className="bi bi-clock-history me-1" />
                Recently viewed:
              </p>
              <div className="d-flex flex-wrap gap-2">
                {topCities.map((city) => (
                  <button
                    key={city.id}
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.name}, {city.country}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2 text-muted">Loading weather data…</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-4 text-center">{error}</div>
        )}

        {weather && selectedCity && !loading && (
          <>
            <CurrentWeather city={selectedCity} current={weather.current} />
            <ForecastGrid daily={weather.daily} />
          </>
        )}
      </main>

      <footer className="app-footer text-center text-muted py-3">
        <small>Powered by Open-Meteo &amp; Open-Meteo Geocoding API</small>
      </footer>
    </div>
  );
}