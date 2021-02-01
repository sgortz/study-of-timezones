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

let forecast = [
  "Clear",
  "Smoke",
  "Clouds",
  "Haze",
  "Mist",
  "Fog",
  "Drizzle",
  "Rain",
  "Snow",
  "Ash",
  "Dust",
  "Sand",
  "Thunderstorm",
  "Tornado",
  "Squall",
];

let colors = [
  //clear sky daylight
  "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  //clear sky nighttime -- font color whitesmoke
  "linear-gradient(to top, #09203f 0%, #537895 100%)",
  //rainy or cloudy
  "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
  //sand, Dust
  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);",
  //thunderstorm
  "linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%)",
  // Morning
  "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
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
  console.log(response);
  let apiWeatherResponse = response.data.current.weather[0].main;
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
  let colorBackground = document.querySelector(".card");
  if (apiIconResponse.includes("n")) {
    colorBackground.style.backgroundImage = colors[1];
    colorBackground.style.color = "whitesmoke";
  } else if (apiWeatherResponse === forecast[0] && hour < 12) {
    colorBackground.style.backgroundImage = colors[5];
    colorBackground.style.color = "black";
  } else if (apiWeatherResponse === forecast[0] && hour >= 12) {
    colorBackground.style.backgroundImage = colors[0];
    colorBackground.style.color = "black";
  } else if (apiWeatherResponse === forecast[(10, 11)]) {
    colorBackground.style.backgroundImage = colors[3];
    colorBackground.style.color = "black";
  } else if (apiWeatherResponse === forecast[(12, 13)]) {
    colorBackground.style.backgroundImage = colors[4];
    colorBackground.style.color = "black";
  } else {
    colorBackground.style.backgroundImage = colors[2];
    colorBackground.style.color = "black";
  }

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

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusMainTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusMainTemperature);

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSearch);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", handleCurrentButton);

let celsiusMainTemperature = null;

let fahrenheitLink = document.querySelector("#temperature-fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#temperature-celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Bemidji");
