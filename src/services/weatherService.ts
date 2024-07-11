import {
	MAIN_CITIES,
	WEATHER_API_KEY,
	WEATHER_API_LINK,
	WEATHER_GEOCODING_API_LINK,
	WEATHER_IMAGES_LINK,
} from "../config";
import { hydrateSearchResults } from "../hydrators/weatherHydrator";
import type {
	CitySearchResponse,
	WeatherResponse,
} from "../types/weatherTypes";
import { makeRequest } from "./apiService";

export const getForecastByCityName = async (
	cityName: string
): Promise<WeatherResponse> => {
	return await makeRequest("get", `${WEATHER_API_LINK}`, {
		appid: WEATHER_API_KEY,
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

export const searchCities = async (
	query: string
): Promise<CitySearchResponse[]> => {
	const response = await makeRequest("get", WEATHER_GEOCODING_API_LINK, {
		appid: WEATHER_API_KEY,
		q: query,
		limit: 3,
	});

	if (Array.isArray(response)) {
		return hydrateSearchResults(response);
	} else {
		return [];
	}
};

export const getCityCountryImage = (countryCode: string): string =>
	`${WEATHER_IMAGES_LINK}/${countryCode}.png`;
