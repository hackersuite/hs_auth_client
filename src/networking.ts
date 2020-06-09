import axios, { AxiosResponse } from "axios";

const AUTH_URL = process.env.AUTH_URL;

interface AuthResponse {
	status: number;
	error: string;
}

export interface AuthCurrentUserResponse extends AuthResponse {
	user: {
		_id: string;
		name: string;
		email: string;
		email_verified: boolean;
		auth_level: string;
		team: string;
	};
}

function handleError<T extends AxiosResponse<AuthResponse>>(res: T): T {
	if (res.status >= 400 || res.data.status >= 400 || res.data.error) {
		throw new Error(res.data.error);
	}
	return res;
}

export async function getCurrentUser(token: string, originalUrl: string): Promise<AxiosResponse<AuthCurrentUserResponse>> {
	const res = await axios.get(`${AUTH_URL}/api/v1/users/me`, {
		headers: {
			Authorization: token,
			Referer: originalUrl
		}
	}) as AxiosResponse<AuthCurrentUserResponse>;
	return handleError(res);
}
