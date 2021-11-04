import { convertDate } from "./utils";

//Fetching the zipcode from the API, then generating a reponse. After that, established the parameters (latitude, longitude, city, regionCode). Grabbed the new date. Ran equation that takes the currentMonth, which resulted in 10 -- referring to the currentMonth and added + 1 since it is a month behind.
fetch("https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=30097")
  .then((response) => {
    return response.json();
  })
  .then(({ latitude, longitude, city, regionCode }) => {
    let app = document.getElementById("app");
    let currentDate = new Date();
    let today = `${
      currentDate.getMonth() + 1  
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    //Displays the Weather Forecast string at the top of the header
    let header = document.createElement("h1");
    header.setAttribute("class", "header");
    header.innerHTML = `Weather Forecast for ${city}, ${regionCode}`; 
     
    //Displays the weather 
    let weatherForecast = document.createElement("div");
    weatherForecast.setAttribute("class", "weatherForecast flex-row");
    weatherForecast.setAttribute("id", "weatherForecast");

    app.append(header, weatherForecast);

    fetch(
      `https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${latitude}&longitude=-${longitude}&date=${today}`
    )
      .then((res) => {
        return res.json();
      })
      .then(({ daily }) => {
        daily.data.forEach((dailyWeather, index) => {
          if (index > 2) return;
          renderDisplayWeather(dailyWeather, index);
        });
      });
  })
  .catch((err) => {
    console.log(err);
  });

  //

function renderDisplayWeather(weatherData, index) {
  let weatherForecast = document.getElementById("weatherForecast");
  let displayWeather = document.createElement("div");
  displayWeather.setAttribute("class", "display flex-col");

  //
  let nameOfDay =
    index == 0
      ? "Today"
      : getDayName(new Date(convertDate(weatherData.time)).getDay());
  let weekDay = document.createElement("h3");
  weekDay.setAttribute("class", "display-header");
  weekDay.innerHTML = `${nameOfDay}`;
  

  let DisplayWeatherContents = document.createElement("div");
  DisplayWeatherContents.setAttribute("class", "display-contents flex-row");

  // Checking if the weather data Icon is the same as the object.
  let weatherLogo = document.createElement("img");
  if (weatherData.icon == 'cloudy'){
    weatherLogo.src = icons['cloud']
  }
  else if (weatherData.icon == 'sunny')
  {
    weatherLogo.src = icons['sun']
  }
  else if (weatherData.icon == 'rain')
  {
    weatherLogo.src = icons['rain']
  }
  else if (weatherData.icon == 'snow')
  {
    weatherLogo.src = icons['snow']
  }
  
  //Making a container for all of the weather forecast content
  let weatherContent = document.createElement("div");
  weatherContent.setAttribute("class", "display-content-info");


  // Displaying the weather conditions, making every first letter capitalized
  let weatherCondition = document.createElement("h5");
  weatherCondition.innerHTML = `${weatherData.icon.charAt(0).toUpperCase() + weatherData.icon.slice(1)}`;

  // Displaying the Temperature, using math to round
  let lowTemperature = document.createElement("span");
  lowTemperature.innerHTML = `${Math.round(weatherData.temperatureLow)}° F`;

  let highTemperature = document.createElement("span");
  highTemperature.setAttribute("class", "high-temp");
  highTemperature.innerHTML = `${Math.round(weatherData.temperatureHigh)}° / `;
 
  //Renders everything that I established above, so that it can be displayed
  displayWeather.appendChild(weekDay);
  DisplayWeatherContents.appendChild(weatherLogo);
  weatherContent.append(weatherCondition, highTemperature, lowTemperature);
  DisplayWeatherContents.appendChild(weatherContent);
  displayWeather.appendChild(DisplayWeatherContents);
  weatherForecast.appendChild(displayWeather);
}

//Setting each name to the image files in the img folder

let cloud = require("../img/cloudy.png");
let rain = require("../img/rain.png");
let snow = require("../img/snow.png");
let sun = require("../img/sunny.png");
let icons = {
  cloud,
  rain,
  snow,
  sun,
};

//If else statement calling currentDate from the api values and displaying the values,
let getDayName = (currentDate) => {
  let dayName;
  
  if (currentDate == 0){
    return dayName = 'Sunday'
  }
  else if (currentDate == 1){
    return dayName = 'Monday'
  }
  else if (currentDate == 2){
    return dayName = 'Tuesday'
  }
  else if (currentDate == 3){
    return dayName = 'Wednesday'
  }
  else if (currentDate == 4){
    return dayName = 'Thursday'
  }
  else if (currentDate == 5){
    return dayName = 'Friday'
  }
  else if (currentDate == 6){
    return dayName = 'Saturday'
  }
}



 

