const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const locations = [
  {
    id: 1,
    name: 'New York City',
    type: 'City',
    lat: 40.7128,
    lng: -74.006,
    note: 'Default seed location'
  },
  {
    id: 2,
    name: 'Los Angeles',
    type: 'City',
    lat: 34.0522,
    lng: -118.2437,
    note: 'Default seed location'
  },
  {
    id: 3,
    name: 'Chicago',
    type: 'City',
    lat: 41.8781,
    lng: -87.6298,
    note: 'Default seed location'
  }
];

app.get('/api/locations', (_req, res) => {
  res.json({ data: locations });
});

app.post('/api/locations', (req, res) => {
  const { name, type, lat, lng, note } = req.body || {};

  if (!name || typeof lat !== 'number' || typeof lng !== 'number') {
    return res.status(400).json({
      error: 'Invalid payload. Required: name(string), lat(number), lng(number).'
    });
  }

  const location = {
    id: locations.length ? locations[locations.length - 1].id + 1 : 1,
    name,
    type: type || 'Custom',
    lat,
    lng,
    note: note || ''
  };

  locations.push(location);
  return res.status(201).json({ data: location });
});

app.listen(PORT, () => {
  console.log(`GIS app running at http://localhost:${PORT}`);
});
