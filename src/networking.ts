import axios, { AxiosResponse } from 'axios';
import querystring from 'querystring';

export function getAuthUrl() {
	return `${process.env.AUTH_URL ?? ''}/api/v2`;
}

const AUTH_URL = getAuthUrl();

interface AuthResponse {
	status: number;
	error: string;
}

export interface AuthUser {
	_id: string;
	name: string;
	email: string;
	team: string;
	special_permissions?: string[];
}

export interface AuthTeam {
	_id: string;
	name: string;
	creator: string;
	table_no?: number;
}

export interface AuthUserResponse extends AuthResponse {
	user: AuthUser;
}

export interface AuthTeamResponse extends AuthResponse {
	team: AuthTeam;
}

export interface AuthAllUsersResponse extends AuthResponse {
	users: AuthUser[];
}

export interface AuthAllTeamsResponse extends AuthResponse {
	teams: AuthTeam[];
}

export interface AuthTeamMembersResponse extends AuthResponse {
	users: AuthUser[];
}

export interface AuthResourcesResponse extends AuthResponse {
	authorizedUris: string[];
}

export async function getUser(token: string, userId: string): Promise<AxiosResponse<AuthUserResponse>> {
	return axios.get(`${AUTH_URL}/users/${userId}`, {
		headers: {
			Authorization: token
		}
	});
}

export async function getUsers(token: string, teamIdFilter?: string): Promise<AxiosResponse<AuthAllUsersResponse>> {
	let teamQuery = '';
	if (teamIdFilter) {
		teamQuery = `?team=${teamIdFilter}`;
	}

	return axios.get(`${AUTH_URL}/users${teamQuery}`, {
		headers: {
			Authorization: token
		}
	});
}

export async function getTeam(token: string, teamId: string): Promise<AxiosResponse<AuthTeamResponse>> {
	return axios.get(`${AUTH_URL}/teams/${teamId}`, {
		headers: {
			Authorization: token
		}
	});
}

export async function getTeams(token: string): Promise<AxiosResponse<AuthAllTeamsResponse>> {
	return axios.get(`${AUTH_URL}/teams`, {
		headers: {
			Authorization: token
		}
	});
}

export async function setRole(token: string, userId: string, role: string): Promise<AxiosResponse<AuthResponse>> {
	return axios.put(`${AUTH_URL}/users/${userId}/role`, querystring.stringify({ role: role }), {
		headers: {
			'Authorization': token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}

export async function getAuthorizedResources(token: string, requestedResources: Array<string>, user?: string): Promise<AxiosResponse<AuthResourcesResponse>> {
	let url = `${AUTH_URL}/tokens/resources/authorized?from=${JSON.stringify(requestedResources)}`;
	if (user) {
		url += `&user=${user}`;
	}
	return axios.get(url, {
		headers: {
			Authorization: token
		}
	});
}
