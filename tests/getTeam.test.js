process.env.AUTH_URL = '';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const authClient = require('../');
const mockTeams = require('./fixtures/teams');
const { transformTeam } = require("../dist/util/transformTeam");

const mock = new MockAdapter(axios);

mock.onGet('/api/v1/teams').reply(200, {
	status: 200,
	error: '',
	teams: [
		...Object.values(mockTeams)
	]
});

test('getTeam(): fetches and transforms teams correctly', async () => {
	for (const fixture of Object.values(mockTeams)) {
		const team = await authClient.getTeam('token', fixture._id);
		expect(team).toEqual(transformTeam(fixture));
	}
});

test('getTeam(): throws for non-existent team', async () => {
	await expect(authClient.getTeam('token', 'MissingNo.')).rejects.toThrow();
	await expect(authClient.getTeam('token', '')).rejects.toThrow();
	await expect(authClient.getTeam('token', undefined)).rejects.toThrow();
	await expect(authClient.getTeam('token', null)).rejects.toThrow();
});
