import type { ReactNode } from "react";
import { Typewriter } from "react-simple-typewriter";

interface Props {
	words: string[];
	typeSpeed?: number;
	deleteSpeed?: number;
	delaySpeed?: number;
	loop: boolean;
	cursor?: boolean;
	cursorStyle?: ReactNode;
	cursorBlinking?: boolean;
	className?: string;
}

export default function TypeWriter({
	words,
	typeSpeed = 80,
	deleteSpeed = 50,
	delaySpeed = 1500,
	loop,
	cursor = false,
	cursorStyle,
	cursorBlinking = true,
	className,
}: Props) {
	return (
		<div className={`${className}`}>
			<Typewriter
				words={words}
				typeSpeed={typeSpeed}
				deleteSpeed={deleteSpeed}
				delaySpeed={delaySpeed}
				loop={loop}
				cursor={cursor}
				cursorStyle={cursorStyle}
				cursorBlinking={cursorBlinking}
			/>
		</div>
	);
}
