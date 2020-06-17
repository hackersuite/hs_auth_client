import axios, { AxiosResponse } from 'axios';

const AUTH_URL = process.env.AUTH_URL ?? '';

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

export function handleError<T extends AxiosResponse>(res: T): T {
	if (res.status >= 400 || res.data.status >= 400 || res.data.error) {
		throw new Error(res.data.error);
	}
	return res;
}

export async function getCurrentUser(token: string, originalUrl: string): Promise<AxiosResponse<AuthCurrentUserResponse>> {
	return axios.get(`${AUTH_URL}/api/v1/users/me`, {
		headers: {
			Authorization: token,
			Referer: originalUrl
		}
	});
}

export async function getAllUsers(token: string): Promise<AxiosResponse<AuthAllUsersResponse>> {
	return axios.get(`${AUTH_URL}/api/v1/users`, {
		headers: {
			Authorization: token
		}
	});
}

export async function putCurrentUser(name: string, token: string): Promise<AxiosResponse<AuthResponse>> {
	return axios.put(`${AUTH_URL}/api/v1/users/me`, {
		headers: {
			Authorization: token
		},
		body: {
			name
		}
	});
}

export async function getTeams(token: string): Promise<AxiosResponse<AuthAllTeamsResponse>> {
	return axios.get(`${AUTH_URL}/api/v1/teams`, {
		headers: {
			Authorization: token
		}
	});
}
