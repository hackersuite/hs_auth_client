import { transformUser, transformExtendedUser } from '../util/transformUser';
import { sanitiseTeam } from '../util/sanitiseTeam';
import { convertAuthLevel } from '../util/authLevel';
import { users as fixtures } from './fixtures/users';

test('Users are transformed correctly', () => {
	for (const fixture of fixtures) {
		expect(transformUser(fixture)).toEqual({
			id: fixture._id,
			name: fixture.name,
			email: fixture.email,
			team: sanitiseTeam(fixture.team),
			authLevel: convertAuthLevel(fixture.auth_level)
		});
	}
});

test('Exended users are transformed correctly', () => {
	for (const fixture of fixtures) {
		expect(transformExtendedUser(fixture)).toEqual({
			...transformUser(fixture),
			emailVerified: fixture.email_verified
		});
	}
});
