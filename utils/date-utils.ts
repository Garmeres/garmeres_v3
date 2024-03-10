export function getDateString(datetimeIso: string) {
	const date = new Date(datetimeIso);
	return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
		.toString()
		.padStart(2, '0')}.${date.getFullYear()}`;
}
