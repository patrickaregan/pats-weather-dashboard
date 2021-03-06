// My API key for Open Weather API: 41acdc298e9f5bb9684ae3f719dae78a
// Geocoding API: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// One Call API:  https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

var searchFormEl = $("#search-form");
var cityNameEl = $(".cityName");
var weatherIcon = $(".weatherIcon");
var cityTempEl = $(".cityTemp");
var cityWindEl = $(".cityWind");
var cityHumidityEl = $(".cityHumidity");
var cityUVIndexEl = $(".cityUVIndex");
var currentDate = moment().format("l");
var forecastSectionEl = $(".forecastSection");
var pastSearches = [];
var pastSearchesEl = $(".pastSearches");

var getUnixDate = function(dateInput) {
    var result = "";
    var date = new Date(dateInput * 1000);
    result = moment(date).format("l");
    return result;
}

function loadPastSearches() {
    
    var searchArray = localStorage.getItem("weather-dashboard");
    if (!searchArray) {
        pastSearches = [];
        return false;
    } 
    pastSearches = JSON.parse(searchArray);
    pastSearches.sort();
    var htmlContent = "";
    for(var i = 0; i < pastSearches.length; i++) {
        htmlContent += "<button id='button" + i + "' class='btn btn-secondary'>" + pastSearches[i] + "</button>";
        pastSearchesEl.html(htmlContent);
    }
}

function savePastSearch() {
    localStorage.setItem("weather-dashboard",JSON.stringify(pastSearches));
}




function handleFormSubmit(event) {

    // prevent default form submit behavior
    event.preventDefault();

    // get search input values
    var searchString = $('input[name="city"]').val();

    runWeatherSearch(searchString);


    /*
    if (!searchString.trim() ) {
        alert("Please enter a city!");
    }
    var searchTokens = [];
    if (searchString.includes(",")) {
        searchTokens = searchString.trim().split(",");
    } else {
        searchTokens[0] = searchString.trim();
        searchTokens[1] = "";
    }
    var city = searchTokens[0].trim();
    var state = searchTokens[1].trim();
    var country = "";

    // get coordinates and location name
    var lattitude = 0;
    var longitude = 0;
    var location = "";
    var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&limit=1&appid=41acdc298e9f5bb9684ae3f719dae78a";
    fetch(apiURL)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                try {
                    lattitude = data[0].lat;
                    longitude = data[0].lon;
                    location = data[0].name + ", " + data[0].state;
                    console.log("Lat: " + lattitude);
                    console.log("Lon: " + longitude);
                    console.log("Loc: " + location);
                    cityNameEl.text(location + " (" + currentDate + ")");
                } catch(error) {
                    alert("Sorry, we could not find any data for that city!");
                }
                // if the coordinate lookup was OK then save the search string to local storage
                if(!pastSearches.includes(searchString)) {
                    pastSearches.push(searchString);
                }
                savePastSearch();
                // get weather data
                var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&exclude=alerts&units=imperial&lang=en&appid=41acdc298e9f5bb9684ae3f719dae78a";
                fetch(apiURL)
                .then(function(response) {
                    // request was successful
                    if (response.ok) {
                        response.json().then(function(data) {
                            console.log(data);
                            var icon = data.current.weather[0].icon;
                            var iconDesc = data.current.weather[0].description;
                            var temp = "Temp: " + data.current.temp + "&deg;" + "F";
                            var wind = "Wind: " + data.current.wind_speed + " MPH";
                            var humidity = "Humidity: " + data.current.humidity + " %";
                            var uvindex = data.current.uvi;
                            weatherIcon.html("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png' width='50px' height='50px' alt='" + iconDesc + "'>");
                            cityTempEl.html(temp);
                            cityWindEl.html(wind);
                            cityHumidityEl.html(humidity);
                            if (parseFloat(uvindex) <= 2) {
                                cityUVIndexEl.html("UV Index: <span class='bg-success colorCodedUVIndex'>" + uvindex + "</span>");
                            } else if (parseFloat(uvindex) <= 8) {
                                cityUVIndexEl.html("UV Index: <span class='bg-warning colorCodedUVIndex'>" + uvindex + "</span>");
                            } else {
                                cityUVIndexEl.html("UV Index: <span class='bg-danger colorCodedUVIndex'>" + uvindex + "</span>");
                            }
                            // future weather
                            var forecastHtml = "";
                            for(var i = 0; i < 5; i++) {
                                var forecastDate = getUnixDate(data.daily[i].dt);
                                var forecastIcon = data.daily[i].weather[0].icon;
                                var forecastIconDesc = data.daily[i].weather[0].description;
                                var forecastIconHtml = "<img src='https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png' width='25px' height='25px' alt='" + forecastIconDesc + "'>";
                                var forecastTemp = data.daily[i].temp.max + "&deg;" + "F";
                                var forecastWind = data.daily[i].wind_speed + " MPH";
                                var forecastHumidity = data.daily[i].humidity + " %";
                                forecastHtml += "<div class='forecastPanel'><p class='forecastDate'>" + forecastDate + "</p><p class='forecastIcon'>" + forecastIconHtml + "</p><p class='forecastTemp'>" + forecastTemp + "</p><p class='forecastWind'>" + forecastWind + "</p><p class='forecastHumidity'>" + forecastHumidity + "</p></div>";
                                forecastSectionEl.html(forecastHtml);
                            }
                        })
                    } else {
                        console.log('Error: Weather Data Not Found');
                    }
                })
                .catch(function(error) {
                    console.log("Unable to connect to Open Weather One Call API");
                })
                // end get weather data
            })
        } else {
            console.log('Error: City Not Found');
        }
    })
    .catch(function(error) {
        console.log("Unable to connect to Open Weather Geocoding API");
    });
    // end get coordinates and location name
    */

}


function runWeatherSearch(searchString) {

    // get search input values
    if (!searchString.trim() ) {
        alert("Please enter a city!");
    }
    var searchTokens = [];
    if (searchString.includes(",")) {
        searchTokens = searchString.trim().split(",");
    } else {
        searchTokens[0] = searchString.trim();
        searchTokens[1] = "";
    }
    var city = searchTokens[0].trim();
    var state = searchTokens[1].trim();
    var country = "";

    // get coordinates and location name
    var lattitude = 0;
    var longitude = 0;
    var location = "";
    var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&limit=1&appid=41acdc298e9f5bb9684ae3f719dae78a";
    fetch(apiURL)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                try {
                    lattitude = data[0].lat;
                    longitude = data[0].lon;
                    location = data[0].name + ", " + data[0].state;
                    console.log("Lat: " + lattitude);
                    console.log("Lon: " + longitude);
                    console.log("Loc: " + location);
                    cityNameEl.text(location + " (" + currentDate + ")");
                    // if the coordinate lookup was OK then save the search string to local storage
                    if(!pastSearches.includes(searchString)) {
                        pastSearches.push(searchString);
                    }
                    savePastSearch();
                    loadPastSearches();
                } catch(error) {
                    alert("Sorry, we could not find any data for that city!");
                }
                // get weather data
                var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&exclude=alerts&units=imperial&lang=en&appid=41acdc298e9f5bb9684ae3f719dae78a";
                fetch(apiURL)
                .then(function(response) {
                    // request was successful
                    if (response.ok) {
                        response.json().then(function(data) {
                            console.log(data);
                            var icon = data.current.weather[0].icon;
                            var iconDesc = data.current.weather[0].description;
                            var temp = "Temp: " + data.current.temp + "&deg;" + "F";
                            var wind = "Wind: " + data.current.wind_speed + " MPH";
                            var humidity = "Humidity: " + data.current.humidity + " %";
                            var uvindex = data.current.uvi;
                            weatherIcon.html("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png' width='50px' height='50px' alt='" + iconDesc + "'>");
                            cityTempEl.html(temp);
                            cityWindEl.html(wind);
                            cityHumidityEl.html(humidity);
                            if (parseFloat(uvindex) <= 2) {
                                cityUVIndexEl.html("UV Index: <span class='bg-success colorCodedUVIndex'>" + uvindex + "</span>");
                            } else if (parseFloat(uvindex) <= 8) {
                                cityUVIndexEl.html("UV Index: <span class='bg-warning colorCodedUVIndex'>" + uvindex + "</span>");
                            } else {
                                cityUVIndexEl.html("UV Index: <span class='bg-danger colorCodedUVIndex'>" + uvindex + "</span>");
                            }
                            // future weather
                            var forecastHtml = "";
                            for(var i = 0; i < 5; i++) {
                                var forecastDate = getUnixDate(data.daily[i].dt);
                                var forecastIcon = data.daily[i].weather[0].icon;
                                var forecastIconDesc = data.daily[i].weather[0].description;
                                var forecastIconHtml = "<img src='https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png' width='25px' height='25px' alt='" + forecastIconDesc + "'>";
                                var forecastTempMin = data.daily[i].temp.min;
                                var forecastTempMax = data.daily[i].temp.max;
                                var forecastTempAvg = (forecastTempMin + forecastTempMax) / 2;
                                var forecastTemp = "Temp: " + parseFloat(forecastTempAvg).toFixed(2) + "&deg;" + "F";
                                var forecastWind = "Wind: " + data.daily[i].wind_speed + " MPH";
                                var forecastHumidity = "Humidity: " + data.daily[i].humidity + " %";
                                forecastHtml += "<div class='forecastPanel'><p class='forecastDate'>" + forecastDate + "</p><p class='forecastIcon'>" + forecastIconHtml + "</p><p class='forecastTemp'>" + forecastTemp + "</p><p class='forecastWind'>" + forecastWind + "</p><p class='forecastHumidity'>" + forecastHumidity + "</p></div>";
                                forecastSectionEl.html(forecastHtml);
                            }
                        })
                    } else {
                        console.log('Error: Weather Data Not Found');
                    }
                })
                .catch(function(error) {
                    console.log("Unable to connect to Open Weather One Call API");
                })
                // end get weather data
            })
        } else {
            console.log('Error: City Not Found');
        }
    })
    .catch(function(error) {
        console.log("Unable to connect to Open Weather Geocoding API");
    });
    // end get coordinates and location name

}


searchFormEl.on("submit", handleFormSubmit);
pastSearchesEl.on("click", "button", function() {
    var searchString = $(this).text();
    console.log(searchString);
    runWeatherSearch(searchString);
});
loadPastSearches();










