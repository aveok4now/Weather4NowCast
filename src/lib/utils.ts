// lib/utils.ts
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
