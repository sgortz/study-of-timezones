// Updating the subheading with current hour, date & time
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let now = new Date();
let weekday = days[now.getDay()];
let dateMonth = now.getDate();
let month = monthName[now.getMonth()];
let hour = now.getHours();
let minutes = now.getMinutes();

if (minutes.toString().length == 1) {
  minutes = "0" + minutes;
}

let smallHeading = document.querySelector("h2");
smallHeading.innerHTML = `${weekday}, ${month} ${dateMonth}, ${hour}:${minutes}`;

function getForecast(response) {
  let unixTimestamp = response.data.current.dt;
  let timezoneOffset = response.data.timezone_offset;
  let localUnixTimestamp = unixTimestamp + timezoneOffset;
  let millisecondsTime = localUnixTimestamp * 1000;

  console.log(millisecondsTime);

  let dateElement = new Date(millisecondsTime);

  let humanDateFormat = dateElement.toLocaleTimeString();

  console.log(humanDateFormat);

  smallHeading.innerHTML = `${weekday}, ${month} ${dateMonth}, ${humanDateFormat}`;

  let apiIconResponse = response.data.current.weather[0].icon;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${apiIconResponse}@2x.png`
  );
  weatherIcon.setAttribute(
    "alt",
    `${response.data.current.weather[0].description}`
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.current.weather[0].description;

  celsiusMainTemperature = response.data.current.temp;

  let mainTemperature = document.querySelector("#temperature");
  mainTemperature.innerHTML = `${Math.round(celsiusMainTemperature)}`;
}

function getCityCoords(response) {
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let cityLatitude = response.data.coord.lat;
  let cityLongitude = response.data.coord.lon;

  let forecastapiKey = "87ea285fd528486819f9be1f3ac61b1d";
  let forecastapiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=minutely,hourly&units=metric&appid=${forecastapiKey}`;

  axios.get(forecastapiUrl).then(getForecast);
}

function search(cityName) {
  let apiKey = "4cea025489823b86da62835c695c95d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(getCityCoords);
}

function handleSearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input");

  search(searchInput.value);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let forecastapiKey = "87ea285fd528486819f9be1f3ac61b1d";
  let forecastapiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${forecastapiKey}`;

  axios.get(forecastapiUrl).then(getForecast);

  let apiKey = "4cea025489823b86da62835c695c95d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(function (response) {
    document.querySelector(
      "h1"
    ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  });
}

function handleCurrentButton(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSearch);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", handleCurrentButton);

search("New york");
