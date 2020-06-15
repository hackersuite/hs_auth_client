process.env.AUTH_URL = '';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const authClient = require('../');
const mockTeams = require('./fixtures/teams');
const { transformTeam } = require("../dist/util/transformTeam");

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

test('getTeams(): 0 users gives empty list', async () => {

	mock.onGet('/api/v1/teams').reply(200, {
		status: 200,
		error: '',
		teams: []
	});

	const teams = await authClient.getTeams('token');
	expect(teams.length).toEqual(0);
});

test('getTeams(): 1 team gives 1-item list', async () => {

	const fixture = mockTeams.Team1;
	mock.onGet('/api/v1/teams').reply(200, {
		status: 200,
		error: '',
		teams: [
			fixture
		]
	});

	const teams = await authClient.getTeams('token');
	expect(teams.length).toEqual(1);
	expect(teams[0]).toEqual(transformTeam(fixture));
});

test('getTeams(): 2 teams gives 2-item list', async () => {

	const fixture1 = mockTeams.Team1;
	const fixture2 = mockTeams.Team2;
	mock.onGet('/api/v1/teams').reply(200, {
		status: 200,
		error: '',
		teams: [
			fixture1,
			fixture2
		]
	});

	const teams = await authClient.getTeams('token');
	expect(teams.length).toEqual(2);
	expect(teams[0]).toEqual(transformTeam(fixture1));
	expect(teams[1]).toEqual(transformTeam(fixture2));
});

const errorCodes = [400, 500];

for (const errorCode of errorCodes) {
	test(`getTeams(): throws when API response has ${errorCode} error`, async () => {
		mock.onGet('/api/v1/teams').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authClient.getTeams('token')).rejects.toThrow();
	});	
}
