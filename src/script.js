let cityElement = document.querySelector("h1");
let inputForm = document.querySelector(".input-box");
let submitForm = document.querySelector(".submit-box");
let searchForm = document.querySelector(".search-form");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".wind-speed");
let temperatureIcon = document.querySelector(".weather-icon");
let temperatureValue = document.querySelector(".weather-digit");
let temperatureUnit = document.querySelector(".weather-unit");
let currentDate = document.querySelector(".current-date");
let weatherCondition = document.querySelector(".weather-condition");
let forecastElement = document.querySelector(".forecast");
function displayDate() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();
  let day = weekDays[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    return `${day} ${hour}:0${minute}`;
  } else {
    return `${day} ${hour}:${minute}`;
  }
}
currentDate.innerHTML = displayDate();
function updateInformation(res) {
  if (res.city !== undefined) {
    cityElement.innerHTML = res.city;
    temperatureValue.innerHTML = Math.round(res.temperature.current);
    windSpeed.innerHTML = `${res.wind.speed}km/h`;
    humidity.innerHTML = `${res.temperature.humidity}%`;
    weatherCondition.innerHTML = res.condition.description;
    temperatureIcon.innerHTML = `<img
                src=${res.condition.icon_url}
                 />`;
  } else {
    cityElement.innerHTML = "City not found";
    windSpeed.innerHTML = "--";
    humidity.innerHTML = "--";
    weatherCondition.innerHTML = "--";
    temperatureIcon.innerHTML = "--";
  }
}
function apiCall(city) {
  let apiKey = "eo8b09c8c6a0484f543ct3b837fb6a19";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then(updateInformation);
}

function formatForecastDate(date) {
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = weekDays[date.getDay()];
  return day;
}

function updateForecast(data) {
  console.log(data);
  let all = " ";
  for (i = 1; i < 6; i += 1) {
    let dailyForecastt = data.daily[i];
    let apiDay = dailyForecastt.time;
    let day = new Date(apiDay * 1000);
    let forecastDay = formatForecastDate(day);
    let maxTemp = `${Math.round(dailyForecastt.temperature.maximum)}°`;
    let minTemp = `${Math.round(dailyForecastt.temperature.minimum)}°`;
    let iconUrl2 = dailyForecastt.condition.icon_url;
    let things = `<div class="forecast-day forecast-info">${forecastDay}</div>
    <div class="forecast-icon forecast-info">  <img
                src=${iconUrl2}
                alt=""
              /></div>
    <div class="forecast-temperatures forecast-info">
    <span class="first-temp">${maxTemp}</span>
    <span class="second-temp">${minTemp}</span>
    </div>`;
    all = `${all} <div>${things}</div>`;
  }
  forecastElement.innerHTML = all;
}

function forecastApiCall(city) {
  let apiKey = "eo8b09c8c6a0484f543ct3b837fb6a19";
  let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  fetch(apiUrl2)
    .then((res) => res.json())
    .then(updateForecast);
}
function provideCity(event) {
  event.preventDefault();
  let inputForm = document.querySelector(".input-box");
  apiCall(inputForm.value);
  forecastApiCall(inputForm.value);
}

apiCall("Lagos");
forecastApiCall("Lagos");

searchForm.addEventListener("submit", provideCity);
