const { transformUser, transformExtendedUser } = require('../dist/util/transformUser');
const { sanitiseTeam } = require('../dist/util/sanitiseTeam');
const { convertAuthLevel } = require('../dist/util/authLevel');
const fixtures = require('./fixtures/users');

test('Users are transformed correctly', () => {
	for (const fixture of Object.values(fixtures)) {
		const transformed = transformUser(fixture);
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
	for (const fixture of Object.values(fixtures)) {
		const transformed = transformUser(fixture);
		expect(transformExtendedUser(fixture)).toEqual({
			...transformUser(fixture),
			emailVerified: fixture.email_verified
		});
	}
});
