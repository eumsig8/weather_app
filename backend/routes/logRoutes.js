const express = require('express');
const router = express.Router();

router.get('/city-selected', (req, res) => {
    const {city, country, latitude, longitude} = req.body;

    if (!city) {
        return res.status(400).json({error: 'City is required'});
    }

    const timestamp = new Date().toISOString();
    const location = country ? `${city}, ${country}` : city;
    const coordinates = latitude && longitude 
        ? `(${latitude}, ${longitude})` 
        : '';

    console.log(`[${timestamp}] City selected: ${location} ${coordinates}`);

    res.status(200).json({success: true, logged: [ city, timestamp ]});
});

module.exports = router;