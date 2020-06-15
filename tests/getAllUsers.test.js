process.env.AUTH_URL = '';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const authClient = require('../dist');
const mockUsers = require('./fixtures/users');
const { transformUser } = require('../dist/util/transformUser');

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

// To remove emailVerified field
function restrict(user) {
	let copy = { ...user };
	delete copy['emailVerified'];
	return copy;
}

test('getAllUsers(): 0 users gives empty list', async () => {

	mock.onGet('/api/v1/users').reply(200, {
		status: 200,
		error: '',
		users: []
	});

	const users = await authClient.getAllUsers('token');
	expect(users.length).toEqual(0);
});

test('getAllUsers(): 1 user gives 1-item list', async () => {

	const fixture = mockUsers.JohnDoe;
	mock.onGet('/api/v1/users').reply(200, {
		status: 200,
		error: '',
		users: [
			restrict(fixture)
		]
	});

	const users = await authClient.getAllUsers('token');
	expect(users.length).toEqual(1);
	expect(users[0]).toEqual(transformUser(restrict(fixture)));
});

test('getAllUsers(): 2 users gives 2-item list', async () => {

	const fixture1 = mockUsers.JohnDoe;
	const fixture2 = mockUsers.BobRoss;
	mock.onGet('/api/v1/users').reply(200, {
		status: 200,
		error: '',
		users: [
			restrict(fixture1),
			restrict(fixture2)
		]
	});

	const users = await authClient.getAllUsers('token');
	expect(users.length).toEqual(2);
	expect(users[0]).toEqual(transformUser(restrict(fixture1)));
	expect(users[1]).toEqual(transformUser(restrict(fixture2)));
});

const errorCodes = [400, 500];

for (const errorCode of errorCodes) {
	test(`getAllUsers(): throws when API response has ${errorCode} error`, async () => {
		mock.onGet('/api/v1/users').reply(errorCode, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authClient.getAllUsers('token')).rejects.toThrow();
	});	
}
