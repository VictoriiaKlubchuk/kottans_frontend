'use strict';

// get some info from 
let input = document.getElementById('userCity');
let submit = document.getElementById('submit');
submit.addEventListener('click', getValue);

function getValue() {
	// city name by default "London"
	// In this part of code I got full name of URL
	// Now it is just with Celsium not Farengate

	// our container
	var div = document.getElementById('weather');

	// use api openweather.org to compile URL + some parametrs
	var city = input.value;
	var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
	var apiKey = '&APPID=03cfb0fcf2a70f32f32cfbb7dd39a3ec';
	let units = '&units=metric';

	// full url for request
	let fullUrl = api + city + units  + apiKey;

	// use fetch for getting respond from API
	// with city form Input
	let promise = fetch(fullUrl, {type:'cors'});

	promise
		.then((response)=>{
			return response.json();
			}, (err)=> {
				console.log(err);
				throw err;
			})
		.then((json)=>{
			let data = json;

			// print data to HTML
			div.innerHTML = 
			`
			<div>
			<p>city name: ${ data.name }</p>
			<p>avarage temp: ${ data.main.temp } </p>
			<p> max_temp: ${ data.main.temp_max} ... min temp: ${data.main.temp_min}</p>
			</div>
			`
			console.log(data);
		})
}

