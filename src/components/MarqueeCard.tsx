import { cn } from "../lib/utils";

export const MarqueeCard = ({
	img,
	name,
	coords,
	body,
	onclick,
}: {
	img: string;
	name: string;
	coords: string;
	body: string;
	onclick?: () => void;
}) => {
	return (
		<figure
			className={cn(
				"relative h-46 w-38 cursor-pointer overflow-hidden rounded-xl border p-4",
				"border-gray-950/[.1] bg-blue-400/30 hover:bg-gray-950/[.05]",
				"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
			)}
			onClick={onclick}
		>
			<div className="flex flex-row items-center gap-2">
				<img className="rounded-full" width="32" height="32" alt="" src={img} />
				<div className="flex flex-col">
					<figcaption className="text-sm font-medium dark:text-white">
						{name}
					</figcaption>
					<p className="text-xs font-medium dark:text-white/40">{coords}</p>
				</div>
			</div>

			<blockquote className="mt-2 text-sm">{body}</blockquote>
		</figure>
	);
};
