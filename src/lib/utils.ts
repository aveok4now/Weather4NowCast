import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function debounce<F extends (...args: any[]) => any>(
	func: F,
	waitFor: number
) {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<F>): Promise<ReturnType<F>> => {
		if (timeout) {
			clearTimeout(timeout);
		}

		return new Promise((resolve) => {
			timeout = setTimeout(() => resolve(func(...args)), waitFor);
		});
	};
}

export const kelvinToCelsius = (kelvin: number): number => {
	return Math.round(kelvin - 273.15);
};

export const formatSunsetTime = (timestamp: number): string => {
	const date = new Date(timestamp * 1000);
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const getVideoPath = (weatherName: string) => {
	return `video/${weatherName}_weather`;
};
