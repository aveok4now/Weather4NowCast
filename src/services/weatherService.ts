import { MAIN_CITIES, WEATHER_API_KEY, WEATHER_API_LINK } from "../config";
import type { WeatherResponse } from "../types/weatherTypes";
import { makeRequest } from "./apiService";

export const getForecastByCityName = async (
	cityName: string
): Promise<WeatherResponse> => {
	return await makeRequest("get", `${WEATHER_API_LINK}`, {
		appid: "eab605b8aa5fec3b80aae3e6a8a12491",
		q: cityName,
		units: "metric",
		lang: "ru",
	});
};

export const getForecastByCoordinates = async (
	lat: number,
	lon: number
): Promise<WeatherResponse> => {
	return await makeRequest("get", `${WEATHER_API_LINK}`, {
		appid: WEATHER_API_KEY,
		units: "metric",
		lat,
		lon,
		lang: "ru",
	});
};

export const getForecastForMainCities = async (): Promise<
	WeatherResponse[]
> => {
	return await Promise.all(
		MAIN_CITIES.map((city) => getForecastByCityName(city))
	);
};
