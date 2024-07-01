/**
 * Retrieve the path of weather video by it's name
 * @param weatherName string
 * @returns
 */
export const getVideoPath = (weatherName: string) => {
	return `video/${weatherName}_weather`;
};
