import { cn } from "../lib/utils";
import type { WeatherMainCitiesResponse } from "../types/weatherTypes";
import DotPattern from "./DotPattern";
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
		<div className="z-50 relative flex h-80 flex-row items-center justify-center overflow-hidden rounded-lg  sm:px-20 md:shadow-xl transition-all duration-300">
			<DotPattern
				className={cn(
					"[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]"
				)}
			/>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-white/6s0 dark:from-blue-300/40 "></div>
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

			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-blue-300/60 dark:from-black"></div>
		</div>
	);
};
