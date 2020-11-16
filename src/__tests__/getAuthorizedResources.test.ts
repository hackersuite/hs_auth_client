process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '..';

const mock = new MockAdapter(axios);

let authApi: authClient.AuthApi;
beforeAll(() => {
	authApi = new authClient.AuthApi('hs_test');
});

test('getAuthorizedResources(): get authorized resources correctly', async () => {
	mock.onGet(`/api/v2/tokens/resources/authorized?from=["hs:test"]`).reply(200, {
		status: 200,
		error: '',
		authorizedUris: ['hs:test']
	});

	const response = await authApi.getAuthorizedResources('token', ['hs:test']);
	expect(response).toEqual(['hs:test']);
});

test('getAuthorizedResources(): get authorized resources correctly for user', async () => {
	mock.onGet(`/api/v2/tokens/resources/authorized?from=["hs:test"]&user=123abc`).reply(200, {
		status: 200,
		error: '',
		authorizedUris: ['hs:test']
	});

	const response = await authApi.getAuthorizedResources('token', ['hs:test'], '123abc');
	expect(response).toEqual(['hs:test']);
});

test(`getAuthorizedResources(): throws when API response has error code`, async () => {
	const errorCodes = [400, 401, 404, 500];

	for (const errorCode of errorCodes) {
		mock.onGet('/api/v2/tokens/resources/authorized?from=["hs:test"]').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authApi.getAuthorizedResources('token', ['hs:test'])).rejects.toThrow();
	}
});
