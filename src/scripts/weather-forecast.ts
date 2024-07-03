import { DEFAULT_CITY } from "../config";
import {
	getForecastByCityName,
	getForecastByCoordinates,
} from "../services/weatherService";

export function updateWeatherInfo(cityName: string, temp: number) {
	const cityElement = document.getElementById("city");
	const tempElement = document.getElementById("temperature");

	if (cityElement) cityElement.textContent = cityName;
	if (tempElement) tempElement.textContent = `${Math.round(temp)}°C`;
}

async function fallbackToDefaultCity() {
	try {
		const weather = await getForecastByCityName(DEFAULT_CITY);
		updateWeatherInfo(weather.name ?? DEFAULT_CITY, weather.main.temp);
	} catch {}
}

if (typeof window !== "undefined" && "geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(
		async (position) => {
			const { latitude, longitude } = position.coords;
			try {
				const weather = await getForecastByCoordinates(latitude, longitude);
				updateWeatherInfo(weather.name ?? DEFAULT_CITY, weather.main.temp);
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
