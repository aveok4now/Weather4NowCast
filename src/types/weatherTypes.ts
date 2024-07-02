export interface WeatherResponse {
	main: {
		temp: number;
		feels_like: number;
		humidity: number;
	};
	coord: {
		lon: number;
		lat: number;
	};
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
	name: string;
	weather: Array<{
		description: string;
		icon: string;
	}>;
}

export interface WeatherMainCitiesResponse {
	name: string;
	coords: string;
	body: string;
	img: string;
}
