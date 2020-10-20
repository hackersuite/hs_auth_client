process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '..';
import { teamsWithMembers } from './fixtures/teamMembers';
import { transformUser } from '../util/transformUser';

const mock = new MockAdapter(axios);

let authApi: authClient.AuthApi;
beforeAll(() => {
	authApi = new authClient.AuthApi('hs_test');
});

mock.onGet('/api/v2/users?team=123').reply(200, {
	status: 200,
	error: '',
	users: teamsWithMembers[0]
});

mock.onGet('/api/v2/users?team=456').reply(200, {
	status: 200,
	error: '',
	users: teamsWithMembers[1]
});

mock.onGet('/api/v2/users?team=789').reply(404, {
	status: 404,
	error: 'team not found'
});

mock.onGet('/api/v2/users?team=invalid').reply(400, {
	status: 400,
	error: 'invalid id'
});

describe('getTeamMembers(): fetches members and transforms them', () => {
	for (const teamMembers of teamsWithMembers) {
		test(`${teamMembers.length} users`, async () => {
			const a = await authApi.getTeamMembers('token', teamMembers[0].team);
			const e = teamMembers.map(transformUser);
			expect(a).toEqual(e);
		});
	}
});

test('getTeamMembers(): throws for non-existent team', async () => {
	await expect(authApi.getTeamMembers('token', '789')).rejects.toThrow();
	await expect(authApi.getTeamMembers('token', 'invalid')).rejects.toThrow();
});
