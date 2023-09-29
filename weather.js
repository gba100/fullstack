const API_KEY = "278942cc7350d2a53d3e933f351ba2bf";
const form = document.querySelector('.form');
const weatherContainer = document.querySelector('.weather');

const cityInput = document.querySelector('#city');
const forecastContainer = document.querySelector('.forecast');
const cityName = document.querySelector('#cityName');
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#windSpeed');
const desc = document.querySelector('#desc');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const icon = document.querySelector('#icon');
const day = document.querySelector('#day');


form.addEventListener('submit', event => {
    event.preventDefault();
    var city = cityInput.value.trim();
    const hebrewRegex = /[\u0590-\u05FF]/; // regex to check for Hebrew characters
    const language = hebrewRegex.test(city) ? 'he' : 'en'; // determine language based on input
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=${language}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const forecastData = data.list.filter((item, index) => index % 8 === 0);

            const forecastHtml = forecastData.map(day => `
        <div id="day">
          <div>${formatDate(day.dt, language)}</div>
          <div><img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"alt="${day.weather[0].description}/></div>
          <div class="temp"><p>${day.main.temp.toFixed(0)}°C</p></div>
          <div class="description">${day.weather[0].description}</div>
        </div>
      `).join('');
            document.querySelector('.forecast').innerHTML = forecastHtml;
            weatherContainer.style.display = 'block';
        })
        .catch(error => console.error(error));

    // Get current weather data
    var API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY;
    // Check if input city is in Hebrew
    if (hebrewRegex.test(city)) {
        API_URL += "&lang=he";
    }
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            var temp = Math.round(data.main.temp - 273.15);
            if (language === "he") {
                $("#cityName").text(city);
                $("#temp").text(String(temp) + "°C");
                $("#humidity").text("לחות: " + data.main.humidity + "%");
                $("#windSpeed").text(data.wind.speed + "m/s" + " :מהירות הרוח");
                $("#desc").text("תיאור" + ": " + data.weather[0].description);
                $("#sunrise").text("זריחה: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }));
                $("#sunset").text("שקיעה: " + new Date(data.sys.sunset * 1000).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }));
                $("#icon").html(
                    "<img src='http://openweathermap.org/img/wn/" +
                    data.weather[0].icon +
                    "@4x.png'>"
                );
            } else {
                $("#cityName").text(data.name);
                $("#temp").text(temp + "°C");
                $("#humidity").text("Humidity: " + data.main.humidity + "%");
                $("#windSpeed").text("Wind Speed: " + data.wind.speed + "m/s");
                $("#desc").text("Description: " + data.weather[0].description);
                $("#sunrise").text("Sunrise: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                $("#sunset").text("Sunset: " + new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                $("#icon").html("<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png'>");
            }
            // show weatherData div
            $("#day").show();
        });
});

function formatDate(timestamp, lang) {
    const date = new Date(timestamp * 1000);
    const dayOfWeek = new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(date);
    const month = new Intl.DateTimeFormat(lang, { month: 'short' }).format(date);
    const dayOfMonth = date.getDate();
    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
}

function detectLanguage(text) {
    return hebrewRegex.test(text) ? "hebrew" : "english";
}

window.addEventListener('load', function() {
    // Set default city to "Tel Aviv"
    document.getElementById("city").value = "Tel Aviv";
    // Call submit function on form
    document.getElementById("submit-btn").click();
    // Clears the search bar
    document.getElementById("city").value = "";
});



//////////**********************load screen*************************//////////// 
setTimeout(function() {
    const loadingScreen = document.querySelector('.loading');
    const spinner = document.createElement('div');
    spinner.classList.add('loading-spinner');
    loadingScreen.appendChild(spinner);

    window.addEventListener('load', function() {
        loadingScreen.classList.add('hidden');
    });

    requestAnimationFrame(function() {
        loadingScreen.classList.add('hidden');
    });

}, 700);