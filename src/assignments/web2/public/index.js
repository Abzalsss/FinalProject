const weatherApiKey = '65bf37dd2ddc0b4f7f50b73844351379'; // OpenWeather API
const exchangeApiKey = '6dce7e49223e51d417044298'; // Exchange Rate API
const timeZoneApiKey = '3OZXFHEMPBRJ'; // Ваш API ключ для TimeZoneDB
let map, marker;

document.getElementById('get-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    fetchWeatherByCity(city);
});

function fetchWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const temperature = `<span>${data.main.temp}°C</span>`;
            const feelsLike = `<span>${data.main.feels_like}°C</span>`;
            const description = data.weather[0].description;
            const humidity = `<span>${data.main.humidity}%</span>`;
            const pressure = `<span >${data.main.pressure} гПа</span>`;
            const windSpeed = `<span>${data.wind.speed} м/с</span>`;
            const weatherInfo = `   <h2>Current weather in ${data.name}, ${data.sys.country}</h2>
                                    <p>Temperature: ${temperature}</p>
                                    <p>Feels like: ${feelsLike}</p>
                                    <p>Description: ${description}</p>
                                    <p>Humidity: ${humidity}</p>
                                    <p>Pressure: ${pressure}</p>
                                    <p>Wind speed: ${windSpeed}</p>
                                    <p>Coordinates: (${data.coord.lat}, ${data.coord.lon})</p>
                                    <p>Rain volume: ${data.rain ? data.rain['1h'] : 0} mm</p>   `;

            document.getElementById('weather-info').innerHTML = weatherInfo;
            updateMap(data.coord.lat, data.coord.lon);
            fetchTimeZone(data.coord.lat, data.coord.lon); // Добавляем вызов Time Zone API
        })
        .catch(error => {
            document.getElementById('weather-info').innerHTML = '<p>Ошибка при получении погоды.</p>';
        });
}

function updateMap(lat, lon) {
    if (!map) {
        map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    } else {
        map.setView([lat, lon], 13);
    }

    if (marker) {
        marker.setLatLng([lat, lon]);
    } else {
        marker = L.marker([lat, lon]).addTo(map);
    }
}

// Fetch Time Zone Info
function fetchTimeZone(lat, lon) {
    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneApiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
    
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const timeZoneInfo = `<h3>Часовой пояс: ${data.zoneName}</h3>
                                  <p>Текущее время: ${data.formatted}</p>`;
            document.getElementById('weather-info').innerHTML += timeZoneInfo;
        })
        .catch(error => {
            console.error('Ошибка при запросе часового пояса:', error);
            document.getElementById('weather-info').innerHTML += '<p>Ошибка при получении часового пояса.</p>';
        });
}





fetch(`https://v6.exchangerate-api.com/v6/${exchangeApiKey}/latest/USD`)
    .then(response => response.json())
    .then(exchangeData => {
        const kztRate = exchangeData.conversion_rates.KZT;
        const exchangeHtml = `<h3>Курс доллара к тенге: <span">${kztRate} KZT</span></h3>`;
        document.getElementById('exchange-rate-info').innerHTML = exchangeHtml;
    })
    .catch(error => {
        document.getElementById('exchange-rate-info').innerHTML = '<p>Ошибка при получении курса обмена.</p>';
    });
// Initial map load
updateMap(48.0196, 66.9237);
