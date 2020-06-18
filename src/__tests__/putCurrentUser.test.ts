process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '..';

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


test(`putCurrentUser: throws when API response has error code`, async () => {
	const errorCodes = [400, 500];
	for (const errorCode of errorCodes) {
		mock.onPut('/api/v1/users/me').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authClient.putCurrentUser('kilburn', 'token')).rejects.toThrow();
	}
});
