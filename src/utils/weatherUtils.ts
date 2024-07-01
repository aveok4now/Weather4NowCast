export const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
};

export const formatSunsetTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};