'use strict';

let input = document.getElementById('userCity');

let submit = document.getElementById('submit');
submit.addEventListener('click', userInputController);

function userInputController() {
	// city name by default "London"
	var div = document.getElementById('weather');
	var city = input.value;
	console.log(city);
	weatherService(city, div);
}

// @param {cityName} - input value
// @param {elem} - in that case div#weather
function weatherService(cityName, elem) {
	let api = 'https://api.openweathermap.org/data/2.5/weather?q=';
	let apiKey = '&APPID=03cfb0fcf2a70f32f32cfbb7dd39a3ec';
	let units = '&units=metric';

	// full url for request
	let fullUrl = api + cityName + units  + apiKey;
	console.log(fullUrl);

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
			renderHTML(elem, data)
			console.log(data);
		})
}

// this function is used inside promise.then
function renderHTML(elem, data) {
	elem.innerHTML = 
		`
		<div>
			<p>city name: ${ data.name }</p>
			<p>avarage temp: ${ data.main.temp } </p>
			<p> max_temp: ${ data.main.temp_max} ... min_temp: ${data.main.temp_min}</p>
		</div>
		`
}

//# sourceMappingURL=../maps/script.js.map
