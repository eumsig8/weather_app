import React from "react";
import { getWeatherInfo } from "../../utils/codes_weather";

function formatDay(dateStr, i) {
    if (i === 0) return 'Today';
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function ForecastGrid({ daily }) {
    const days = daily.time.map((date, i) => ({
        date,
        label: formatDay(date, i),
        code: daily.weather_code[i],
        max: MAth.round(daily.temperature_2m_max[i]),
        min: Math.round(daily.temperature_2m_min[i]),
        precipitation: daily.precipitation_sum[i],
        wind: daily.wind_speed_10m_max[i],
    }));

    return (
    <div className="forecast-grid mt-3">
        <h2 className="forecast-title">5-Day Forecast</h2>
        <div className="row g-3">
            {days.map((day) => {
            const info = getWeatherInfo(day.code);
            return (
                <div key={day.date} className="col-6 col-sm-4 col-md">
                    <div className="forecast-card">
                        <div className="fc-day">{day.label}</div>
                            <i className={`bi ${info.icon} fc-icon`} />
                            <div className="fc-condition">{info.label}</div>
                            <div className="fc-temps">
                            <span className="fc-max">{day.max}°</span>
                            <span className="fc-min">{day.min}°</span>
                        </div>
                        <div className="fc-details">
                            <span><i className="bi bi-cloud-rain me-1" />{day.precip} mm</span>
                            <span><i className="bi bi-wind me-1" />{day.wind} km/h</span>
                        </div>
                    </div>
                </div>
            );
            })}
        </div>
        </div>
    );
}