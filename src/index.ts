import * as networking from './networking';
import { transformUser } from './util/transformUser';
import { transformTeam } from './util/transformTeam';

export interface User {
	id: string;
	name: string;
	email: string;
	team?: string;
}

export interface Team {
	id: string;
	name: string;
	creator: string;
	tableNumber?: number;
}

export interface AuthApiInterface {
	getCurrentUser(token: string): Promise<User>;
	getUser(token: string, userId: string): Promise<User>;
	getUsers(token: string): Promise<User[]>;
	getCurrentTeam(token: string): Promise<Team>;
	getTeam(token: string, teamId: string): Promise<Team>;
	getTeamMembers(token: string, teamId: string): Promise<User[]>;
	getTeams(token: string): Promise<Team[]>;
	setRole(token: string, role: string, userId: string): Promise<boolean>;
	getAuthorizedResources(token: string, from: Array<string>): Promise<Array<string>>;
	newUri(path: string, args: Map<string, string>): string;
}

export class AuthApi implements AuthApiInterface {
	private readonly _serviceName: string;

	public constructor(serviceName: string) {
		this._serviceName = serviceName;
	}

	public async getCurrentUser(token: string): Promise<User> {
		const res = await networking.getUser(token, 'me');
		return transformUser(res.data.user);
	}


	public async getUser(token: string, userId: string): Promise<User> {
		const res = await networking.getUser(token, userId);
		return transformUser(res.data.user);
	}

	public async getUsers(token: string): Promise<User[]> {
		const res = await networking.getUsers(token);
		return res.data.users.map(transformUser);
	}

	public async getCurrentTeam(token: string): Promise<Team> {
		const res = await networking.getTeam(token, 'me');
		return transformTeam(res.data.team);
	}

	public async getTeam(token: string, teamId: string): Promise<Team> {
		const res = await networking.getTeam(token, teamId);
		return transformTeam(res.data.team);
	}

	public async getTeamMembers(token: string, teamId: string): Promise<User[]> {
		const res = await networking.getUsers(token, teamId);
		return res.data.users.map(transformUser);
	}

	public async getTeams(token: string): Promise<Team[]> {
		const res = await networking.getTeams(token);
		return res.data.teams.map(transformTeam);
	}

	public async setRole(token: string, role: string, userId: string): Promise<boolean> {
		const res = await networking.setRole(token, userId, role);
		return res.data.status === 200;
	}

	public async getAuthorizedResources(token: string, from: Array<string>): Promise<Array<string>> {
		const res = await networking.getAuthorizedResources(token, from);
		return res.data.authorizedUris;
	}

	public newUri(path: string, args?: Map<string, string>): string {
		return `hs:${this._serviceName}:${path}${this.parseRequestArguments(args)}`;
	}

	private parseRequestArguments(args?: Map<string, string>): string {
		if (args === undefined) {
			return '';
		}

		const parts = [];
		for (const [key, val] of args) {
			if (val === '' || typeof val === 'undefined') {
				continue;
			}

			parts.push(`${key}=${encode(val)}`);
		}

		return (parts.length > 0 ? '?' : '') + parts.join('&');
	}
}

function encode(val: string): string {
	return encodeURIComponent(val)
		.replace(/%3A/gi, ':')
		.replace(/%24/g, '$')
		.replace(/%2C/gi, ',')
		.replace(/%20/g, '+')
		.replace(/%5B/gi, '[')
		.replace(/%5D/gi, ']');
}
