import * as networking from './networking';
import { transformUser, transformExtendedUser } from './util/transformUser';
import { transformTeam } from './util/transformTeam';

export const enum AuthLevel {
	// NOTE: the auth levels must be in ascending order
	Unverified,
	Applicant,
	Attendee,
	Volunteer,
	Organiser
}

export interface User {
	id: string;
	name: string;
	email: string;
	authLevel: AuthLevel;
	team?: string;
}

export interface ExtendedUser extends User {
	emailVerified: boolean;
}

export interface Team {
	id: string;
	name: string;
	creator: string;
	tableNumber?: number;
}

export async function getCurrentUser(token: string, originalUrl = ''): Promise<ExtendedUser> {
	const res = await networking.getCurrentUser(token, originalUrl);

	return transformExtendedUser(res.data.user);
}

export async function getUsers(token: string): Promise<User[]> {
	const res = await networking.getUsers(token);
	return res.data.users.map(transformUser);
}

export async function getUser(token: string, userId: string): Promise<User> {
	const users = await getUsers(token);
	const user = users.find(user => user.id === userId);

	if (!user) {
		throw new Error('User not found');
	}

	return user;
}

export async function putCurrentUser(name: string, token: string): Promise<void> {
	await networking.putCurrentUser(name, token);
}

export async function getTeams(token: string): Promise<Team[]> {
	const res = await networking.getTeams(token);

	return res.data.teams.map(transformTeam);
}

export async function getTeam(token: string, teamId: string): Promise<Team> {
	const teams = await getTeams(token);

	const team = teams.find(team => team.id === teamId);

	if (!team) {
		throw new Error('Team not found');
	}

	return team;
}
