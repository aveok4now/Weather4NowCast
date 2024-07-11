import React, { useCallback, useRef } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import useEscapeKey from "../../../hooks/useEscapeKey";
import { useSearch } from "../../../hooks/useSearch";
import { Input } from "./Input";
import { SuggestionsList } from "./SuggestionsList";

const SearchInput: React.FC = () => {
	const searchRef = useRef<HTMLDivElement>(null);
	const {
		searchTerm,
		setSearchTerm,
		suggestions,
		isLoading,
		noResults,
		clearSearch,
	} = useSearch();

	const handleClose = useCallback(() => {
		clearSearch();
	}, [clearSearch]);

	useClickOutside(searchRef, handleClose);
	useEscapeKey(handleClose);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchTerm(e.target.value);
		},
		[setSearchTerm]
	);

	const handleCityClick = useCallback(
		(cityName: string) => {
			if (typeof window !== "undefined" && (window as any).updateWeatherInfo) {
				(window as any).updateWeatherInfo(cityName);
			}
			clearSearch();
		},
		[clearSearch]
	);

	return (
		<div ref={searchRef} className="relative w-2/3 lg:w-1/4 m-auto z-50 h-20">
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
			{isLoading && <LoadingIndicator />}
			<SuggestionsList
				suggestions={suggestions}
				noResults={noResults}
				onCityClick={handleCityClick}
				searchTerm={searchTerm}
			/>
		</div>
	);
};

const LoadingIndicator: React.FC = () => (
	<div className="absolute w-full text-center mt-1">
		<span className="text-white dark:text-blue-400">Загрузка...</span>
	</div>
);

export default SearchInput;
