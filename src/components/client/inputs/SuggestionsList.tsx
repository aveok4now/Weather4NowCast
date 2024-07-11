import React from "react";
import { getCityCountryImage } from "../../../services/weatherService";
import type { CityInfo } from "../../../types/weatherTypes";
import { BorderBeam } from "../magic/BorderBeam";
import LinearGradient from "../magic/LinearGradient";

interface SuggestionsListProps {
	suggestions: CityInfo[];
	noResults: boolean;
	onCityClick: (cityName: string) => void;
	searchTerm: string;
}

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
	suggestions,
	noResults,
	onCityClick,
	searchTerm,
}) => {
	if (suggestions.length === 0 && (!noResults || searchTerm.length < 3)) {
		return null;
	}

	return (
		<div className="absolute w-full bg-white dark:bg-black border rounded-md mt-1 overflow-hidden">
			<LinearGradient />
			<BorderBeam duration={5} size={100} />
			<ul className="max-h-60 overflow-y-auto">
				{suggestions.map((city, index) => (
					<li
						key={index}
						onClick={() => onCityClick(city.name)}
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
				{suggestions.length === 0 && (
					<li className="p-2 text-center text-gray-500">Ничего не найдено</li>
				)}
			</ul>
		</div>
	);
};
