import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { Settings as SettingsIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { WEATHER_OPTIONS as weatherOptions } from "../../../config";
import { useEffect, useState } from "react";

type WeatherOptionId = (typeof weatherOptions)[number]["id"];

type WeatherSettings = {
  [K in WeatherOptionId]: boolean;
};

const defaultSettings: WeatherSettings = weatherOptions.reduce(
  (acc, option) => ({ ...acc, [option.id]: true }),
  {} as WeatherSettings
);

export function DropdownMenu() {
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
    <Menu as="div" className="relative inline-flex text-left z-50">
      <div className="inline-flex items-center self-center rounded-md">
        <MenuButton className="rounded-md p-1 bg-blue-300 dark:bg-black dark:text-white shadow-sm ring-1 ring-black dark:ring-purple-300 transition-all duration-100 font-medium hover:bg-purple-400 dark:hover:bg-purple-300 focus:ring-inset focus:ring-offset-purple-100">
          <SettingsIcon className="h-[1.2rem] w-[1.2rem] transition-all duration-300 scale-10 active:-scale-100 hover:text-white dark:text-white dark:hover:text-black" />
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-in-out duration-300"
        enterFrom="transfrom opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-80"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transfrom opacityo-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="w-36 mt-2 origin-top-right rounded-md bg-white/85 dark:bg-black/90 backdrop-blur-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-50"
        >
          <div className="py-1">
            {weatherOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center px-4 py-2 text-sm text-black"
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
        </MenuItems>
      </Transition>
    </Menu>
  );
}
