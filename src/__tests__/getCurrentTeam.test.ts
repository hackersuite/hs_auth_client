process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '..';
import { teams as fixtures } from './fixtures/teams';
import { transformTeam } from '../util/transformTeam';

const mock = new MockAdapter(axios);

let authApi: authClient.AuthApi;
beforeAll(() => {
	authApi = new authClient.AuthApi('hs_test');
});

afterEach(() => {
	mock.reset();
});

test('getCurrentTeam(): fetches and transforms teams correctly', async () => {
	for (const team of fixtures) {
		mock.onGet('/api/v2/teams/me').reply(200, {
			status: 200,
			error: '',
			team
		});

		const response = await authApi.getCurrentTeam('token');
		expect(response).toEqual(transformTeam(team));
	}
});

test(`getCurrentTeam(): throws when team not found`, async () => {
	mock.onGet('/api/v2/teams/me').reply(400, {
		status: 400,
		error: 'some error'
	});
	await expect(authApi.getCurrentTeam('token')).rejects.toThrow();
});

test(`getCurrentTeam(): throws when API response has error code`, async () => {
	const errorCodes = [400, 500];

	for (const errorCode of errorCodes) {
		mock.onGet('/api/v2/users/me').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authApi.getCurrentTeam('token')).rejects.toThrow();
	}
});
