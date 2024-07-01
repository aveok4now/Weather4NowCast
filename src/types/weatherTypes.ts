export interface WeatherResponse {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
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