import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import useEscapeKey from "../hooks/useEscapeKey";
import { debounce } from "../lib/utils";
import { getCityCountryImage, searchCities } from "../services/weatherService";
import { BorderBeam } from "./BorderBeam";
import { Input } from "./Input";
import LinearGradient from "./LinearGradient";

interface CityInfo {
	name: string;
	localName: string;
	country: string;
	countryCode: string;
}

const SearchInput: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState<CityInfo[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [noResults, setNoResults] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);
	const noResultsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const debouncedSearch = debounce(async (term: string) => {
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
				noResultsTimeoutRef.current = setTimeout(() => setNoResults(true), 300);
			}
		} catch (error) {
			console.warn("Error searching cities:", error);
			setNoResults(true);
		} finally {
			setIsLoading(false);
		}
	}, 300);

	useEffect(() => {
		debouncedSearch(searchTerm);
		return () => {
			if (noResultsTimeoutRef.current) {
				clearTimeout(noResultsTimeoutRef.current);
			}
		};
	}, [searchTerm]);

	const handleClose = () => {
		setSuggestions([]);
		setNoResults(false);
	};

	useEscapeKey(handleClose);
	useClickOutside(searchRef, handleClose);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleCityClick = (city: CityInfo) => {
		(window as any).updateWeatherInfo(city.name);
		setSearchTerm("");
		setSuggestions([]);
		setNoResults(false);
	};

	const renderSuggestions = () => {
		if (
			suggestions.length > 0 ||
			(noResults && !isLoading && searchTerm.length >= 3)
		) {
			return (
				<div className="absolute w-full bg-white dark:bg-black border rounded-md mt-1 overflow-hidden">
					<LinearGradient />
					{searchRef?.current?.focus && <BorderBeam duration={5} size={100} />}
					<ul className="max-h-60 overflow-y-auto">
						{suggestions.map((city, index) => (
							<li
								key={index}
								onClick={() => handleCityClick(city)}
								className="p-2 hover:bg-blue-100/20 cursor-pointer flex flex-row items-center transition-all duration-300"
							>
								<img
									src={getCityCountryImage(city.countryCode)}
									alt={`${city.country} flag`}
									className="mr-2"
								/>
								<div className="flex flex-col text-justify">
									<span className="font-bold">{city.localName}</span>
									<span className="text-sm text-gray-500">
										{city.name}, {city.country}
									</span>
								</div>
							</li>
						))}
						{noResults && !isLoading && (
							<li className="p-2 text-center text-gray-500">
								Ничего не найдено
							</li>
						)}
					</ul>
				</div>
			);
		}
		return null;
	};

	return (
		<div ref={searchRef} className="relative w-2/3 lg:w-1/4 m-auto z-50">
			<div className="flex items-center">
				<Input
					type="text"
					value={searchTerm}
					onChange={handleInputChange}
					placeholder="Найти город"
					className="bg-white-400/80 dark:bg-blue-300/20 placeholder-blue-400 text-center font-bold border-white dark:border-blue-300 text-blue-400"
					maxLength={20}
				/>
			</div>
			{isLoading && (
				<div className="absolute w-full text-center mt-1">
					<span className="text-white dark:text-blue-400">Загрузка...</span>
				</div>
			)}
			{renderSuggestions()}
		</div>
	);
};

export default SearchInput;
