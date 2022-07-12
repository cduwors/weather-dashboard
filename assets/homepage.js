var cityNameEl = document.querySelector("#city-name");
var cityHighlightEl = document.querySelector("#city-highlight");
var fiveDayEl = document.querySelector("#five-day");
var cityBtnEl = document.querySelector("#cityBtn");
var rightNow = moment().format("MM-DD-YYYY)");
var myCities = [];

// if local storage exists then myCities must equal the array
// if localStorage.value;

//else myCities = [];

const getDate = () => {
	const newDate = new Date();
	const year = newDate.getFullYear();
	const month = newDate.getMonth() + 1;
	const d = newDate.getDate();

	return `${month.toString().padStart(2, "0")}/${d
		.toString()
		.padStart(2, "0")}/${year}`;
};

//format api url and get city lat & lon
function getCityInfo(cityVal) {
	var apiUrl =
		"https://api.openweathermap.org/geo/1.0/direct?q=" +
		cityVal +
		"&limit=1&appid=fb5c304891d2b1e1a743b0141bed0085";
	// console.log("test" + cityNameEl.value);

	fetch(apiUrl).then(function (response) {
		//request was successful
		if (response.ok) {
			response.json().then(function (data) {
				// console.log(data[0].lat + " " + data[0].lon);
				getWeatherInfo(data[0].lat, data[0].lon);
			});
		} else {
			alert("error - city not found");
		}
	});
}

// create span to hold city searched

function getWeatherInfo(lat, lon) {
	var weatherApiUrl =
		"https://api.openweathermap.org/data/2.5/onecall?lat=" +
		lat +
		"&lon=" +
		lon +
		"&units=imperial&exclude=hourly&appid=440127db7f142874f0884a6b08066d95";

	fetch(weatherApiUrl).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				console.log("fetch complete ->" + data);
				DisplayWeather(data);
				DisplayFiveDay(data);
			});
		} else {
			alert("lat and lon not found");
		}
	});
}

// function DisplayWeather {
function DisplayWeather(data) {
	//add city name to forecast-container > city-highlight
	var weatherIcon = document.querySelector("#weather-icon");
	weatherIcon.src =
		"http://openweathermap.org/img/wn/" +
		data.current.weather[0].icon +
		"@2x.png";

	var currentCityEl = document.querySelector("#current-city");
	currentCityEl.textContent = cityNameEl.value + " " + getDate();

	var currentTempEl = document.querySelector("#current-temp");
	currentTempEl.textContent = "Temp: " + data.current.temp + " degrees F";

	var currentWindEl = document.querySelector("#current-wind");
	currentWindEl.textContent = "Wind: " + data.current.wind_speed + " MPH";

	var currentHumEl = document.querySelector("#current-hum");
	currentHumEl.textContent = "Humidity: " + data.current.humidity + " %";

	var currentUvEl = document.querySelector("#current-uv");
	currentUvEl.textContent = "UV Index: " + data.current.uvi;

	console.log("display weather function->" + cityNameEl.value);
}

function DisplayFiveDay(data) {
	// const fiveDayForecast = [data.daily];

	for (let i = 0; i <= 4; i++) {
		var dayEl = document.querySelector("#day-" + (i + 1));

		var forecastDateEl = document.createElement("p");
		var newDate = moment(rightNow, "MM Do YYYY").add(i + 1, "d");
		forecastDateEl.textContent = newDate;

		var forecastImgEl = document.createElement("img");
		forecastImgEl.src =
			"http://openweathermap.org/img/wn/" +
			data.daily[i].weather[0].icon +
			"@2x.png";

		var forecastTempEl = document.createElement("p");
		forecastTempEl.textContent =
			"Temp: " + data.daily[i].temp.day + " degrees F";

		var forecastWindEl = document.createElement("p");
		forecastWindEl.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";

		var forecastHumEl = document.createElement("p");
		forecastHumEl.textContent = "Humidity: " + data.daily[i].humidity + " %";

		// forecastEl.textContent = getDate() + 1;
		dayEl.appendChild(forecastDateEl);
		dayEl.appendChild(forecastImgEl);
		dayEl.appendChild(forecastTempEl);
		dayEl.appendChild(forecastWindEl);
		dayEl.appendChild(forecastHumEl);
	}
}

cityBtnEl.addEventListener("click", function () {
	var cityVal = cityNameEl.value;
	getCityInfo(cityVal);
	saveCityToStorage(cityVal);
});

// saveCityToStorage(cityVal);
function saveCityToStorage(cityVal) {
	console.log("save city function ->" + cityVal);
	// pushmethod to array
	myCities.push(cityVal);
	console.log(myCities);
	localStorage.setItem("city-name", JSON.stringify(myCities));
	newCitiesButton();
}

//create a button for new search
function newCitiesButton(cityVal) {
	const savedCitiesButton = document.createElement("button");
	savedCitiesButton.className = "my-city-button";
	savedCitiesButton.innerText = cityVal;
	var placeButton = document.getElementById("cities-container");
	savedCitiesButton.appendChild(placeButton);
	console.log("button made");
}

//     <button id="[cityname]" class="savedCityBtn"></button>
