import React from 'react';


const HourlyForecast = ({ hourlyForecast }) => {
  return (
    <div>
      {/* Render the hourly forecast data */}
      {hourlyForecast && (
        <div>
          <h1>Hourly Forecast</h1>
          <p>{hourlyForecast}</p>
        </div>
      )}
    </div>
  );
};

export default HourlyForecast;