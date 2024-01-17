// server.js -- This is an express.js web server for serving React apps. 
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
//require('dotenv').config();
const PORT = process.env.HTTP_PORT || 8081;
const app = express();
const port = 3001;

app.use(cors());

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
});  



app.use(cors());

app.get('/images', async (req, res) => {
  try {
    const response = await fetch('https://services.swpc.noaa.gov/images/animations/suvi/primary/304/');
    const html = await response.text();
    const filenames = html.match(/or_suvi-l2-ci304_g16_s[\d]+T[\d]+Z_e[\d]+T[\d]+Z_v1-0-1\.png/g) || [];
    res.json({ filenames });
  } catch (error) {
    console.error('Error fetching image filenames:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});