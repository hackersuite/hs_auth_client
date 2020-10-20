import { AuthUser } from '../../networking';

export const users: AuthUser[] = [
	{
		_id: '123456',
		name: 'John Doe',
		email: 'johndoe@gmail.com',
		role: 'volunteer',
		team: '000000000000000000000000'
	},
	{
		_id: '1a2b3c4d5e',
		name: 'Bob Ross',
		email: 'bobross@outlook.com',
		role: 'attendee',
		team: '6f7g8h9i10j'
	}
];
