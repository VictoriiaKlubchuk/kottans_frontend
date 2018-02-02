'use strict';
function getTime(){
	let date = new Date();

	let hours = date.getHours();
	if (hours < 10) hours = '0' + hours;

	let min = date.getMinutes();
	if (min < 10) min = '0' + min;

	let sec = date.getSeconds();
	if (sec < 10) sec = '0' + sec;

	return hours + ":"+ min + ":" + sec;
}

const time = document.getElementById('current-time');

setInterval( () => {
	time.innerHTML = getTime();
}, 1000);


