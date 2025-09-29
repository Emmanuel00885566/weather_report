const express = require('express');
const app = express();
const port = 3000;

const weatherRoutes = require('./routes/weather');


app.get('/', (req, res) => {
  res.send('Waether App is running!');
});

app.use('/weather', weatherRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
