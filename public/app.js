const map = L.map('map').setView([39.8283, -98.5795], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);
const listEl = document.getElementById('locationList');
const formEl = document.getElementById('locationForm');
const statusEl = document.getElementById('status');

async function loadLocations() {
  const response = await fetch('/api/locations');
  const payload = await response.json();
  renderLocations(payload.data || []);
}

function renderLocations(locations) {
  markerLayer.clearLayers();
  listEl.innerHTML = '';

  const bounds = [];

  locations.forEach((location) => {
    const marker = L.marker([location.lat, location.lng]).addTo(markerLayer);
    marker.bindPopup(
      `<b>${location.name}</b><br/>${location.type || 'Unknown'}<br/>${location.note || ''}`
    );

    const item = document.createElement('li');
    item.innerHTML = `<strong>${location.name}</strong> (${location.type || 'Unknown'})<br/>${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`;
    listEl.appendChild(item);

    bounds.push([location.lat, location.lng]);
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [30, 30] });
  }
}

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusEl.textContent = 'Saving...';

  const body = {
    name: document.getElementById('name').value.trim(),
    type: document.getElementById('type').value.trim(),
    lat: Number(document.getElementById('lat').value),
    lng: Number(document.getElementById('lng').value),
    note: document.getElementById('note').value.trim()
  };

  try {
    const response = await fetch('/api/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error('Failed to save location');
    }

    formEl.reset();
    statusEl.textContent = 'Location saved.';
    await loadLocations();
  } catch (error) {
    statusEl.textContent = error.message;
  }
});

loadLocations().catch(() => {
  statusEl.textContent = 'Unable to load locations.';
});
