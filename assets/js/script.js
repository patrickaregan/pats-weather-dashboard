// My API key for Open Weather API: 41acdc298e9f5bb9684ae3f719dae78a
// Geocoding API: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// One Call API:  https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

var searchFormEl = $("#search-form");
var cityNameEl = $(".cityName");
var weatherIcon = $(".weatherIcon");
var currentDate = moment().format("l");


function handleFormSubmit(event) {

    // prevent default form submit behavior
    event.preventDefault();

    // get search input values
    var searchString = $('input[name="city"]').val();
    var searchTokens = [];
    if (searchString.includes(",")) {
        searchTokens = searchString.trim().split(",");
    } else {
        searchTokens[0] = searchString.trim();
        searchTokens[1] = "";
    }
    var city = searchTokens[0].trim();
    var state = searchTokens[1].trim();
    var country = "US";

    // get coordinates and location name
    var lattitude = 0;
    var longitude = 0;
    var location = "";
    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&limit=1&appid=41acdc298e9f5bb9684ae3f719dae78a";
    fetch(apiURL)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                lattitude = data[0].lat;
                longitude = data[0].lon;
                location = data[0].name + ", " + data[0].state;
                console.log("Lat: " + lattitude);
                console.log("Lon: " + longitude);
                console.log("Loc: " + location);
                cityNameEl.text(location + " (" + currentDate + ")");

                // get weather data
                var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&exclude=alerts&units=imperial&lang=en&appid=41acdc298e9f5bb9684ae3f719dae78a";
                fetch(apiURL)
                .then(function(response) {
                    // request was successful
                    if (response.ok) {
                        response.json().then(function(data) {
                            console.log(data);
                            console.log(data.current.weather[0].icon);
                            var icon = data.current.weather[0].icon;
                            var iconDesc = data.current.weather[0].description;
                            weatherIcon.html("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png' width='50px' height='50px' alt='" + iconDesc + "'>");
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










