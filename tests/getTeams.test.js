process.env.AUTH_URL = '';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const authClient = require('../dist');
const mockTeams = require('./fixtures/teams');

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
	
	const team = teams[0];
	expect(team._id).toEqual(fixture._id);
	expect(team.name).toEqual(fixture.name);
	expect(team.creator).toEqual(fixture.creator);
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
	
	const team1 = teams[0];
	expect(team1._id).toEqual(fixture1._id);
	expect(team1.name).toEqual(fixture1.name);
	expect(team1.creator).toEqual(fixture1.creator);

	const team2 = teams[1];
	expect(team2._id).toEqual(fixture2._id);
	expect(team2.name).toEqual(fixture2.name);
	expect(team2.creator).toEqual(fixture2.creator);
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
