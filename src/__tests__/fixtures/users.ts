import { ExtendedAuthUser } from '../../networking';

export const users: ExtendedAuthUser[] = [
	{
		_id: '123456',
		name: 'John Doe',
		email: 'johndoe@gmail.com',
		email_verified: true,
		auth_level: 'volunteer',
		team: '000000000'
	},
	{
		_id: '1a2b3c4d5e',
		name: 'Bob Ross',
		email: 'bobross@outlook.com',
		email_verified: true,
		auth_level: 'attendee',
		team: '6f7g8h9i10j'
	}
];
