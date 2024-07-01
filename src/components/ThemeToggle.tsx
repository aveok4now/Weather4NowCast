import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const themes: ("light" | "dark")[] = ["light", "dark"];
export function ThemeToggle() {
	const [theme, setThemeState] = useState<"light" | "dark" | "system">(
		"system"
	);

	useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains("dark");
		setThemeState(isDarkMode ? "dark" : "light");
	}, []);

	useEffect(() => {
		const isDark =
			theme === "dark" ||
			(theme === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);
		document.documentElement.classList[isDark ? "add" : "remove"]("dark");
	}, [theme]);

	return (
		<div className="inline-flex items-center rounded-md bg-purple-300 dark:bg-black">
			{themes.map((t) => {
				const checked = t === theme;
				return (
					<button
						key={t}
						className={`${
							checked
								? "bg-white text-purple-700 ring-1 ring-inset ring-black dark:ring-purple-300"
								: ""
						} cursor-pointer rounded-md p-1 `}
						onClick={() => setThemeState(t)}
					>
						{t === "light" ? (
							<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-90 transition-all duration-300 dark:-rotate-90 dark:scale-100" />
						) : (
							<Moon className="h-[1.2rem] w-[1.2rem] scale-90 transition-all dark:scale-100" />
						)}
					</button>
				);
			})}
		</div>
	);
}
