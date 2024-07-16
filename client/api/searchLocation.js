// api/searchLocation.js
require('dotenv').config();
/* This will use the serverless functions on Vercel to search location by city in the weatherApp */
export default async function handler(req, res) {
    const { city } = req.query;
  
    if (!city) {
      res.status(400).json({ error: 'City is required' });
      return;
    }
  
    const apiKey = process.env.REACT_APP_API_KEY;
  
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json(data);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  