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

test('getTeam(): fetches and transforms teams correctly', async () => {
	for (const fixture of fixtures) {
		mock.onGet(`/api/v2/teams/${fixture._id}`).reply(200, {
			status: 200,
			error: '',
			team: fixture
		});

		const team = await authApi.getTeam('token', fixture._id);
		expect(team).toEqual(transformTeam(fixture));
	}
});

mock.onGet(`/api/v2/teams/MissingNo.`).reply(404, {
	status: 404,
	error: ''
});

test('getTeam(): throws for non-existent team', async () => {
	await expect(authApi.getTeam('token', 'MissingNo.')).rejects.toThrow();
});
