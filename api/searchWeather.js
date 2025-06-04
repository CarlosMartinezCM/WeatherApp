// /api/searchWeather.js
export default async function handler(req, res) {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ message: 'Missing location parameter' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}`
    );

    if (!response.ok) {
      return res.status(500).json({ message: 'Failed to fetch weather data' });
    }

    const weatherData = await response.json();
    res.status(200).json(weatherData);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
