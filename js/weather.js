/*!
  THIS IS THE API KEYS CONFIGURATION
  DONT TOUCH ELA!
*/
const api = {
  key: "1155e26b699f069a99290c6ee02b220a",
  base: "https://api.openweathermap.org/data/2.5/"
}


/*!
    THIS IS FOR CHECKING AND GETTING THE WEATHER RESULT FROM THE LOCALSTORAGE INCASE
    THE USER PREVIOUSLY SAVED THE WEATHER RESULT 
  */
if (localStorage && localStorage.getItem('savedWeather')) {
  weatherResponse(localStorage.getItem('savedWeather'));
}else {
  
  /*!
    THIS IS FOR COLLECTING THE INPUT SEARCHES FROM THE HTML INPUT FIELD
  */
  const search = document.querySelector('.search');
  search.addEventListener('keypress', setQuery);


  /*!
    THIS IS FOR SETTING THE KEYPRESS EVENT LISTENER TO RUN THE API REQUEST
  */
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      apiRequest(search.value);
    }
  }


  /*!
    THIS IS FOR GETTING THE WEATHER RESPONSE FOR THE INPUT FROM THE USER
  */
  function apiRequest(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      })
      .then(weatherResponse);
  }
  
}


/*!
  THIS IS FOR PASSING THE RESPONSE IN SUITABLE FORMAT TO THE HTML PAGE
*/
function weatherResponse (weather) {

  /*!
    THIS IS FOR SAVING THE WEATHER RESULT INCASE THE USER RESTART HIS BROWSER AND RELOADS THE Page
  */
  localStorage.setItem('savedWeather',weather);

  let city = document.querySelector('.city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.date');
  date.innerText = correctDate(now);

  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}


/*!
  THIS IS FOR COVERTING THE TIME FORMAT GIVEN BY THE API INTO HUMAN READABLE FORMAT
*/
function correctDate (time) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[time.getDay()];
  let date = time.getDate();
  let month = months[time.getMonth()];
  let year = time.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}