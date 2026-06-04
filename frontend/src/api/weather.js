import axios from 'axios';

const GEO_BASE = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_BASE = 'https://api.open-meteo.com/v1';

export async function searchCities(query) {
  if (!query || query.length < 2) return [];

  const { data } = await axios.get(`${GEO_BASE}/search`, {
    params: {
      name: query,
      count: 10,
      language: 'en',
      format: 'json',
    },
  });

  return data.results ?? [];
}

export async function fetchWeather(latitude, longitude) {
    const { data } = await axios.get(`${WEATHER_BASE}/forecast`, {
        params: {
        latitude,
        longitude,
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'weather_code',
            'wind_speed_10m',
            'wind_direction_10m',
            'precipitation',
            'is_day',
        ].join(','),
        daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'precipitation_sum',
            'wind_speed_10m_max',
        ].join(','),
        forecast_days: 5,
        timezone: 'auto',
        },
    });

    return data;
}