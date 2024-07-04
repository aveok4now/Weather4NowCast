import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { WEATHER_OPTIONS as weatherOptions } from "../../../config";

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
				<Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-90 transition-all duration-300 dark:-rotate-120 dark:scale-100" />
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
					<div className="py-1">
						{weatherOptions.map((option) => (
							<label
								key={option.id}
								className="flex items-center px-4 py-2 text-sm"
							>
								<input
									type="checkbox"
									checked={settings[option.id]}
									onChange={() => toggleSetting(option.id)}
									className="mr-2"
								/>
								{option.title}
							</label>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
