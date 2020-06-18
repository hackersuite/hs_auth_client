import { AuthLevels } from '../';

const stringAuthLevels = new Map<string, AuthLevels>([
	['unverified', AuthLevels.Unverified],
	['applicant', AuthLevels.Applicant],
	['attendee', AuthLevels.Attendee],
	['volunteer', AuthLevels.Volunteer],
	['organiser', AuthLevels.Organiser]
]);

export function convertAuthLevel(authLevel: string): AuthLevels {
	const converted = stringAuthLevels.get(authLevel);
	if (typeof converted === 'undefined') throw new Error('Auth Level Unknown');
	return converted;
}
