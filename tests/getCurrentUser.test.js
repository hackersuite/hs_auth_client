process.env.AUTH_URL = '';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const authClient = require('../dist');
const users = require('./fixtures/users');

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

test('getCurrentUser(): user 1', async () => {
	const fixture = users.JohnDoe;

	mock.onGet('/api/v1/users/me').reply(200, {
		status: 200,
		error: '',
		user: fixture
	});

	const user = await authClient.getCurrentUser('token', 'url');
	expect(user.authId).toEqual(fixture._id);
	expect(user.authLevel).toEqual(3);
	expect(user.name).toEqual(fixture.name);
	expect(user.email).toEqual(fixture.email);
	expect(user.email_verified).toEqual(fixture.email_verified);
	expect(user.team).toBeUndefined();
});

test('getCurrentUser(): user 2', async () => {
	const fixture = users.BobRoss;

	mock.onGet('/api/v1/users/me').reply(200, {
		status: 200,
		error: '',
		user: fixture
	});

	const user = await authClient.getCurrentUser('token', 'url');
	expect(user.authId).toEqual(fixture._id);
	expect(user.authLevel).toEqual(2);
	expect(user.name).toEqual(fixture.name);
	expect(user.email).toEqual(fixture.email);
	expect(user.email_verified).toEqual(fixture.email_verified);
	expect(user.team).toEqual(fixture.team);
});

const errorCodes = [400, 500];

for (const errorCode of errorCodes) {
	test(`getCurrentUser(): throws when API response has ${errorCode} error`, async () => {
		mock.onGet('/api/v1/users/me').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authClient.getCurrentUser('token', 'url')).rejects.toThrow();
	});	
}
