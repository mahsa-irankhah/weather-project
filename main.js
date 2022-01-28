function showTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${days[currentDate.getDay()]} <br/> ${hours}:${minutes}`;
}

function displayForecast(coordinates) {
  let apiKey = "400f755361803d28237d7c1751e11b72";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let forecastUrlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(forecastUrlApi).then(displayForcastDivs);
}

function displayForcastDivs(response) {
  let days = response.data.daily;
  let forecastText = `<div class="row">`;

  days.forEach((day, index) => {
    if (index < 4) {
      forecastText =
        forecastText +
        ` <div class="col-2 forecast-day-div">
          <p class="day">${dayFormat(response.data.daily[index].dt)}</p>
            <img class="image-icon" src="http://openweathermap.org/img/wn/${
              response.data.daily[index].weather[0].icon
            }@2x.png" alt="icon" />
         <div class="forecast-temp-range">
            <span class="min">${Math.round(
              response.data.daily[index].temp.min
            )}°</span> <span class="max">${Math.round(
          response.data.daily[index].temp.max
        )}°</span>
          </div>
        </div>`;
    }
  });

  forecastText = forecastText + `</div>`;
  let forecastDiv = document.querySelector("#forecast");
  forecastDiv.innerHTML = forecastText;
}

function dayFormat(dt) {
  let forcastTime = new Date(dt * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let forecastDay = forcastTime.getDay();
  let forecastDayName = days[forecastDay];

  return forecastDayName;
}

function displayWeather(response) {
  //showing tempreture
  let realTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#main-temp");
  let weatherStatement = document.querySelector("h1");
  weatherStatement.innerHTML = `currently in <span class="city" id="city-name">${response.data.name}</span>, it's
        <span id="main-temp">${realTemp}</span>°`;

  // showing precipitation

  let realPrecipitation = response.data.main.humidity;
  let humidity = document.querySelector("#humidity-rate");
  humidity.innerHTML = realPrecipitation;

  // show wind

  let realWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = realWind;

  //show description

  let description = document.querySelector("#main-status");
  description.innerHTML = response.data.weather[0].description;

  //show icon

  let icon = document.querySelector("#main-icon");
  icon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  // showing forecast

  displayForecast(response.data.coord);
}

function positionHandler(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "400f755361803d28237d7c1751e11b72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function showCurrentTemp() {
  navigator.geolocation.getCurrentPosition(positionHandler);
}

let currentDate = new Date();
let mainDay = document.querySelector("#mainday");
mainDay.innerHTML = showTime(currentDate);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-box");
  let city = document.querySelector("#city-name");
  let cityValue = (city.innerHTML = searchBox.value);

  let apiKey = "400f755361803d28237d7c1751e11b72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
});

//show current position weather

let currentPositionButton = document.querySelector("#current-location");
currentPositionButton.addEventListener("click", showCurrentTemp);
