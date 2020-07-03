process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '..';
import { teamMembers } from './fixtures/teamMembers';
import { transformUser } from '../util/transformUser';

const mock = new MockAdapter(axios);

mock.onGet('/api/v1/teams/123/members').reply(200, {
	status: 200,
	error: '',
	users: teamMembers[0]
});

mock.onGet('/api/v1/teams/456/members').reply(200, {
	status: 200,
	error: '',
	users: teamMembers[1]
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
	for (const team of teamMembers) {
		test(`${team.length} users`, async () => {
			expect(await authClient.getTeamMembers('token', team[0].team)).toEqual(team.map(transformUser));
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
