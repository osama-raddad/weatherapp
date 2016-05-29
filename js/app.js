(function($) {

  'use strict';

  var icons = {

    "clear-day" : "B",
    "clear-night" : "C",
    "rain" : "R",
    "snow" : "G",
    "sleet" : "X",
    "wind" : "S",
    "fog" : "N",
    "cloudy" : "Y",
    "partly-cloudy-day" : "H",
    "partly-cloudy-night" : "I"

  };

  var cities = {

    "frankfurt" : { coords: { latitude: 50.1109221, longitude: 8.682126700000026 } },
    "berlin" : { coords: { latitude: 52.52000659999999, longitude: 13.404953999999975 } },
    "london" : { coords: { latitude: 51.5073509, longitude: -0.12775829999998223 } },
    "new york" : { coords: { latitude: 40.7127837, longitude: -74.00594130000002 } },
    "los angeles" : { coords: { latitude: 34.0522342, longitude: -118.2436849 } },
    "tokyo" : { coords: { latitude: 35.6894875, longitude: 139.69170639999993 } },
    "current location" : {}

  };

  function loadWeather(cityCoords) {


    var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;
    var forecastURL = 'https://api.forecast.io/forecast/9c5f115423c6a7bdf61901d449355c00/' + latlng + '?units=si';

    $.ajax({
      url: forecastURL,
      jsonpCallback: 'jsonCallback',
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(json) {
        $('#current_temp').html(Math.round(json.currently.temperature) + '&#176;C');
        $('#current_icon span').attr("data-icon", icons[json.currently.icon]);
        $('#current_summary').html(json.currently.summary);
      },
      error: function(e) {
        console.log(e.message);
      }
    });

  }

  function loadCity(city) {
    $('#location').html(city);

    if(city.toLowerCase() == "current location") {

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(loadWeather, loadDefaultCity);
      } else {
        loadDefaultCity();
      }
      
    } else {
      loadWeather(cities[city.toLowerCase()]);
    }

  }

  function loadDefaultCity() {
    loadCity('Frankfurt');
  }


  $(document).ready(function() {
    loadDefaultCity();

    $('a.city').bind('click', function() {
      loadCity($(this).html());
    });

  });


})( jQuery )

