// server.js -- This is an express.js web server for serving React apps. 
import path from 'path';
import express from 'express';
require('dotenv').config();
const PORT = process.env.HTTP_PORT || 8081;
const app = express();
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
});  