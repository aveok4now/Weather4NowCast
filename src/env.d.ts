/// <reference types="astro/client" />
interface ImportMetaEnv {
	readonly WEATHER_API_KEY: string;
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	updateWeatherInfo: (cityName: string) => Promise<void>;
}
