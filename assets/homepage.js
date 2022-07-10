var cityNameEl = document.querySelector("#city-name");
var cityHighlightEl = document.querySelector("#city-highlight");
var fiveDayEl = "#5-day";

//grab the city name from the url query string
console.log("linked");
//format api url
var getCityInfo = function () {
	var apiUrl =
		// "https://api.openweathermap.org/geo/1.0/direct?q=" +
		// cityNameEl +
		// "&limit=1&appid=fb5c304891d2b1e1a743b0141bed0085";
		"https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=fb5c304891d2b1e1a743b0141bed0085";
	fetch(apiUrl).then(function (response) {
		//request was successful
		if (response.ok) {
			response.json().then(function (data) {
				console.log(data);
			});
		} else {
			alert("error - city not found");
		}
	});
};

//create span to hold city searched

getCityInfo();

var getWeatherInfo = function () {
	var weatherApiUrl =
		"https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=440127db7f142874f0884a6b08066d95";

	fetch(weatherApiUrl).then(function (response) {
		response.json().then(function (data) {
			console.log(data);
		});
	});
};
getWeatherInfo();

//append to cities-container
