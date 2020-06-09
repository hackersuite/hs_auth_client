process.env.AUTH_URL = '';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const authClient = require('../dist');
const mockTeams = require('./fixtures/teams');

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
	expect(team._id).toEqual(mockTeams.Team1._id);
	expect(team.name).toEqual(mockTeams.Team1.name);
	expect(team.creator).toEqual(mockTeams.Team1.creator);
});

test('getTeam(): 2nd team', async () => {
	const team = await authClient.getTeam('token', mockTeams.Team2._id);
	expect(team._id).toEqual(mockTeams.Team2._id);
	expect(team.name).toEqual(mockTeams.Team2.name);
	expect(team.creator).toEqual(mockTeams.Team2.creator);
});

test('getTeam(): throws for non-existent team', async () => {
	await expect(authClient.getTeam('token', 'MissingNo.')).rejects.toThrow();
	await expect(authClient.getTeam('token', '')).rejects.toThrow();
	await expect(authClient.getTeam('token', undefined)).rejects.toThrow();
	await expect(authClient.getTeam('token', null)).rejects.toThrow();
});
