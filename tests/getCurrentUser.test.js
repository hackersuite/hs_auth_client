process.env.AUTH_URL = '';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const authClient = require('../dist');
const users = require('./fixtures/users');
const { transformExtendedUser } = require('../dist/util/transformUser');

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
	expect(user).toEqual(transformExtendedUser(fixture));
});

test('getCurrentUser(): user 2', async () => {
	const fixture = users.BobRoss;

	mock.onGet('/api/v1/users/me').reply(200, {
		status: 200,
		error: '',
		user: fixture
	});

	const user = await authClient.getCurrentUser('token', 'url');
	expect(user).toEqual(transformExtendedUser(fixture));
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
