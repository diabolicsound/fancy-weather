import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './style.css';
import { map, marker } from './map';
import {
  CHECKBOX, ENGLISHLANG, RUSSIANLANG, BELARUSSIANLANG, BACKGROUNDCHANGE, LANGBUTTON,
  MICRO, firstDayAfterName, secondDayAfterName,
  thirdDayAfterName, PANELDATE, CELCIUM, FARENGATE, SPEAKER, SPEAKERICON,
  CITYNAME, SEARCHFIELD, LONGTITUTE, LATITUTE, months, days, SEARCHBUTTON,
} from './const';
import { celciumTempCalculator, farengateTempCalculator } from './temperature';
import { weatherConditionAudio, loop, extraWeatherInformation } from './weatherCondition';
import {
  textTranslate, getSearchWeather, getWeather, backgroundPicture,
  countryName, countryNameSearch,
} from './urlRequests';
import {
  cityNamelangChanger, feelsLikeTranslate, latitudeTranslate, daysOfTheWeekLangChanger,
  timeTranslate, placeholderTranslate
} from './translation';
import { latitudeSearchPositionBuilder, latitudePositionBuilder } from './coordinates';

let oneDayAfter = 0;
let twoDaysAfter = 0;
let threeDaysAfter = 0;
let requests = 0;
let valueForTime = '';



if (localStorage.getItem('checked') === 'true') {
  CHECKBOX.checked = true;
  FARENGATE.style.backgroundColor = 'blue';
  CELCIUM.style.backgroundColor = '';
}

if (localStorage.getItem('checked') === 'false') {
  CHECKBOX.checked = false;
  FARENGATE.style.backgroundColor = '';
  CELCIUM.style.backgroundColor = 'blue';
}

if (!localStorage.getItem('lang')) {
  localStorage.setItem('lang', 'en');
}

LANGBUTTON.textContent = localStorage.getItem('lang').toUpperCase();

async function weatherCondition() {
  SPEAKER.lang = 'en';
  const date = new Date();
  let locationTimezone = '';
  if (requests === 0) {
    locationTimezone = await getWeather();
  }
  if (requests > 0) {
    locationTimezone = await getSearchWeather(SEARCHFIELD.value);
  }
  await weatherConditionAudio(locationTimezone, date);
}

async function currentWeather(func) {
  const date = new Date();
  oneDayAfter = 0;
  twoDaysAfter = 0;
  threeDaysAfter = 0;
  await loop(func, date, oneDayAfter, twoDaysAfter, threeDaysAfter);
  firstDayAfterName.textContent = `${days[date.getDay() + 1]}`;
  secondDayAfterName.textContent = `${days[date.getDay() + 2]}`;
  thirdDayAfterName.textContent = `${days[date.getDay() + 3]}`;
  extraWeatherInformation(func);
  await feelsLikeTranslate(func.list[0].main.feels_like);
  await daysOfTheWeekLangChanger('en', localStorage.getItem('lang'));
}

async function dateViewerSearch() {
  let locationTimezone = '';
  if (requests === 0) {
    locationTimezone = await getWeather();
  }
  if (requests > 0) {
    locationTimezone = await getSearchWeather(valueForTime);
  }
  const userTimezone = await getWeather();
  const date = new Date();
  const localDateString = String(new Date(date.getTime()
  - ((userTimezone.city.timezone * 1000) - (locationTimezone.city.timezone * 1000))));
  const modString = localDateString.slice(0, 25).replace(localDateString.substr(3, 4), ` ${date.getDate()}`);
  const preFinalString = (modString.replace(modString.substr(4, 2), ''));
  const finalString = preFinalString.replace(preFinalString.substr(8, 4), months[date.getMonth()]);
  PANELDATE.textContent = `${finalString.slice(11)}`;
}

async function monthsViewer() {
  let locationTimezone = '';
  if (requests === 0) {
    locationTimezone = await getWeather();
  }
  if (requests > 0) {
    locationTimezone = await getSearchWeather(valueForTime);
  }
  const userTimezone = await getWeather();
  const date = new Date();
  const localDateString = String(new Date(date.getTime()
  - ((userTimezone.city.timezone * 1000) - (locationTimezone.city.timezone * 1000))));
  const modString = localDateString.slice(0, 25).replace(localDateString.substr(3, 4), ` ${date.getDate()}`);
  const preFinalString = (modString.replace(modString.substr(4, 2), ''));
  const finalString = preFinalString.replace(preFinalString.substr(8, 4), months[date.getMonth()]);
  document.getElementById('month').textContent = finalString.slice(0, 12);
  await timeTranslate('en', localStorage.getItem('lang'));
}

function loading() {
  document.getElementById('loader').classList.remove('hidden');
  document.getElementById('current-weather').style.opacity = '0';
  document.getElementById('right-side').style.opacity = '0';
  document.getElementById('coordinate').style.opacity = '0';
}

function loadingFinished() {
  document.getElementById('right-side').style.opacity = '1';
  document.getElementById('current-weather').style.opacity = '1';
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('coordinate').style.opacity = '1';
}

async function pageBuild() {
  loading()
  const futureWeather = await getWeather();
  if (!futureWeather.message && (await countryName()).results.length > 0) {
    const placeType = (await countryName()).results[0].components._type;
    const cityNameTranslate = (await countryName()).results[0].components[`${placeType}`];
    const countryNameTranslate = (await countryName()).results[0].components.country;
    const wholeNameTranslate = `${cityNameTranslate}, ${countryNameTranslate}`;
    const cityCountry = (await textTranslate(wholeNameTranslate, 'ru', 'en')).text[0];
    await cityNamelangChanger(cityCountry, 'en', localStorage.getItem('lang'));
    await latitudePositionBuilder();
    await currentWeather(futureWeather);
    await dateViewerSearch();
    await monthsViewer();
    await backgroundPicture();
  }
  if (futureWeather.message) {
    SEARCHFIELD.value = `${futureWeather.message}. Try again`;
  }
  loadingFinished();
}


async function pageBuildSearch() {
  loading()
  const futureWeather = await getSearchWeather(SEARCHFIELD.value);
  if (!futureWeather.message && (await countryNameSearch(SEARCHFIELD.value)).results.length > 0) {
    const placeType = (await countryNameSearch(SEARCHFIELD.value)).results[0].components._type;
    const cityNameTranslate = (await countryNameSearch(SEARCHFIELD.value)).results[0].components[`${placeType}`];
    const countryNameTranslate = (await
    countryNameSearch(SEARCHFIELD.value)).results[0].components.country;
    const wholeNameTranslate = `${cityNameTranslate}, ${countryNameTranslate}`;
    const cityCountry = (await textTranslate(wholeNameTranslate, 'ru', 'en')).text[0];
    await cityNamelangChanger(cityCountry, 'en', localStorage.getItem('lang'));
    await latitudeSearchPositionBuilder();
    await currentWeather(futureWeather);
    await dateViewerSearch();
    await monthsViewer();
    await backgroundPicture();
  }
  if ((await countryNameSearch(SEARCHFIELD.value)).results.length === 0) {
    SEARCHFIELD.value = 'City not found. Try again';
  }
  if (futureWeather.message) {
    SEARCHFIELD.value = `${futureWeather.message}. Try again`;
  }
  loadingFinished();
}

function speechRecorder() {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    MICRO.style.backgroundColor = 'green';
    recognition.lang = localStorage.getItem('lang');
    recognition.onresult = async function voiceRequest(event) {
      const result = event.results[0];
      if (result[0].transcript !== 'quieter' && result[0].transcript !== 'forecast' && result[0].transcript !== 'weather' && result[0].transcript !== 'louder') {
        SEARCHFIELD.value = result[0].transcript;
        pageBuildSearch();
      }
      if (result[0].transcript === 'forecast' || result[0].transcript === 'weather') {
        await weatherCondition();
        SEARCHFIELD.value = '';
      }
      if (result[0].transcript === 'quieter') {
        SPEAKER.volume -= 1;
      }
      if (result[0].transcript === 'louder') {
        SPEAKER.volume += 1;
      }
    };
    recognition.onend = function voiceRequestEnd() {
      MICRO.style.backgroundColor = '';
    };
    recognition.start();
  }
}

CELCIUM.addEventListener('click', () => {
  if (CHECKBOX.checked === true) {
    celciumTempCalculator();
  }
  CHECKBOX.checked = false;
  FARENGATE.style.backgroundColor = '';
  CELCIUM.style.backgroundColor = 'blue';
  localStorage.setItem('checked', 'false');
});

FARENGATE.addEventListener('click', () => {
  if (CHECKBOX.checked === false) {
    farengateTempCalculator();
  }
  CHECKBOX.checked = true;
  FARENGATE.style.backgroundColor = 'blue';
  CELCIUM.style.backgroundColor = '';
  localStorage.setItem('checked', 'true');
});

SEARCHBUTTON.addEventListener('click', (event) => {
  event.preventDefault();
  pageBuildSearch();
  valueForTime = SEARCHFIELD.value;
  requests += 1;
});

SPEAKERICON.addEventListener('click', async () => {
  await weatherCondition();
});

ENGLISHLANG.addEventListener('click', async () => {
  await cityNamelangChanger(CITYNAME.textContent, localStorage.getItem('lang'), 'en');
  await latitudeTranslate(LATITUTE, localStorage.getItem('lang'), 'en');
  await latitudeTranslate(LONGTITUTE, localStorage.getItem('lang'), 'en');
  await daysOfTheWeekLangChanger(localStorage.getItem('lang'), 'en');
  await timeTranslate(localStorage.getItem('lang'), 'en');
  localStorage.setItem('lang', 'en');
  LANGBUTTON.textContent = localStorage.getItem('lang').toUpperCase();
  await feelsLikeTranslate((await getWeather()).list[0].main.feels_like);
});

RUSSIANLANG.addEventListener('click', async () => {
  await cityNamelangChanger(CITYNAME.textContent, localStorage.getItem('lang'), 'ru');
  await latitudeTranslate(LATITUTE, localStorage.getItem('lang'), 'ru');
  await latitudeTranslate(LONGTITUTE, localStorage.getItem('lang'), 'ru');
  await daysOfTheWeekLangChanger(localStorage.getItem('lang'), 'ru');
  await timeTranslate(localStorage.getItem('lang'), 'ru');
  localStorage.setItem('lang', 'ru');
  LANGBUTTON.textContent = localStorage.getItem('lang').toUpperCase();
  await feelsLikeTranslate((await getWeather()).list[0].main.feels_like);
});

BELARUSSIANLANG.addEventListener('click', async () => {
  await cityNamelangChanger(CITYNAME.textContent, localStorage.getItem('lang'), 'be');
  await latitudeTranslate(LATITUTE, localStorage.getItem('lang'), 'be');
  await latitudeTranslate(LONGTITUTE, localStorage.getItem('lang'), 'be');
  await daysOfTheWeekLangChanger(localStorage.getItem('lang'), 'be');
  await timeTranslate(localStorage.getItem('lang'), 'be');
  localStorage.setItem('lang', 'be');
  LANGBUTTON.textContent = localStorage.getItem('lang').toUpperCase();
  await feelsLikeTranslate((await getWeather()).list[0].main.feels_like);
});

MICRO.addEventListener('click', () => {
  speechRecorder();
});

BACKGROUNDCHANGE.addEventListener('click', async () => {
  await backgroundPicture();
});


setInterval((dateViewerSearch), 980);

pageBuild();
