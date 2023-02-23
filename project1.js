function getWeatherData() {
    $("form").submit(function(event) {
        event.preventDefault();
        var city = $("#city").val();
        var API_KEY = "278942cc7350d2a53d3e933f351ba2bf";
        var API_URL =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=" +
            API_KEY;
        $.getJSON(API_URL, function(data) {
            var temp = Math.round(data.main.temp - 273.15);
            $("#cityName").text("City: " + data.name);
            $("#temp").text("Temperature: " + temp + "°C");

            $("#humidity").text("Humidity: " + data.main.humidity + "%");
            $("#windSpeed").text("Wind Speed: " + data.wind.speed + "m/s");
            $("#desc").text("Description: " + data.weather[0].description);
            $("#icon").html(
                "<img src='http://openweathermap.org/img/wn/" +
                data.weather[0].icon +
                "@2x.png'>"
            );
            var sunriseTime = new Date(data.sys.sunrise * 1000);
            var sunsetTime = new Date(data.sys.sunset * 1000);

            $("#sunrise").text("Sunrise: " + sunriseTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }));
            $("#sunset").text("Sunset: " + sunsetTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }));

            // show weatherData div
            $("#weatherData").show();
        });
    });
}