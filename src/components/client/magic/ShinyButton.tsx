"use client";

import { motion, type AnimationProps } from "framer-motion";
import LinearGradient from "./LinearGradient";

const animationProps = {
	initial: { "--x": "100%", scale: 0.8 },
	animate: { "--x": "-100%", scale: 1 },
	whileTap: { scale: 0.95 },
	transition: {
		repeat: Infinity,
		repeatType: "loop",
		repeatDelay: 1,
		type: "spring",
		stiffness: 20,
		damping: 15,
		mass: 2,
		scale: {
			type: "spring",
			stiffness: 200,
			damping: 5,
			mass: 0.5,
		},
	},
} as AnimationProps;

const ShinyButton = ({ text = "shiny-button", id = "shiny-button" }) => {
	return (
		<motion.button
			{...animationProps}
			className="relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-[box-shadow] duration-300 ease-in-out hover:shadow  dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)] border border-white dark:border-blue-400"
			id={id}
		>
			<LinearGradient className="rounded-lg" from={"#60a5fa"} />
			<span
				className="relative block h-full w-full text-sm uppercase tracking-wide text-[rgb(0,0,0,95%)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
				style={{
					maskImage:
						"linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
				}}
			>
				{text}
			</span>
			<span
				style={{
					mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
					maskComposite: "exclude",
				}}
				className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
			></span>
		</motion.button>
	);
};

export default ShinyButton;
