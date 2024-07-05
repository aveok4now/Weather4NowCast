import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { WEATHER_OPTIONS as weatherOptions } from "../../../config";
import LinearGradient from "../magic/LinearGradient";
import { Label } from "../text/Label";
import { Switch } from "./Switch";

type WeatherOptionId = (typeof weatherOptions)[number]["id"];

type WeatherSettings = {
	[K in WeatherOptionId]: boolean;
};

const defaultSettings: WeatherSettings = weatherOptions.reduce(
	(acc, option) => ({ ...acc, [option.id]: true }),
	{} as WeatherSettings
);

export function WeatherSettingsToggle() {
	const [isOpen, setIsOpen] = useState(false);
	const [settings, setSettings] = useState<WeatherSettings>(() =>
		weatherOptions.reduce(
			(acc, option) => ({ ...acc, [option.id]: true }),
			{} as WeatherSettings
		)
	);

	useEffect(() => {
		const savedSettings = localStorage.getItem("weatherSettings");
		if (savedSettings) {
			setSettings(JSON.parse(savedSettings) as WeatherSettings);
		} else {
			localStorage.setItem("weatherSettings", JSON.stringify(defaultSettings));
		}

		window.dispatchEvent(new Event("weatherSettingsChanged"));
	}, []);

	const toggleSetting = (id: WeatherOptionId) => {
		const newSettings = { ...settings, [id]: !settings[id] };
		setSettings(newSettings);
		localStorage.setItem("weatherSettings", JSON.stringify(newSettings));
		window.dispatchEvent(new Event("weatherSettingsChanged"));
	};

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="inline-flex items-center rounded-md bg-blue-300 dark:bg-black p-1"
			>
				<Settings className="h-[1.2rem] w-[1.2rem] transition-all duration-300 scale-10 active:-scale-100 hover:text-white dark:text-white dark:hover:text-blue-300" />
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
					<LinearGradient className="rounded-md" />
					<div className="py-1 rounded-md z-20">
						{weatherOptions.map((option) => (
							<div className="flex items-center space-x-2">
								<Switch
									id="airplane-mode"
									checked={Boolean(settings[option.id])}
									onCheckedChange={() => toggleSetting(option.id)}
									className="my-1 mx-1"
								/>
								<Label
									htmlFor="airplane-mode"
									key={option.id}
									className="font-light"
								>
									{option.title}
								</Label>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
