import {
  CITYNAME, SPEAKER, CHECKBOX, secondDayAfter, thirdDayAfter, firstDayAfter,
  dateAfterDay, dateAfterTwoDays, dateAfterThreeDays, firstDayPick,
  secondDayPick, thirdDayPick, feelsLike, wind, humidity,
  weatherAtMoment, EXTRAPARAMS, currentWeatherPicture, months,
} from '../const/const';

import { getWeather, textTranslate } from '../urlRequests/urlRequests';

const forecastTimelines = 8;

async function weatherConditionAudio(localTimezone, localDate) {
  const userTimezone = await getWeather();
  const localDateString = new Date(localDate.getTime()
  - ((userTimezone.city.timezone * 1000) - (localTimezone.city.timezone * 1000)));
  SPEAKER.text = `Weather for ${(await
  textTranslate(CITYNAME.textContent, localStorage.getItem('lang'), 'en')).text[0]} 
    for ,${localDateString.getDate()}
   ${months[localDateString.getMonth()]}. Temperature ${Math.round(localTimezone.list[0].main.temp)} degrees, 
  feels like ${localTimezone.list[0].main.feels_like} degrees, 
  wind speed ${localTimezone.list[0].wind.speed}, metres per second, 
  humidity ${localTimezone.list[0].main.humidity} %, ${localTimezone.list[0].weather[0].description}`;
  speechSynthesis.speak(SPEAKER);
}

async function nextDayForecast(firstDay, secondDay, thirdDay, forecastHours) {
  const averageAfterOneDay = firstDay / forecastHours;
  const averageAfterTwoDays = secondDay / forecastHours;
  const averageAfterThreeDays = thirdDay / forecastHours;
  if (CHECKBOX.checked === true) {
    firstDayAfter.textContent = `${Math.round(averageAfterOneDay * (9 / 5) + 32)}`;
    secondDayAfter.textContent = `${Math.round(averageAfterTwoDays * (9 / 5) + 32)}`;
    thirdDayAfter.textContent = `${Math.round(averageAfterThreeDays * (9 / 5) + 32)}`;
  }
  if (CHECKBOX.checked === false) {
    firstDayAfter.textContent = `${Math.round(averageAfterOneDay)}`;
    secondDayAfter.textContent = `${Math.round(averageAfterTwoDays)}`;
    thirdDayAfter.textContent = `${Math.round(averageAfterThreeDays)}`;
  }
}

async function loop(weatherForRequest, dateForRequest, dayFirst, daySecond, dayThird) {
  for (let i = 0; i < weatherForRequest.list.length; i += 1) {
    if (new Date(weatherForRequest.list[i].dt_txt).getDate() !== dateForRequest.getDate()) {
      if (new Date(weatherForRequest.list[i].dt_txt).getDate() === dateAfterDay.getDate()) {
        dayFirst += weatherForRequest.list[i].main.temp;
        if (weatherForRequest.list[i].sys.pod === 'd') {
          firstDayPick.src = `../materials/animated-icons/${weatherForRequest.list[i].weather[0].icon}.svg`;
        }
      }
      if (new Date(weatherForRequest.list[i].dt_txt).getDate() === dateAfterTwoDays.getDate()) {
        daySecond += weatherForRequest.list[i].main.temp;
        if (weatherForRequest.list[i].sys.pod === 'd') {
          secondDayPick.src = `../materials/animated-icons/${weatherForRequest.list[i].weather[0].icon}.svg`;
        }
      }
      if (new Date(weatherForRequest.list[i].dt_txt).getDate() === dateAfterThreeDays.getDate()) {
        dayThird += weatherForRequest.list[i].main.temp;
        if (weatherForRequest.list[i].sys.pod === 'd') {
          thirdDayPick.src = `../materials/animated-icons/${weatherForRequest.list[i].weather[0].icon}.svg`;
        }
      }
    }
  }
  nextDayForecast(dayFirst, daySecond, dayThird, forecastTimelines);
}

async function extraWeatherInformation(currentWeather) {
  currentWeatherPicture.src = `../materials/animated-icons/${currentWeather.list[0].weather[0].icon}.svg`;
  EXTRAPARAMS.textContent = `${currentWeather.list[0].weather[0].description}`;
  CHECKBOX.checked === true ? weatherAtMoment.textContent = `${Math.round(currentWeather.list[0].main.temp * (9 / 5) + 32)}`
    : weatherAtMoment.textContent = `${Math.round(currentWeather.list[0].main.temp)}`;
  feelsLike.textContent = `Feels like ${currentWeather.list[0].main.feels_like}`;
  wind.textContent = `Wind speed: ${currentWeather.list[0].wind.speed} m/s`;
  humidity.textContent = `Humidity ${currentWeather.list[0].main.humidity}%`;
}


export {
  weatherConditionAudio, nextDayForecast, loop, extraWeatherInformation,
};
