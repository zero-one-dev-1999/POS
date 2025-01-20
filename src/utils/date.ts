export const convertTimestampToDate = (timestamp: { seconds: number }) => {
	const date = new Date(timestamp.seconds * 1000)
	return date.toLocaleDateString('en-GB')
}
