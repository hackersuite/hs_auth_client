process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '../';
import { users as fixtures } from './fixtures/users';
import { transformUser } from '../util/transformUser';
import { ExtendedAuthUser } from '../networking';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

// To remove emailVerified field
function restrict(user: ExtendedAuthUser) {
	const copy = { ...user };
	delete copy.email_verified;
	return copy;
}

test('getUsers(): 0 users gives empty list', async () => {
	mock.onGet('/api/v1/users').reply(200, {
		status: 200,
		error: '',
		users: []
	});

	const users = await authClient.getUsers('token');
	expect(users.length).toEqual(0);
});

test('getUsers(): 1 user gives 1-item list', async () => {
	const fixture = fixtures[0];
	mock.onGet('/api/v1/users').reply(200, {
		status: 200,
		error: '',
		users: [
			restrict(fixture)
		]
	});

	const users = await authClient.getUsers('token');
	expect(users.length).toEqual(1);
	expect(users[0]).toEqual(transformUser(restrict(fixture)));
});

test('getUsers(): multiple users', async () => {
	const users = fixtures.map(restrict);

	mock.onGet('/api/v1/users').reply(200, {
		status: 200,
		error: '',
		users
	});

	const response = await authClient.getUsers('token');
	expect(response).toEqual(users.map(transformUser));
});

test(`getUsers(): throws when API response has error code`, async () => {
	const errorCodes = [400, 500];
	for (const errorCode of errorCodes) {
		mock.onGet('/api/v1/users').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authClient.getUsers('token')).rejects.toThrow();
	}
});
