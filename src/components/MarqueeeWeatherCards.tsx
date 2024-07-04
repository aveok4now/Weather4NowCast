import { useEffect } from "react";
import type { WeatherMainCitiesResponse } from "../types/weatherTypes";
import LinearGradient from "./LinearGradient";
import Marquee from "./Marquee";
import { MarqueeCard } from "./MarqueeCard";

interface MarqueeWeatherCardsProps {
	weatherData: WeatherMainCitiesResponse[];
}

export const MarqueeWeatherCards: React.FC<MarqueeWeatherCardsProps> = ({
	weatherData,
}) => {
	const firstRow = weatherData.slice(0, weatherData.length / 2);
	const secondRow = weatherData.slice(weatherData.length / 2);

	const handleCardClick = (cityName: string) => {
		(window as any).updateWeatherInfo(cityName);
	};

	return (
		<div className="z-40 relative flex h-screen flex-row items-center justify-center overflow-hidden rounded-lg  sm:px-20 md:shadow-xl transition-all duration-300">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-white/60 dark:from-blue-300/40 "></div>
			<Marquee pauseOnHover vertical className="[--duration:20s]">
				{firstRow.map((weather) => (
					<MarqueeCard
						key={weather.name}
						{...weather}
						onclick={() => handleCardClick(weather.name)}
					/>
				))}
			</Marquee>
			<Marquee reverse pauseOnHover vertical className="[--duration:20s]">
				{secondRow.map((weather) => (
					<MarqueeCard
						key={weather.name}
						{...weather}
						onclick={() => handleCardClick(weather.name)}
					/>
				))}
			</Marquee>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-blue-300/60 dark:from-black"></div>
			<LinearGradient />
		</div>
	);
};
