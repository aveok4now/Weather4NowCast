import type {
	CitySearchResponse,
	WeatherResponse,
} from "../types/weatherTypes";

export const hydrateWeatherForeCastOfMainCities = (
	forecast: WeatherResponse
) => ({
	name: forecast.name,
	coords: `${forecast.coord.lon}, ${forecast.coord.lat}`,
	temp: forecast.main.temp,
	body: `${forecast?.weather[0]?.description}, ${Math.round(
		forecast.main.temp
	)}°C (ощущается как ${Math.round(forecast.main.feels_like)}°C)`,
	img: `https://openweathermap.org/img/wn/${forecast?.weather[0]?.icon}.png`,
});

export const hydrateSearchResults = (
	searchResults: any[]
): CitySearchResponse[] => {
	const uniqueCities = new Map();

	searchResults.forEach((city) => {
		const key = `${city.name}-${city.country}`;
		if (!uniqueCities.has(key)) {
			uniqueCities.set(key, {
				name: city.name,
				localName: city.local_names?.ru || city.name,
				country: city.country,
				countryCode: city.country.toLowerCase(),
			});
		}
	});

	return Array.from(uniqueCities.values());
};
