mapboxgl.accessToken = 'pk.eyJ1IjoiZGlhYm9saWNzb3VuZCIsImEiOiJja2FteXRuYWYwcXZrMnNtdmJjOXBsYmlxIn0.z9rokHUhz3bQeb1WHyiV_Q';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  zoom: 9.8,
});

const marker = new mapboxgl.Marker();

export { map, marker };
