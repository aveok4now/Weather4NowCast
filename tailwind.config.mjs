/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
		extend: {
			keyframes: {
				slidein: {
					from: {
						opacity: "0",
						transform: "translateY(-10px)",
					},
					to: {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				marquee: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-100% - var(--gap)))" },
				},
				"marquee-vertical": {
					from: { transform: "translateY(0)" },
					to: { transform: "translateY(calc(-100% - var(--gap)))" },
				},
				"border-beam": {
					"100%": {
						"offset-distance": "100%",
					},
				},
				keyframes: {
					"shine-pulse": {
						"0%": {
							"background-position": "0% 0%",
						},
						"50%": {
							"background-position": "100% 100%",
						},
						to: {
							"background-position": "0% 0%",
						},
					},
				},
			},
			animation: {
				slidein: "slidein 1s ease 300ms",
				marquee: "marquee var(--duration) linear infinite",
				"marquee-vertical": "marquee-vertical var(--duration) linear infinite",
				"border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
			},
		},
	},
	plugins: [],
};
