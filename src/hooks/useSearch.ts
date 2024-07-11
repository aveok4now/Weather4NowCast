import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "../lib/utils";
import { searchCities } from "../services/weatherService";
import type { CityInfo } from "../types/weatherTypes";

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState<CityInfo[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [noResults, setNoResults] = useState(false);
	const noResultsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const debouncedSearch = useCallback(
		debounce(async (term) => {
			if (term.length < 3) {
				setSuggestions([]);
				setNoResults(false);
				return;
			}
			setIsLoading(true);
			setNoResults(false);
			try {
				const cities = await searchCities(term);
				setSuggestions(cities);
				if (cities.length === 0) {
					noResultsTimeoutRef.current = setTimeout(
						() => setNoResults(true),
						300
					);
				}
			} catch (error) {
				console.warn("Error searching cities:", error);
				setNoResults(true);
			} finally {
				setIsLoading(false);
			}
		}, 300),
		[]
	);

	useEffect(() => {
		debouncedSearch(searchTerm);
		return () => {
			if (noResultsTimeoutRef.current) {
				clearTimeout(noResultsTimeoutRef.current);
			}
		};
	}, [searchTerm, debouncedSearch]);

	const clearSearch = useCallback(() => {
		setSearchTerm("");
		setSuggestions([]);
		setNoResults(false);
	}, []);

	return {
		searchTerm,
		setSearchTerm,
		suggestions,
		isLoading,
		noResults,
		clearSearch,
	};
};
