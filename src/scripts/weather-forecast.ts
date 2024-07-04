import { DEFAULT_CITY } from "../config";
import {
  getForecastByCityName,
  getForecastByCoordinates,
} from "../services/weatherService";

async function updateWeatherInfo(cityName: string) {
  try {
    const weather = await getForecastByCityName(cityName);
    updateWeatherDisplay(weather);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function updateWeatherDisplay(weather: any) {
  const cityElement = document.getElementById("city");
  const tempElement = document.getElementById("temperature");
  const feelsLikeElement = document.getElementById("feels-like");
  const humidityElement = document.getElementById("humidity");
  const windElement = document.getElementById("wind");
  const pressureElement = document.getElementById("pressure");
  const sunsetElement = document.getElementById("sunset");
  const coordinatesElement = document.getElementById("coordinates");

  if (cityElement) cityElement.textContent = weather.name;
  if (tempElement)
    tempElement.textContent = `${Math.round(weather.main.temp)}°C`;
  if (feelsLikeElement)
    feelsLikeElement.textContent = `${Math.round(weather.main.feels_like)}°C`;
  if (humidityElement)
    humidityElement.textContent = `${weather.main.humidity}%`;
  if (windElement) windElement.textContent = `${weather.wind.speed} м/с`;
  if (pressureElement)
    pressureElement.textContent = `${weather.main.pressure} гПа`;
  if (sunsetElement) {
    const sunsetTime = new Date(weather.sys.sunset * 1000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );
    sunsetElement.textContent = sunsetTime;
  }

  if (coordinatesElement) {
    const { lat, lon } = weather.coord;
    coordinatesElement.textContent = `${lat}, ${lon}`;
  }

  localStorage.setItem("city", weather.name);
}

async function fallbackToDefaultCity() {
  try {
    const weather = await getForecastByCityName(DEFAULT_CITY);
    updateWeatherInfo(weather.name ?? DEFAULT_CITY);
  } catch {}
}

function initWeather() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weather = await getForecastByCoordinates(latitude, longitude);
          updateWeatherInfo(weather.name ?? DEFAULT_CITY);
        } catch (error) {
          fallbackToDefaultCity();
        }
      },
      () => {
        fallbackToDefaultCity();
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    fallbackToDefaultCity();
  }
}

const storedCity = localStorage.getItem("city") || DEFAULT_CITY;
updateWeatherInfo(storedCity);
window.updateWeatherInfo = updateWeatherInfo;

initWeather();
