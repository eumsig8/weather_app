import React from "react";
import {getWeatherInfo, getWindDirection} from "../../utils/weatherCodes";
import './CurrentWeather.scss';

export default function CurrentWeather({ city, current }) {
    if (!city || !current) {
        return null;
    }

    const info = getWeatherInfo(current.weather_code);
    const windDir = getWindDirection(current.wind_direction_10m);

    const stats = [
        { icon: 'bi-droplet-fill',     label: 'Humidity',       value: `${current.relative_humidity_2m}%` },
        { icon: 'bi-wind',             label: 'Wind',           value: `${current.wind_speed_10m} km/h ${windDir}` },
        { icon: 'bi-thermometer-half', label: 'Feels like',     value: `${Math.round(current.apparent_temperature)}°C` },
        { icon: 'bi-cloud-rain-fill',  label: 'Precipitation',  value: `${current.precipitation} mm` },
    ];

    return (
        <div className="current-weather mb-4">
            <div className="cw-card">
                <div className="cw-location">
                    <i className="bi bi-geo-alt-fill me-1" />
                    {city.name}{city.country ? `, ${city.country}` : ''}
                </div>

                <div className="cw-main">
                    <i className={`bi ${info.icon} cw-icon`} />
                    <div>
                        <div className="cw-temp">{Math.round(current.temperature_2m)}°C</div>
                        <div className="cw-condition">{info.label}</div>
                    </div>
                </div>

                <div className="cw-stats row g-2 mt-2">
                    {stats.map((s) => (
                        <div key={s.label} className="col-6 col-sm-3">
                            <div className="cw-stat-item">
                                <i className={`bi ${s.icon} me-1`} />
                                <span className="cw-stat-label">{s.label}:</span>
                                <span className="cw-stat-value">{s.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}