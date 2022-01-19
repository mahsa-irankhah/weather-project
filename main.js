
function showTime(date) {
  
  let days = [
    "sunday",
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

function displayWeather(response) {
  //showing tempreture
console.log(response.data.name)
  let realTemp = Math.round(response.data.main.temp)
  let temperature = document.querySelector("#main-temp");
  let weatherStatement = document.querySelector("h1")
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
mainDay.innerHTML = showTime(currentDate)



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-box");
  let city = document.querySelector("#city-name");
  let cityValue = city.innerHTML = searchBox.value;

  let apiKey = "400f755361803d28237d7c1751e11b72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);


});




  //show current position weather
  
  let currentPositionButton = document.querySelector("#current-location");
  currentPositionButton.addEventListener("click", showCurrentTemp);

