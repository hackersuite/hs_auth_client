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

test('getUsers(): 0 users gives empty list', async () => {
	mock.onGet('/api/v2/users').reply(200, {
		status: 200,
		error: '',
		users: []
	});

	const users = await authApi.getUsers('token');
	expect(users.length).toEqual(0);
});

test('getUsers(): 1 user gives 1-item list', async () => {
	const fixture = fixtures[0];
	mock.onGet('/api/v2/users').reply(200, {
		status: 200,
		error: '',
		users: [
			fixture
		]
	});

	const users = await authApi.getUsers('token');
	expect(users.length).toEqual(1);
	expect(users[0]).toEqual(transformUser(fixture));
});

test('getUsers(): multiple users', async () => {
	mock.onGet('/api/v2/users').reply(200, {
		status: 200,
		error: '',
		users: fixtures
	});

	const response = await authApi.getUsers('token');
	expect(response).toEqual(fixtures.map(transformUser));
});

test(`getUsers(): throws when API response has error code`, async () => {
	const errorCodes = [400, 500];
	for (const errorCode of errorCodes) {
		mock.onGet('/api/v2/users').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authApi.getUsers('token')).rejects.toThrow();
	}
});
