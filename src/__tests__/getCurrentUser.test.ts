process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '../';
import { users as fixtures } from './fixtures/users';
import { transformUser } from '../util/transformUser';

const mock = new MockAdapter(axios);

let authApi: authClient.AuthApi;
beforeAll(() => {
	authApi = new authClient.AuthApi('hs_test');
});

afterEach(() => {
	mock.reset();
});

test('getCurrentUser(): fetches and transforms users correctly', async () => {
	for (const user of fixtures) {
		mock.onGet('/api/v2/users/me').reply(200, {
			status: 200,
			error: '',
			user
		});

		const response = await authApi.getCurrentUser('token');
		expect(response).toEqual(transformUser(user));
	}
});

test(`getCurrentUser(): throws when API response has error code`, async () => {
	const errorCodes = [400, 401, 404, 500];

	for (const errorCode of errorCodes) {
		mock.onGet('/api/v2/users/me').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authApi.getCurrentUser('token')).rejects.toThrow();
	}
});
