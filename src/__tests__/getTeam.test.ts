process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '..';
import { teams as fixtures } from './fixtures/teams';
import { transformTeam } from '../util/transformTeam';

const mock = new MockAdapter(axios);

mock.onGet('/api/v1/teams').reply(200, {
	status: 200,
	error: '',
	teams: fixtures
});

test('getTeam(): fetches and transforms teams correctly', async () => {
	for (const fixture of fixtures) {
		const team = await authClient.getTeam('token', fixture._id);
		expect(team).toEqual(transformTeam(fixture));
	}
});

test('getTeam(): throws for non-existent team', async () => {
	await expect(authClient.getTeam('token', 'MissingNo.')).rejects.toThrow();
	await expect(authClient.getTeam('token', '')).rejects.toThrow();
});
