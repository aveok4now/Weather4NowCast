// services/savedCitiesService.ts

import { getForecastByCityName } from "./weatherService";

const MAX_SAVED_CITIES = 10;
const SAVED_CITIES_KEY = "savedCities";

export interface SavedCity {
	name: string;
	countryCode: string;
}

export const getSavedCities = (): SavedCity[] => {
	return JSON.parse(localStorage.getItem(SAVED_CITIES_KEY) || "[]");
};

export const saveCity = async (cityName: string): Promise<void> => {
	const savedCities = getSavedCities();
	if (!savedCities.some((city) => city.name === cityName)) {
		try {
			const weather = await getForecastByCityName(cityName);
			const newCity: SavedCity = {
				name: weather.name,
				countryCode: weather.sys.country,
			};
			savedCities.unshift(newCity);
			if (savedCities.length > MAX_SAVED_CITIES) {
				savedCities.pop();
			}
			localStorage.setItem(SAVED_CITIES_KEY, JSON.stringify(savedCities));
		} catch (error) {
			console.error("Error saving city:", error);
		}
	}
};

export const removeCity = (cityName: string): void => {
	const savedCities = getSavedCities();
	const updatedCities = savedCities.filter((city) => city.name !== cityName);
	localStorage.setItem(SAVED_CITIES_KEY, JSON.stringify(updatedCities));
};

export const updateSavedCitiesList = (containerId: string): void => {
	const container = document.getElementById(containerId);
	if (!container) return;

	const savedCities = getSavedCities();
	container.innerHTML = "";

	savedCities.forEach((city) => {
		const cityElement = document.createElement("div");
		cityElement.className =
			"saved-city bg-blue-300 rounded-full px-3 py-1 flex items-center";
		cityElement.innerHTML = `
      	  <img src="https://flagcdn.com/${city.countryCode.toLowerCase()}.svg" width="20" class="mr-2" alt="${
			city.countryCode
		} flag">
      	  <span class="city-name cursor-pointer">${city.name}</span>
        <button class="remove-city ml-2 text-black font-bold">×</button>
    `;
		container.appendChild(cityElement);
	});
};
