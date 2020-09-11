
const api = {
  key: "1155e26b699f069a99290c6ee02b220a",
  base: "https://api.openweathermap.org/data/2.5/"
}


if (localStorage && localStorage.getItem('savedWeather')) {
  let storageProfileString = localStorage.getItem("savedWeather");
  console.log("String saved in LocalStorage", storageProfileString);
  let cleaned = JSON.parse(storageProfileString);
  weatherResponse(cleaned);
}


const search = document.querySelector('.search');
search.addEventListener('keypress', setQuery);


function setQuery(evt) {
  if (evt.keyCode == 13) {
    localStorage.clear();
    apiRequest(search.value);
  }
}



function apiRequest(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    })
    .then(save)
    .catch(err => alert('You did something wrong', err));
}

function save(data) {
  localStorage.setItem('savedWeather',JSON.stringify(data));
  weatherResponse(data);
}


function weatherResponse (weather) {

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


function correctDate (time) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[time.getDay()];
  let date = time.getDate();
  let month = months[time.getMonth()];
  let year = time.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}