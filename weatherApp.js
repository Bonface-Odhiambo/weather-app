// DOM Elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherInfo = document.querySelector('.weather-info');
const error = document.querySelector('.error');
const dateElement = document.querySelector('.date');

// Date formatting options
const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

// Update date display
dateElement.textContent = new Date().toLocaleDateString(undefined, dateOptions);

// API Configuration
const API_KEY = '04a40b9fd97ec3a11d772613eadd03f8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Update weather display
function updateWeatherDisplay(weatherData) {
    const city = document.querySelector('.city');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.querySelector('.humidity');
    const wind = document.querySelector('.wind');
    const clouds = document.querySelector('.clouds');

    city.innerHTML = `Weather in ${weatherData.name}`;
    temperature.innerHTML = `${parseInt(weatherData.main.temp)}°C`;
    description.innerHTML = weatherData.weather[0].description;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    wind.innerHTML = `${parseInt(weatherData.wind.speed)} km/h`;
    clouds.innerHTML = `${weatherData.clouds.all}%`;
}

// Show error message
function showError() {
    weatherInfo.style.display = 'none';
    error.style.display = 'block';
    error.classList.add('fade-in');
}

// Show weather information
function showWeatherInfo() {
    error.style.display = 'none';
    weatherInfo.style.display = 'block';
    weatherInfo.classList.add('fade-in');
}

// Fetch weather data
async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.cod === '404') {
            showError();
            return;
        }

        showWeatherInfo();
        updateWeatherDisplay(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError();
    }
}

// Event Listeners
search.addEventListener('click', () => {
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value.trim();

    if (city === '') return;
    fetchWeatherData(city);
});

// Enable search with Enter key
document.querySelector('.search-box input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search.click();
    }
});