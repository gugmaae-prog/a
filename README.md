# GIS Full-Stack Page

A simple full-stack GIS starter built with:
- **Backend:** Node.js + Express
- **Frontend:** Single-file HTML page (`public/index.html`) using Leaflet
- **Data:** In-memory location store exposed via REST API

## Run locally

```bash
npm install
npm start
```

Then open: `http://localhost:3000`

## API

### `GET /api/locations`
Returns all locations.

### `POST /api/locations`
Create a location.

Example payload:

```json
{
  "name": "Golden Gate Bridge",
  "type": "Landmark",
  "lat": 37.8199,
  "lng": -122.4783,
  "note": "Popular destination"
}
```
