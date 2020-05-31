import {
  weatherAtMoment, firstDayAfter, secondDayAfter, thirdDayAfter,
} from '..const/const';

function celciumTempCalculator() {
  weatherAtMoment.textContent = Math.round((5 / 9) * (Number(weatherAtMoment.textContent) - 32));
  firstDayAfter.textContent = Math.round((5 / 9) * (Number(firstDayAfter.textContent) - 32));
  secondDayAfter.textContent = Math.round((5 / 9) * (Number(secondDayAfter.textContent) - 32));
  thirdDayAfter.textContent = Math.round((5 / 9) * (Number(thirdDayAfter.textContent) - 32));
}

function farengateTempCalculator() {
  weatherAtMoment.textContent = Math.round(Number(weatherAtMoment.textContent) * (9 / 5) + 32);
  firstDayAfter.textContent = Math.round(Number(firstDayAfter.textContent) * (9 / 5) + 32);
  secondDayAfter.textContent = Math.round(Number(secondDayAfter.textContent) * (9 / 5) + 32);
  thirdDayAfter.textContent = Math.round(Number(thirdDayAfter.textContent) * (9 / 5) + 32);
}

export { celciumTempCalculator, farengateTempCalculator };
