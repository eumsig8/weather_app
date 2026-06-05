const WMO_CODES = {
  0:  { label: 'Clear sky',            icon: 'bi-sun-fill' },
  1:  { label: 'Mainly clear',         icon: 'bi-sun-fill' },
  2:  { label: 'Partly cloudy',        icon: 'bi-cloud-sun-fill' },
  3:  { label: 'Overcast',             icon: 'bi-cloud-fill' },
  45: { label: 'Fog',                  icon: 'bi-cloud-fog2-fill' },
  48: { label: 'Icy fog',              icon: 'bi-cloud-fog2-fill' },
  51: { label: 'Light drizzle',        icon: 'bi-cloud-drizzle-fill' },
  53: { label: 'Moderate drizzle',     icon: 'bi-cloud-drizzle-fill' },
  55: { label: 'Dense drizzle',        icon: 'bi-cloud-drizzle-fill' },
  61: { label: 'Slight rain',          icon: 'bi-cloud-rain-fill' },
  63: { label: 'Moderate rain',        icon: 'bi-cloud-rain-fill' },
  65: { label: 'Heavy rain',           icon: 'bi-cloud-rain-heavy-fill' },
  71: { label: 'Slight snow',          icon: 'bi-cloud-snow-fill' },
  73: { label: 'Moderate snow',        icon: 'bi-cloud-snow-fill' },
  75: { label: 'Heavy snow',           icon: 'bi-cloud-snow-fill' },
  77: { label: 'Snow grains',          icon: 'bi-cloud-snow-fill' },
  80: { label: 'Slight showers',       icon: 'bi-cloud-rain-fill' },
  81: { label: 'Moderate showers',     icon: 'bi-cloud-rain-fill' },
  82: { label: 'Violent showers',      icon: 'bi-cloud-rain-heavy-fill' },
  95: { label: 'Thunderstorm',         icon: 'bi-cloud-lightning-rain-fill' },
  96: { label: 'Thunderstorm + hail',  icon: 'bi-cloud-lightning-rain-fill' },
  99: { label: 'Thunderstorm + hail',  icon: 'bi-cloud-lightning-rain-fill' },
};

export function getWeatherInfo(code) {
  return WMO_CODES[code] ?? { label: 'Unknown', icon: 'bi-question-circle' };
}

export function getWindDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}