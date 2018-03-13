'use strict';
const domElements = {
  input: document.getElementById('userCity'),
  submit: document.getElementById('submit'),
  favorite: document.getElementById('favorite'),
  today: document.getElementById('today'),
  week: document.getElementById('week'),
  wrapper: document.getElementsByClassName('wrapper')
}

const api = {
  apiUrl: 'https://api.weatherbit.io/v2.0/forecast/daily?city=',
  apiKey: '&key=d838138fbd3449ffa742c37a9b3f480e',
  days: '&days=7',
  units: '&units=m'
}

// does render HTML for our responce
function getWeather() {
  let city = domElements.input.value;
  weatherService(city, domElements.today)
    .then( (json) => {
      var data = json;
      // print data to HTML

      renderHTMLToday(domElements.today, data);
      renderHTMLWeek(domElements.week, data);
      domElements.wrapper[0].classList.add("active");
      console.log(data);
    })
}


// send to server request, get response
function weatherService(city) {
  let cityName = city;
  let fullUrl = api.apiUrl + cityName + api.apiKey + api.days;
  let promise = fetch(fullUrl, {type:'cors'})
    .then((response)=>{
      return response.json();
      }, (err)=> {
        console.log(err);
        throw err;
    });
  return promise; 
}

var weatherIcon = {
  a01d: 'wi-day-fog'
}

// suported function for rendering  HTML and set it in function getWeather();
function renderHTMLToday(elem, data) {
  var avarageTemp = Math.round(data.data[0].temp);
  var icon = data.data[0].weather.icon;
  
  var day = new Date(data.data[0].datetime);
  var weekday = (function () {
    var d = day.getDay();
    var w = ['sunday', 'monday', 'tuesday', 'wednesday', 'thurtsday', 'friday', 'saturday'];
    return w[d];
  })();

  elem.innerHTML = 
    `
    <div class="today">
      <h1 class="title">${ data.city_name }</h1>
      <h2 class="day">${ weekday }</h2> 
      <p><time>${ data.data[0].datetime }</time></p>
      <img src="../img/${icon}.png" alt="">
      <p> ${ avarageTemp } C&#176;</p>
      <i class="wi wi-day-snow"></i>
      <p> wind speed: ${ data.data[0].wind_spd} m/s</p>
    </div>
    `
}

// suported function to do render HTML and set it in function getWeather();
function renderHTMLWeek(elem, data) {
  elem.innerHTML ='';
  
  for (var i = 1; i < 7; i++) {
    var avarageTemp = Math.round(data.data[i].temp);
    var day = new Date(data.data[i].datetime);
    var weekday = (function () {
      var d = day.getDay();
      var w = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      return w[d];
    })();
    var icon = data.data[i].weather.icon;
    console.log( i, icon);

    elem.innerHTML +=
    `
    <div class="weekday">
      <h2 class="day">${ weekday }</h2>
      <img src="../img/${icon}.png" alt=''>
      <p>${ avarageTemp } C&#176;</p>
      <p> wind ${ data.data[i].wind_spd} m/s</p>
    </div>
    `
  }
}

// event listener for the form
domElements.submit.addEventListener('click', searchEvent);
domElements.favorite.addEventListener('click', showFavorite);

function searchEvent(e){
  e.preventDefault();
  getWeather();//start our main function
}

// Next functions are in a progress and not finished
// function for local storage
var storageValue = {};
function showFavorite(e){
  e.preventDefault();
  getLocalStorage();
  var city = domElements.input.value
  storageValue[city] = city;
  
  setLocalStorage();
  console.log('1', storageValue);
}

function setLocalStorage(){
  try {
    let city = domElements.input.value;
    let cityLocalStorage = JSON.stringify(storageValue);
    localStorage.setItem('favorite', cityLocalStorage);
    console.log('2', cityLocalStorage);
  } catch(e) {
    console.log(e);
  }
}

function getLocalStorage() {
  try {
    var fromLocalStorage = localStorage.getItem('favorite');
    var fromCityLocalStorage = JSON.parse(fromLocalStorage);
    // localStorage.clear();
    console.log('3', fromCityLocalStorage);
  } catch(e) {
    console.log(e);
  }
}

// history API
function getHistory(){

}
