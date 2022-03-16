let now = new Date();

let time = document.querySelector(".date-time");

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

time.innerHTML = `${day} ${hours}:${minutes}`;

function displayTemperature(response) {
  let currentTemperature = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function citySearch(city) {
  let apiKey = "fdd9ef011491bdd0ac653f81ffb9ed48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function searchBar(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  citySearch(cityInput.value);
}

citySearch("Malaga");

let form = document.querySelector("#search");
form.addEventListener("submit", searchBar);
