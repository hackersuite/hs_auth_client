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

test('getTeams(): 0 users gives empty list', async () => {
	mock.onGet('/api/v2/teams').reply(200, {
		status: 200,
		error: '',
		teams: []
	});

	const teams = await authApi.getTeams('token');
	expect(teams.length).toEqual(0);
});

test('getTeams(): 1 team', async () => {
	mock.onGet('/api/v2/teams').reply(200, {
		status: 200,
		error: '',
		teams: [fixtures[0]]
	});

	const response = await authApi.getTeams('token');
	expect(response).toEqual([transformTeam(fixtures[0])]);
});

test('getTeams(): multiple teams', async () => {
	mock.onGet('/api/v2/teams').reply(200, {
		status: 200,
		error: '',
		teams: fixtures
	});

	const response = await authApi.getTeams('token');
	expect(response).toEqual(fixtures.map(transformTeam));
});

test(`getTeams(): throws when API response has error code`, async () => {
	const errorCodes = [400, 500];
	for (const errorCode of errorCodes) {
		mock.onGet('/api/v2/teams').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authApi.getTeams('token')).rejects.toThrow();
	}
});
