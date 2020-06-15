process.env.AUTH_URL = '';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const authClient = require('../');

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

test('putCurrentUser: resolves on successful status code', async () => {

	mock.onPut('/api/v1/users/me').reply(200, {
			status: 200,
			error: ''
		});

	await expect(authClient.putCurrentUser('kilburn', 'token')).resolves.toBeUndefined();
});

const errorCodes = [400, 500];

for (const errorCode of errorCodes) {
	test(`putCurrentUser: throws when API response has ${errorCode} error`, async () => {
		mock.onPut('/api/v1/users/me').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authClient.putCurrentUser('kilburn', 'token')).rejects.toThrow();
	});	
}
