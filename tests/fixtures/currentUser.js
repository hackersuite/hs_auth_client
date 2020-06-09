exports.JohnDoe = {
	status: 200,
	error: '',
	user: {
		_id: '123456',
		name: 'John Doe',
		email: 'johndoe@gmail.com',
		email_verified: true,
		auth_level: 'volunteer',
		team: '000000000'
	}
};

exports.BadResponse = {
	status: 404,
	error: 'User does not exist'
};
