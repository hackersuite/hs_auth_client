process.env.AUTH_URL = '';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const authClient = require('../dist');
const mockUsers = require('./fixtures/users');

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

// To remove email_verified field
function restrict(user) {
	let copy = { ...user };
	delete copy['email_verified'];
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
	
	const user = users[0];
	expect(user.authId).toEqual(fixture._id);
	expect(user.authLevel).toEqual(3);
	expect(user.name).toEqual(fixture.name);
	expect(user.email).toEqual(fixture.email);
	expect(user.team).toBeUndefined();
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
	
	const user1 = users[0];
	expect(user1.authId).toEqual(fixture1._id);
	expect(user1.authLevel).toEqual(3);
	expect(user1.name).toEqual(fixture1.name);
	expect(user1.email).toEqual(fixture1.email);
	expect(user1.team).toBeUndefined();

	const user2 = users[1];
	expect(user2.authId).toEqual(fixture2._id);
	expect(user2.authLevel).toEqual(2);
	expect(user2.name).toEqual(fixture2.name);
	expect(user2.email).toEqual(fixture2.email);
	expect(user2.team).toEqual(fixture2.team);
});

const errorCodes = [400, 500];

for (const errorCode of errorCodes) {
	test(`getAllUsers(): throws when API response has ${errorCode} error`, async () => {
		mock.onGet('/api/v1/users').reply(400, {
			status: errorCode,
			error: 'Bad request'
		});
		await expect(authClient.getAllUsers('token')).rejects.toThrow();
	});	
}
