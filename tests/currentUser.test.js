process.env.AUTH_URL = '';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const authClient = require('../dist');
const fixtures = require('./fixtures');

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.restore();
});

test('getCurrentUser(): John Doe', async () => {
	const fixture = fixtures.currentUser.JohnDoe;

	mock.onGet('/api/v1/users/me').reply(200, fixture);

	const user = await authClient.getCurrentUser('token', 'url');
	expect(user.authId).toEqual(fixture.user._id);
	expect(user.authLevel).toEqual(3);
	expect(user.name).toEqual(fixture.user.name);
	expect(user.email).toEqual(fixture.user.email);
	expect(user.email_verified).toEqual(fixture.user.email_verified);
	expect(user.team).toBeUndefined();
});

test('getCurrentUser(): throws when API response has error', async () => {
	const fixture = fixtures.currentUser.BadResponse;
	mock.onGet('/api/v1/users/me').reply(404, fixture);
	await expect(authClient.getCurrentUser('token', 'url')).rejects.toThrow();
});
