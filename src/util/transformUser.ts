import { AuthUser } from '../networking';
import { User } from '..';
import { sanitiseTeam } from './sanitiseTeam';

export function transformUser(raw: AuthUser): User {
	return {
		id: raw._id,
		email: raw.email,
		name: raw.name,
		team: sanitiseTeam(raw.team)
	};
}
