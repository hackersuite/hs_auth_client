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

export async function getCurrentUser(token: string, originalUrl: string): Promise<ExtendedUser> {
	const res = await networking.getCurrentUser(token, originalUrl);

	return transformExtendedUser(res.data.user);
}

export async function getAllUsers(token: string): Promise<User[]> {
	const res = await networking.getAllUsers(token);
	return res.data.users.map(transformUser);
}

export async function putCurrentUser(name: string, token: string): Promise<void> {
	await networking.putCurrentUser(name, token);
}

export async function getTeams(token: string): Promise<Team[]> {
	const res = await networking.getTeams(token);

	return res.data.teams.map(transformTeam);
}

export async function getTeam(token: string, teamCode: string): Promise<Team> {
	const allTeams: Team[] = await getTeams(token);

	const team: Team | undefined = allTeams.find(team => team.id === teamCode);

	if (team === undefined) {
		throw new Error('Team not found');
	}

	return team;
}
