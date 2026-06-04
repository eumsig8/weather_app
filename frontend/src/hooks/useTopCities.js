import { useState, useCallback } from 'react';

const STORAGE_KEY = 'weather_top_cities';
const MAX_CITIES = 3;

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(cities) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}

export function useTopCities() {
  const [topCities, setTopCities] = useState(loadFromStorage);

  const recordCityView = useCallback((city) => {
    setTopCities((prev) => {
      const filtered = prev.filter((c) => c.id !== city.id);
      const updated = [city, ...filtered].slice(0, MAX_CITIES);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  return { topCities, recordCityView };
}