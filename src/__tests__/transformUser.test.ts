import { transformUser } from '../util/transformUser';
import { sanitiseTeam } from '../util/sanitiseTeam';
import { users as fixtures } from './fixtures/users';

test('Users are transformed correctly', () => {
	for (const fixture of fixtures) {
		expect(transformUser(fixture)).toEqual({
			id: fixture._id,
			name: fixture.name,
			email: fixture.email,
			team: sanitiseTeam(fixture.team)
		});
	}
});
