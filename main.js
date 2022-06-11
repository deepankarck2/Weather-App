const api={
    key: "4689c7d2424748a2c39cf46e2c995d7d",
    baseurl: "http://api.openweathermap.org/data/2.5/"
}
 

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query){
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}

function displayResults(weather){
  console.log(weather);

  if(weather.cod !='404'){
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now)
  
    let temp = document.querySelector('.current .temp')
    temp.innerText = `${Math.round(weather.main.temp)}°c`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = `${weather.weather[0].main}`;
  
    let min_max = document.querySelector('.current .hi-low');
    min_max.innerText = `${Math.round(weather.main.temp_max)} / ${Math.round(weather.main.temp_min)}`;
  }
  else{
    let city = document.querySelector('.location .city');
    city.innerText = `Please Enter a Valid City/Country`;  
    
    let date = document.querySelector('.location .date');
    date.innerText = ``
  
    let temp = document.querySelector('.current .temp')
    temp.innerText = ``;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = ``;
  
    let min_max = document.querySelector('.current .hi-low');
    min_max.innerText = ``;
  }
  
}


function dateBuilder(now){
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getYear();

  return `${day} ${date} ${month} ${year}`


}


