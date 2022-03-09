let now = new Date();

let date = document.querySelector(".date-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

date.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-box");
  let apiKey = "fdd9ef011491bdd0ac653f81ffb9ed48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = `${cityInput.value}`;
  axios.get(apiUrl).then(cityTemperature);
}

function cityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector(".current-temperature");
  let descriptionElement = document.querySelector("#weather-description");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  temperatureDisplay.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);
