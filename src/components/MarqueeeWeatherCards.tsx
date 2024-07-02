import type { WeatherMainCitiesResponse } from "../types/weatherTypes";
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

	return (
		<div className="relative flex h-96 flex-row items-center justify-center overflow-hidden rounded-lg bg-background sm:px-20 md:shadow-xl">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent dark:from-background"></div>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-blue-300/60 dark:from-black"></div>
			<Marquee pauseOnHover vertical className="[--duration:20s]">
				{firstRow.map((weather) => (
					<MarqueeCard key={weather.name} {...weather} />
				))}
			</Marquee>
			<Marquee reverse pauseOnHover vertical className="[--duration:20s]">
				{secondRow.map((weather) => (
					<MarqueeCard key={weather.name} {...weather} />
				))}
			</Marquee>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent dark:from-background"></div>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-blue-300/60 dark:from-black"></div>
		</div>
	);
};
