import type { WeatherResponse } from "../types/weatherTypes";

export const hydrateWeatherForeCastOfMainCities = (
	forecast: WeatherResponse
) => ({
	name: forecast.name,
	coords: `${forecast.coord.lon}, ${forecast.coord.lat}`,
	body: `${forecast?.weather[0]?.description}, ${Math.round(
		forecast.main.temp
	)}°C (ощущается как ${Math.round(forecast.main.feels_like)}°C)`,
	img: `https://openweathermap.org/img/wn/${forecast?.weather[0]?.icon}.png`,
});
