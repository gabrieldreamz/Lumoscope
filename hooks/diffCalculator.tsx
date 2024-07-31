export function calculateTimeDifference(lightEnd: string) {
	const currentTime: Date = new Date();
	// Parse the lightEnd string into a Date object
	const lastSeenTime = new Date(lightEnd);
	const adjustedLastSeenTime = new Date(
		lastSeenTime.getTime() + 60 * 60 * 1000
	);

	// Calculate the difference in milliseconds
	const difference = currentTime.getTime() - adjustedLastSeenTime.getTime();

	// Convert the difference from milliseconds to seconds, minutes, hours, or days
	const secondsAgo = Math.floor(difference / 1000);
	const minutesAgo = Math.floor(secondsAgo / 60);
	const hoursAgo = Math.floor(minutesAgo / 60);
	const daysAgo = Math.floor(hoursAgo / 24);

	// Determine the appropriate time unit to display
	if (secondsAgo < 60) {
		return `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`;
	} else if (minutesAgo < 60) {
		return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
	} else if (hoursAgo < 24) {
		return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
	} else {
		return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
	}
}
