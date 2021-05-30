//This is where I am creating my city list for the search button. I am taking the input data as well and I am splitting the data at each word and turning the first letter into uppercase.  

function createCityList(citySearchList) {
    $('#cityList').empty();

    var keys = Object.keys(citySearchList);
    for (var i = 0; i < keys.length; i++) {
        var cityListEntry = $('<button>');
        cityListEntry.addClass('list-group-item list-group-item-action');

        var splitStr = keys[i].toLowerCase().split(' ');
        for (var j = 0; j < splitStr.length; j++) {
            splitStr[j] =
                splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
        }
        var titleCasedCity = splitStr.join(" ");
        cityListEntry.text(titleCasedCity);

        $('#cityList').append(cityListEntry);
    }
}

//This is where I am setting all of my card functions and button functions.

$(document).ready(function () {
    var citySearchListStringified = localStorage.getItem('citySearchList');

    var citySearchList = JSON.parse(citySearchListStringified);

    if (citySearchList == null) {
        citySearchList = {};
    }

    createCityList(citySearchList);

    $('#currentWeather').hide();
    $('#forecastWeather').hide();
    $('#cityHide').hide();



    $('#searchButton').on('click', function (event) {
        event.preventDefault();
        var city = $('#cityInput')
            .val()
            .trim()
            .toLowerCase();

        if (city != ' ') {


            citySearchList[city] = true;
            localStorage.setItem('citySearchList', JSON.stringify(citySearchList));

            populateCityWeather(city, citySearchList);

            $('#currentWeather').show();
            $('#forecastWeather').show();
            $('#cityHide').show();
        }


    });

    $('#cityList').on('click', 'button', function (event) {
        event.preventDefault();
        var city = $(this).text();

        populateCityWeather(city, citySearchList);

        $('#currentWeather').show();
        $('#forecastWeather').show();
        $('#cityHide').show();

    });

})

$('#clearButton').on('click', function () {
    $('#cityList').empty();
    localStorage.clear();
})

//This is the big section where I am pulling data from the API's to populate the cards with the proper data for the users request. This section needs to be nested from what i read so that the data from the API's pulls porperly. Also, you have to have the UV seperate because that data needs to be pulled from another API. I did not undersatnd that right away. 

function populateCityWeather(city, citySearchList) {
    createCityList(citySearchList);

    var queryURL =
        'https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=' + city;

    var queryURL2 =
        'https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=' + city;

    var latitude;

    var longitude;

    $.ajax({
        url: queryURL,
        method: 'GET'
    })

        .then(function (weather) {

            var nowMoment = moment();

            var displayMoment = $('<h3>');
            $('#cityName').empty();
            $('#cityName').append(
                displayMoment.text('(' + nowMoment.format('M/D/YYYY') + ')')
            );

            var cityName = $('<h3>').text(weather.name);
            $('#cityName').prepend(cityName);

            $('#currentTemp').text('Temperature: ' + weather.main.temp + '°F');
            $('#currentHumidity').text('Humidity: ' + weather.main.humidity + '%');
            $('#currentWind').text('Wind Speed: ' + weather.wind.speed + 'MPH');

            latitude = weather.coord.lat;
            longitude = weather.coord.lon;

            var queryURL3 =
                'https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=' +
                '&lat=' +
                latitude +
                '&lon=' +
                longitude;

            $.ajax({
                url: queryURL3,
                method: 'GET'

            }).then(function (uvIndex) {
                console.log(uvIndex);

                var uvIndexDisplay = $('<button>');
                uvIndexDisplay.addClass('btn btn-danger');

                $('#currentUv').text('UV Index: ');
                $('#currentUv').append(uvIndexDisplay.text(uvIndex[0].value));

                $.ajax({
                    url: queryURL2,
                    method: 'GET'

                }).then(function (forecast) {

                    for (var i = 6; i < forecast.list.length; i += 8) {

                        var forecastDate = $('<h5>');

                        var forecastPosition = (i + 2) / 8;

                        $('#forecastDate' + forecastPosition).empty();
                        $('#forecastDate' + forecastPosition).append(
                            forecastDate.text(nowMoment.add(1, 'days').format('M/D/YYYY'))
                        );

                        var forecastIcon = $('<img>');
                        forecastIcon.attr(
                            'src',
                            'https://openweathermap.org/img/w/' +
                            forecast.list[i].weather[0].icon +
                            '.png'
                        );

                        $('#forecastIcon' + forecastPosition).empty();
                        $('#forecastIcon' + forecastPosition).append(forecastIcon);

                        console.log(forecast.list[i].weather[0].icon);

                        $('#forecastTemp' + forecastPosition).text(
                            'Temp: ' + forecast.list[i].main.temp + '°F'
                        );
                        $('#forecastHumidity' + forecastPosition).text(
                            'Humidity: ' + forecast.list[i].main.humidity + '%'
                        );
                    }
                });
            });
        });
}

