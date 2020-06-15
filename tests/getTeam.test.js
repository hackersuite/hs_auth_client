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
		mockTeams.Team1,
		mockTeams.Team2
	]
});

test('getTeam(): 1st team', async () => {
	const team = await authClient.getTeam('token', mockTeams.Team1._id);
	expect(team).toEqual(transformTeam(mockTeams.Team1));
});

test('getTeam(): 2nd team', async () => {
	const team = await authClient.getTeam('token', mockTeams.Team2._id);
	expect(team).toEqual(transformTeam(mockTeams.Team2));
});

test('getTeam(): throws for non-existent team', async () => {
	await expect(authClient.getTeam('token', 'MissingNo.')).rejects.toThrow();
	await expect(authClient.getTeam('token', '')).rejects.toThrow();
	await expect(authClient.getTeam('token', undefined)).rejects.toThrow();
	await expect(authClient.getTeam('token', null)).rejects.toThrow();
});
