process.env.AUTH_URL = '';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as authClient from '..';
import { users as fixtures } from './fixtures/users';
import { transformUser } from '../util/transformUser';

const mock = new MockAdapter(axios);

mock.onGet('/api/v1/users').reply(200, {
	status: 200,
	error: '',
	users: fixtures
});

test('getUser(): fetches and transforms users correctly', async () => {
	for (const fixture of fixtures) {
		const user = await authClient.getUser('token', fixture._id);
		expect(user).toEqual(transformUser(fixture));
	}
});

test('getUser(): throws for non-existent user', async () => {
	await expect(authClient.getUser('token', 'MissingNo.')).rejects.toThrow();
	await expect(authClient.getUser('token', '')).rejects.toThrow();
	await expect(authClient.getUser('token', fixtures[0]._id.repeat(2))).rejects.toThrow();
});
