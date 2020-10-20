process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '..';
import { users as fixtures } from './fixtures/users';
import { transformUser } from '../util/transformUser';

const mock = new MockAdapter(axios);

let authApi: authClient.AuthApi;
beforeAll(() => {
	authApi = new authClient.AuthApi('hs_test');
});

test('getUser(): fetches and transforms users correctly', async () => {
	for (const fixture of fixtures) {
		mock.onGet(`/api/v2/users/${fixture._id}`).reply(200, {
			status: 200,
			error: '',
			user: fixture
		});

		const user = await authApi.getUser('token', fixture._id);
		expect(user).toEqual(transformUser(fixture));
	}
});

mock.onGet(`/api/v2/users/MissingNo.`).reply(404, {
	status: 404,
	error: ''
});
test('getUser(): throws for non-existent user', async () => {
	await expect(authApi.getUser('token', 'MissingNo.')).rejects.toThrow();
});
