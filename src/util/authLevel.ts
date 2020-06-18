import { AuthLevel } from '../';

const stringAuthLevel = new Map<string, AuthLevel>([
	['unverified', AuthLevel.Unverified],
	['applicant', AuthLevel.Applicant],
	['attendee', AuthLevel.Attendee],
	['volunteer', AuthLevel.Volunteer],
	['organiser', AuthLevel.Organiser]
]);

export function convertAuthLevel(authLevel: string): AuthLevel {
	const converted = stringAuthLevel.get(authLevel);
	if (typeof converted === 'undefined') throw new Error('Auth Level Unknown');
	return converted;
}
