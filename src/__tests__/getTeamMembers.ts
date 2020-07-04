process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '..';
import { teamsWithMembers } from './fixtures/teamMembers';
import { transformUser } from '../util/transformUser';

const mock = new MockAdapter(axios);

mock.onGet('/api/v1/teams/123/members').reply(200, {
	status: 200,
	error: '',
	users: teamsWithMembers[0]
});

mock.onGet('/api/v1/teams/456/members').reply(200, {
	status: 200,
	error: '',
	users: teamsWithMembers[1]
});

mock.onGet('/api/v1/teams/789/members').reply(200, {
	status: 200,
	error: '',
	users: []
});

mock.onGet('/api/v1/teams/000000000000000000000000/members').reply(200, {
	status: 200,
	error: '',
	users: null
});

describe('getTeamMembers(): fetches members and transforms them', () => {
	for (const teamMembers of teamsWithMembers) {
		test(`${teamMembers.length} users`, async () => {
			expect(await authClient.getTeamMembers('token', teamMembers[0].team)).toEqual(teamMembers.map(transformUser));
		});
	}
});

describe('getTeamMembers(): handles empty teams', () => {
	for (const teamId of ['789', '000000000000000000000000']) {
		test(`Team: ${teamId} (should return empty list)`, async () => {
			expect(await authClient.getTeamMembers('token', teamId)).toEqual([]);
		});
	}
});

test('getTeamMembers(): throws for non-existent team', async () => {
	await expect(authClient.getTeamMembers('token', 'MissingNo.')).rejects.toThrow();
	await expect(authClient.getTeamMembers('token', '')).rejects.toThrow();
});
