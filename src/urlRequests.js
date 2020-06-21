import {
  SEARCHFIELD, LATITUTE, seasons,
} from './const';
import { map } from './map';

async function textTranslate(text, lang1, lang2) {
  try {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${text}&lang=${lang1}-${lang2}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

async function getUserLocation() {
  try {
    const url = 'https://ipinfo.io/json?token=39802815dc37c0';
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
}

async function countryNameSearch(value) {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${value}&key=f1b03a8bc6034a2b83e965241284bcf9&pretty=1&no_annotations=1`;
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
}

async function getWeather() {
  const location = await getUserLocation();
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&lang=en&units=metric&APPID=cb58f3ad42b12935cec3ca31a36228e4`;
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
}

async function countryName() {
  const city = await getWeather();
  if (!city.message) {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${city.city.name}&key=f1b03a8bc6034a2b83e965241284bcf9&pretty=1&no_annotations=1`;
      const result = await fetch(url);
      const data = await result.json();
      return data;
    } catch (err) {
      const url = 'https://api.opencagedata.com/geocode/v1/json?q=minsk&key=f1b03a8bc6034a2b83e965241284bcf9&pretty=1&no_annotations=1';
      const result = await fetch(url);
      const data = await result.json();
      return data;
    }
  }
  if (city.message) {
    return city.message;
  }
}

async function getSearchWeather(value) {
  let url = '';
  const location = await countryNameSearch(value);
  try {
    if (location.results.length > 0) {
      if (location.results[0].components.city) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${location.results[0].components.city}, ${location.results[0].components.country_code}&lang=en&units=metric&APPID=cb58f3ad42b12935cec3ca31a36228e4`;
      }
      if (!location.results[0].components.city && location.results[0].components.county) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${location.results[0].components.county}, ${location.results[0].components.country_code}&lang=en&units=metric&APPID=cb58f3ad42b12935cec3ca31a36228e4`;
      }
      if (!location.results[0].components.city && !location.results[0].components.county) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${location.results[0].formatted}&lang=en&units=metric&APPID=cb58f3ad42b12935cec3ca31a36228e4`;
      }
    }
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (err) {
    return err.message;
  }
}

async function backgroundPicture() {
  let season = '';
  const daytime = '';
  const date = new Date();
  if (date.getMonth() > 1 && date.getMonth() < 5) {
    (LATITUTE.textContent).slice(10, 12) > 0 ? season = seasons[1] : [season] = seasons[3];
  }
  if (date.getMonth() > 4 && date.getMonth() < 8) {
    (LATITUTE.textContent).slice(10, 12) > 0 ? season = seasons[2] : [season] = seasons[0];
  }
  if (date.getMonth() > 7 && date.getMonth() < 11) {
    (LATITUTE.textContent).slice(10, 12) > 0 ? season = seasons[3] : [season] = seasons[1];
  }
  if (date.getMonth() > 10 || date.getMonth() === 0 || date.getMonth() === 1) {
    (LATITUTE.textContent).slice(10, 12) > 0 ? season = seasons[0] : [season] = seasons[2];
  }
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature,${season},${daytime}&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17`;
  try {
    const result = await fetch(url);
    const data = await result.json();
    document.getElementById('wrapper').style.backgroundImage = `url(${data.urls.regular})`;
    console.log('background-picture-filter', 'nature', season, daytime);
  } catch (err) {
    document.getElementById('wrapper').style.backgroundImage = 'url(../materials/wallpapers/wallpaper2.jpg)';
    console.log('default-background');
  }
}

async function geoPosition() {
  const location = await getWeather();
  map.flyTo({
    center: [location.city.coord.lon, location.city.coord.lat],
    speed: 2,
    curve: 1,
    essential: true,
  });
  return location;
}

async function geoSearchPosition() {
  const location = await countryNameSearch(SEARCHFIELD.value);
  map.flyTo({
    center: [location.results[0].geometry.lng, location.results[0].geometry.lat],
    speed: 2,
    curve: 1,
    essential: true,
  });
  return location;
}


export {
  textTranslate, getUserLocation, getSearchWeather,
  getWeather, geoPosition, geoSearchPosition, backgroundPicture,
  countryName, countryNameSearch,
};
