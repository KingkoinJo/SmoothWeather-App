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
  console.log(res);
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
let country = "Lagos";
apiCall(country);

function provideCity(event) {
  event.preventDefault();
  let inputForm = document.querySelector(".input-box");
  apiCall(inputForm.value);
}
searchForm.addEventListener("submit", provideCity);
