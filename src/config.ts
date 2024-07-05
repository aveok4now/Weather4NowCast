export const SITE_TITLE = "Weather4Cast";
export const SITE_DESCRIPTION = "Basic weather forecast app.";

export const DEFAULT_CITY = "Sevastopol";
export const DEFAULT_COUNTRY = "Russia";

export const AUTHOR_GH_LINK = "https://github.com/aveok4now";
export const AUTHOR_NAME = "Slava Ch";

export const YANDEX_MAPS_URL = "https://yandex.ru/maps";

export const WEATHER_API_LINK =
	"https://api.openweathermap.org/data/2.5/weather?";
export const WEATHER_GEOCODING_API_LINK =
	"https://api.openweathermap.org/geo/1.0/direct";
export const WEATHER_API_KEY = import.meta.env.PUBLIC_WEATHER_API_KEY;
export const WEATHER_IMAGES_LINK = "https://flagcdn.com/24x18";

export const MAIN_CITIES = [
	"Sevastopol",
	"Moscow",
	"Simferopol",
	"London",
	"Sochi",
	"Paris",
	"Berlin",
	"Ekaterinburg",
	"Riga",
	"Kaliningrad",
	"Oslo",
	"Tokyo",
	"New York",
	"Brazilia",
	"Manchester",
	"Yalta",
	"Minsk",
	"Seoul",
];

export const WEATHER_OPTIONS = [
	{ title: "Ощущается как", id: "feels-like" },
	{ title: "Влажность", id: "humidity" },
	{ title: "Ветер", id: "wind" },
	{ title: "Давление", id: "pressure" },
	{ title: "Время заката", id: "sunset" },
];
