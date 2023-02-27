const API_KEY = "278942cc7350d2a53d3e933f351ba2bf";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=" + API_KEY;

const form = document.querySelector('.form');
const weatherContainer = document.querySelector('.weather');

form.addEventListener('submit', event => {
    event.preventDefault();

    let city = document.querySelector('#city').value.trim(); // remove leading/trailing spaces
    const hebrewRegex = /[\u0590-\u05FF]/; // regex to check for Hebrew characters

    const language = hebrewRegex.test(city) ? 'he' : 'en'; // determine language based on input

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=${language}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const forecastData = data.list.filter((item, index) => index % 8 === 0);

            const forecastHtml = forecastData.map(day => `
        <div class="day">
          <div>${formatDate(day.dt, language)}</div>
          <div><img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"alt="${day.weather[0].description}" style="width: 80px; height: 80px;" /></div>
          <div class="temp">${day.main.temp.toFixed(0)}°C</div>
          <div class="description">${day.weather[0].description}</div>
        </div>
      `).join('');

            document.querySelector('.forecast').innerHTML = forecastHtml;

            weatherContainer.style.display = 'block';
        })
        .catch(error => console.error(error));
});

function formatDate(timestamp, lang) {
    const date = new Date(timestamp * 1000);
    const dayOfWeek = new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(date);
    const month = new Intl.DateTimeFormat(lang, { month: 'short' }).format(date);
    const dayOfMonth = date.getDate();
    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
}



function getWeatherData() {
    $("form").submit(function(event) {
        event.preventDefault();
        var city = $("#city").val().trim(); // remove whitespace from the beginning and end of the city string
        var API_KEY = "278942cc7350d2a53d3e933f351ba2bf";
        var API_URL =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=" +
            API_KEY;
        // Check if input city is in Hebrew
        if (/[\u0590-\u05FF]/.test(city)) {
            API_URL += "&lang=he";
        }
        $.getJSON(API_URL, function(data) {
            var temp = Math.round(data.main.temp - 273.15);
            var language = detectLanguage(city);
            if (language === "hebrew") {
                $("#cityName").text("עיר" + ": " + city);
                $("#temp").text(String(temp) + "°C" + " : טמפרטורה");
                $("#humidity").text("לחות: " + data.main.humidity + "%");
                $("#windSpeed").text(data.wind.speed + "m/s" + " :מהירות הרוח");
                $("#desc").text("תיאור" + ": " + data.weather[0].description);
                $("#sunrise").text("זריחה: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }));
                $("#sunset").text("שקיעה: " + new Date(data.sys.sunset * 1000).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }));
                $("#icon").html(
                    "<img src='http://openweathermap.org/img/wn/" +
                    data.weather[0].icon +
                    "@2x.png'>"
                );
            } else {
                $("#cityName").text("City: " + data.name);
                $("#temp").text("Temperature: " + temp + "°C");
                $("#humidity").text("Humidity: " + data.main.humidity + "%");
                $("#windSpeed").text("Wind Speed: " + data.wind.speed + "m/s");
                $("#desc").text("Description: " + data.weather[0].description);
                $("#sunrise").text("Sunrise: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                $("#sunset").text("Sunset: " + new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                $("#icon").html(
                    "<img src='http://openweathermap.org/img/wn/" +
                    data.weather[0].icon +
                    "@2x.png'>"
                );
            }
            // show weatherData div
            $("#weatherData").show();
        });
    });
}

function detectLanguage(text) {
    var hebrewChars = /[\u0590-\u05FF]/;
    for (var i = 0; i < text.length; i++) {
        if (hebrewChars.test(text.charAt(i))) {
            return "hebrew";
        }
    }
    return "english";
}