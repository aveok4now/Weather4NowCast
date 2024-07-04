import React, { useEffect, useRef, useState } from "react";
import { debounce } from "../lib/utils";
import { getCityCountryImage, searchCities } from "../services/weatherService";

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

	const searchRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	const saved = localStorage.getItem("savedCities");
	// 	if (saved) {
	// 		setSavedCities(JSON.parse(saved));
	// 	}
	// }, []);

	const debouncedSearch = debounce(async (term: string) => {
		if (term.length < 3) {
			setSuggestions([]);
			return;
		}
		setIsLoading(true);
		try {
			const cities = await searchCities(term);
			setSuggestions(cities);
			console.log(cities);
		} catch (error) {
			console.error("Error searching cities:", error);
		} finally {
			setIsLoading(false);
		}
	}, 300);

	useEffect(() => {
		debouncedSearch(searchTerm);
	}, [searchTerm]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setSuggestions([]);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleCityClick = (city: CityInfo) => {
		(window as any).updateWeatherInfo(city.name);
		setSearchTerm("");
		setSuggestions([]);
	};

	return (
		<div ref={searchRef} className="relative w-1/4 m-auto z-50">
			<div className="flex items-center">
				<input
					type="text"
					value={searchTerm}
					onChange={handleInputChange}
					placeholder="Найти город"
					className="w-full p-2 border rounded-l bg-white text-black"
				/>
			</div>
			{isLoading && <div className="absolute right-2 top-2">Loading...</div>}
			{suggestions.length > 0 && (
				<ul className="absolute w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto">
					{suggestions.map((city, index) => (
						<li
							key={index}
							onClick={() => handleCityClick(city)}
							className="p-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center"
						>
							<img
								src={getCityCountryImage(city.countryCode)}
								alt={`${city.country} flag`}
								className="mr-2"
							/>
							<div className="flex flex-col">
								<span className="font-bold">{city.localName}</span>
								<span className="text-sm text-gray-500">
									{city.name}, {city.country}
								</span>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchInput;
