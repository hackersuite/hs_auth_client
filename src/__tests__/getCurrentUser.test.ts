process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '../';
import { users as fixtures } from './fixtures/users';
import { transformExtendedUser } from '../util/transformUser';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

test('getCurrentUser(): fetches and transforms users correctly', async () => {
	for (const user of fixtures) {
		mock.onGet('/api/v1/users/me').reply(200, {
			status: 200,
			error: '',
			user
		});

		const response = await authClient.getCurrentUser('token', 'url');
		expect(response).toEqual(transformExtendedUser(user));
	}
});

test(`getCurrentUser(): throws when API response has error code`, async () => {
	const errorCodes = [400, 500];

	for (const errorCode of errorCodes) {
		mock.onGet('/api/v1/users/me').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authClient.getCurrentUser('token', 'url')).rejects.toThrow();
	}
});
