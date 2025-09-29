const fs = require('fs');
const path = require('path');

const getWeather = (req, res) => {
    const cityName = req.query.city;

    if (!cityName) {
        return res.status(400).json({ error: 'Please provide a city in the query string'});
    }   

    const filePath = path.join(__dirname, '../data/weather.json');  
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Server error reading data file' });
        }

        const cities = JSON.parse(data);

        const cityWeather = cities.find(
            (c) => c.city.toLowerCase() === cityName.toLowerCase()
        );

        if (cityWeather) {

            if (req.accepts("html")) {
                res.send(`
                    <h1>Weather Report</h1>
                    <p><strong>City:</strong> ${cityWeather.city}</p>
                    <p><strong>Temperature:</strong> ${cityWeather.temperature}C</p>
                    <p><strong>Condition:</strong> ${cityWeather.condition}</p>
                `);
            } else {
            res.json(cityWeather);
            }

            if (req.accepts("html")) {
                res.status(404).send(`
                   <h1>Unknown City</h1>
                   <p>The city <strong>${cityName}</strong> was not found in our records.</p> 
                    `)
        } else {
            res.status(404).json({ error: 'City not found' });
        }  
        }
    });
};

module.exports = { getWeather };