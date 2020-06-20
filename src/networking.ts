import axios, { AxiosResponse } from 'axios';

export function getAuthUrl() {
	return `${process.env.AUTH_URL ?? ''}/api/v1`;
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
	auth_level: string;
	team: string;
}

export interface ExtendedAuthUser extends AuthUser {
	email_verified: boolean;
}

export interface AuthTeam {
	_id: string;
	name: string;
	creator: string;
	table_no?: number;
}

export interface AuthCurrentUserResponse extends AuthResponse {
	user: ExtendedAuthUser;
}

export interface AuthAllUsersResponse extends AuthResponse {
	users: AuthUser[];
}

export interface AuthAllTeamsResponse extends AuthResponse {
	teams: AuthTeam[];
}

export async function getCurrentUser(token: string, originalUrl: string): Promise<AxiosResponse<AuthCurrentUserResponse>> {
	return axios.get(`${AUTH_URL}/users/me`, {
		headers: {
			Authorization: token,
			Referer: originalUrl
		}
	});
}

export async function getUsers(token: string): Promise<AxiosResponse<AuthAllUsersResponse>> {
	return axios.get(`${AUTH_URL}/users`, {
		headers: {
			Authorization: token
		}
	});
}

export async function putCurrentUser(name: string, token: string): Promise<AxiosResponse<AuthResponse>> {
	return axios.put(`${AUTH_URL}/users/me`, {
		headers: {
			Authorization: token
		},
		body: {
			name
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
