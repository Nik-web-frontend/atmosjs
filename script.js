const searchInp = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');

const currentTemperature = document.getElementById('current-temperature');
const conditionText = document.getElementById('condition-text');
const feelsLike = document.getElementById('feels-like');
const lastUpdated = document.getElementById('last-updated');
const time = document.getElementById('time');
const date = document.getElementById('date');
const locat = document.getElementById('location');


let weatherData;

let temperatureUnit = 'C';

celsius.addEventListener('click', () => {
    temperatureUnit = 'C'
    console.log(temperatureUnit)
    celsius.classList.add('active-unit');
    fahrenheit.classList.remove('active-unit');
    updateWeatherUI()
})

fahrenheit.addEventListener('click', () => {
    temperatureUnit = 'F'
    console.log(temperatureUnit)
    celsius.classList.remove('active-unit');
    fahrenheit.classList.add('active-unit');
    updateWeatherUI()
})

// Fetch Data from API 

async function getWeather(city) {
    let apiKey = 'apiKey';
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)

    weatherData = await response.json();

    updateWeatherUI()
}

//  search button 

searchBtn.addEventListener('click', () => {
    getWeather(searchInp.value);
})

// Weather UI Dynamic Data

function updateWeatherUI() {
    let dateObj = new Date(weatherData.location.localtime)

    let formatTime = dateObj.toLocaleTimeString("en-US", {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })

    let day = dateObj.toLocaleDateString("en-US", {
        weekday: 'short'
    })

    let formatDate = dateObj.getDate();

    let month = dateObj.toLocaleDateString('en-US', {
        month: 'short'
    }).toUpperCase()

    let year = dateObj.getFullYear();

    const formattedDate = `${day}  |  ${formatDate} ${month} ${year}`

    console.log(weatherData.current.temp_c)
    console.log(weatherData.current.condition.text)
    console.log(weatherData.feelslike_c)
    console.log(`Last Updated ${weatherData.current.last_updated}`)
    console.log(weatherData.location.localtime)
    console.log(`${weatherData.location.name} - ${weatherData.location.country}`)

    if (temperatureUnit === 'C') {
        currentTemperature.textContent = `${weatherData.current.temp_c}° C`;
        feelsLike.textContent = `feels like ${weatherData.current.feelslike_c}° C`;
    }
    else {
        currentTemperature.textContent = `${weatherData.current.temp_f}° F`;
        feelsLike.textContent = `feels like ${weatherData.current.feelslike_f}° F`;
    }

    conditionText.textContent = weatherData.current.condition.text;
    lastUpdated.textContent = `Last Updated ${weatherData.current.last_updated}`;
    time.textContent = formatTime;
    date.textContent = formattedDate;
    locat.textContent = `${weatherData.location.name} - ${weatherData.location.country}`;
}


