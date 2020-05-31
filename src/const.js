const CHECKBOX = document.getElementById('checkbox');
const ENGLISHLANG = document.getElementById('english');
const RUSSIANLANG = document.getElementById('russian');
const BELARUSSIANLANG = document.getElementById('belarussian');
const LANGBUTTON = document.getElementById('lang-button');
const MICRO = document.getElementById('micro');
const BACKGROUNDCHANGE = document.getElementById('background-change');

const weatherAtMoment = document.getElementById('weather-now');
const extraWeatherParams = document.getElementById('extra-weather-params');
const feelsLike = document.getElementById('feels-like');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const firstDayAfter = document.getElementById('first-day');
const secondDayAfter = document.getElementById('second-day');
const thirdDayAfter = document.getElementById('third-day');
const firstDayAfterName = document.getElementById('first-day-name');
const secondDayAfterName = document.getElementById('second-day-name');
const thirdDayAfterName = document.getElementById('third-day-name');
const currentWeatherPicture = document.getElementById('current-weather-picture');
const currentWeatherElement = document.getElementById('current-weather');
const firstDayPick = document.getElementById('first-day-pick');
const secondDayPick = document.getElementById('second-day-pick');
const thirdDayPick = document.getElementById('third-day-pick');
const currentDate = new Date();
const dateAfterDay = new Date(currentDate.getFullYear(), currentDate.getMonth(),
  currentDate.getDate() + 1);
const dateAfterTwoDays = new Date(currentDate.getFullYear(), currentDate.getMonth(),
  currentDate.getDate() + 2);
const dateAfterThreeDays = new Date(currentDate.getFullYear(), currentDate.getMonth(),
  currentDate.getDate() + 3);
const EXTRAPARAMS = document.getElementById('overcast');
const PANELDATE = document.getElementById('date');
const CELCIUM = document.getElementById('temp-c');
const FARENGATE = document.getElementById('temp-f');
const SPEAKER = new SpeechSynthesisUtterance();
const SPEAKERICON = document.getElementById('speaker');
const CITYNAME = document.getElementById('city-name');
const SEARCHFIELD = document.getElementById('search-field');
const LONGTITUTE = document.getElementById('longtitute');
const LATITUTE = document.getElementById('langtitute');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const seasons = ['Winter', 'Spring', 'Summer', 'Autumn', 'Winter', 'Spring', 'Summer', 'Autumn'];
const SEARCHBUTTON = document.getElementById('search-button');
const MONTH = document.getElementById('month');


export {
  CHECKBOX, ENGLISHLANG, RUSSIANLANG, BELARUSSIANLANG,
  BACKGROUNDCHANGE, LANGBUTTON,
  MICRO, weatherAtMoment, extraWeatherParams, feelsLike, wind, humidity,
  firstDayAfter, secondDayAfter, thirdDayAfter, firstDayAfterName, firstDayPick, secondDayAfterName,
  secondDayPick, thirdDayAfterName, thirdDayPick, currentWeatherElement,
  currentWeatherPicture, dateAfterDay,
  dateAfterTwoDays, dateAfterThreeDays, EXTRAPARAMS, PANELDATE, CELCIUM,
  FARENGATE, SPEAKER, SPEAKERICON, CITYNAME,
  SEARCHFIELD, LONGTITUTE, LATITUTE, months, days, seasons, SEARCHBUTTON, MONTH,
};
