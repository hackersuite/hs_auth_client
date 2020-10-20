process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '..';

const mock = new MockAdapter(axios);

let authApi: authClient.AuthApi;
beforeAll(() => {
	authApi = new authClient.AuthApi('hs_test');
});

test('setRole(): updates user correctly', async () => {
	mock.onPut(`/api/v2/users/123/role`).reply(200, {
		status: 200,
		error: ''
	});

	const result = await authApi.setRole('token', 'applicant', '123');
	expect(result).toEqual(true);
});

test(`setRole(): throws when API response has error code`, async () => {
	const errorCodes = [400, 401, 404, 500];

	for (const errorCode of errorCodes) {
		mock.onPut('/api/v2/users/789/role').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authApi.setRole('token', 'organiser', '789')).rejects.toThrow();
	}
});
