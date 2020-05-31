import { textTranslate } from './urlRequests';
import {
  CITYNAME, firstDayAfterName, secondDayAfterName, thirdDayAfterName,
  wind, humidity, EXTRAPARAMS, PANELDATE, feelsLike,
} from './const';


async function cityNamelangChanger(string, lang1, lang2) {
  CITYNAME.textContent = (await textTranslate(string, lang1, lang2)).text[0];
}

async function daysOfTheWeekLangChanger(lang1, lang2) {
  firstDayAfterName.textContent = (await textTranslate(firstDayAfterName.textContent,
    lang1, lang2)).text[0];
  secondDayAfterName.textContent = (await textTranslate(secondDayAfterName.textContent,
    lang1, lang2)).text[0];
  thirdDayAfterName.textContent = (await textTranslate(thirdDayAfterName.textContent,
    lang1, lang2)).text[0];
  wind.textContent = (await textTranslate(wind.textContent, lang1, lang2)).text[0];
  humidity.textContent = (await textTranslate(humidity.textContent, lang1, lang2)).text[0];
  EXTRAPARAMS.textContent = (await textTranslate(EXTRAPARAMS.textContent, lang1,
    lang2)).text[0];
}

async function timeTranslate(lang1, lang2) {
  document.getElementById('month').textContent = (await textTranslate(document.getElementById('month').textContent, lang1, lang2)).text[0];
}

async function exactTimeTranslate(lang1, lang2) {
  PANELDATE.textContent = (await textTranslate(PANELDATE.textContent, lang1, lang2)).text[0];
}

async function latitudeTranslate(stringForInput, lang1, lang2) {
  stringForInput.textContent = (await textTranslate(stringForInput.textContent,
    lang1, lang2)).text[0];
}

async function placeholderTranslate(stringForInput, lang1, lang2) {
  stringForInput.placeholder = (await textTranslate(stringForInput.placeholder,
    lang1, lang2)).text[0];
}

async function feelsLikeTranslate(arg) {
  if (localStorage.getItem('lang') === 'ru') {
    feelsLike.textContent = `Ощущается, как ${arg}`;
  }
  if (localStorage.getItem('lang') === 'en') {
    feelsLike.textContent = `Feels like ${arg}`;
  }
  if (localStorage.getItem('lang') === 'be') {
    feelsLike.textContent = `Адчуваецца, як ${arg}`;
  }
}

export {
  cityNamelangChanger, feelsLikeTranslate,
  latitudeTranslate, daysOfTheWeekLangChanger, timeTranslate,
  exactTimeTranslate, placeholderTranslate
};
