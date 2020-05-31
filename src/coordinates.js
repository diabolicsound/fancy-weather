import { LATITUTE, LONGTITUTE } from './const';
import { geoPosition, geoSearchPosition } from './urlRequests';
import { marker, map } from './map';
import { latitudeTranslate } from './translation';

async function latitudePositionBuilder() {
  const position = await geoPosition();
  marker.setLngLat([position.city.coord.lon, position.city.coord.lat])
    .addTo(map);
  LATITUTE.textContent = `Latitude: ${String((position.city.coord.lat).toFixed(2)).replace('.', '°')}′`;
  LONGTITUTE.textContent = `Longitude: ${String((position.city.coord.lon).toFixed(2)).replace('.', '°')}′`;
  latitudeTranslate(LATITUTE, 'en', localStorage.getItem('lang'));
  latitudeTranslate(LONGTITUTE, 'en', localStorage.getItem('lang'));
}


async function latitudeSearchPositionBuilder() {
  const position = await geoSearchPosition();
  marker.setLngLat([position.results[0].geometry.lng, position.results[0].geometry.lat])
    .addTo(map);
  LATITUTE.textContent = `Latitude: ${String((position.results[0].geometry.lat).toFixed(2)).replace('.', '°')}′`;
  LONGTITUTE.textContent = `Longitude: ${String((position.results[0].geometry.lng).toFixed(2)).replace('.', '°')}′`;
  latitudeTranslate(LATITUTE, 'en', localStorage.getItem('lang'));
  latitudeTranslate(LONGTITUTE, 'en', localStorage.getItem('lang'));
}

export { latitudeSearchPositionBuilder, latitudePositionBuilder };
