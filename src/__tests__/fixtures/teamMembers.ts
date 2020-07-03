import { AuthUser } from '../../networking';

export type TeamMembers = AuthUser[];

export const teamMembers: TeamMembers[] = [
	// 2-person team
	[
		{
			_id: '123456',
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			auth_level: 'attendee',
			team: '123'
		},
		{
			_id: '1a2b3c4d5e',
			name: 'Bob Ross',
			email: 'bobross@outlook.com',
			auth_level: 'attendee',
			team: '123'
		}
	],
	// 1-person team
	[
		{
			_id: '34646573456',
			name: 'Kilburn',
			email: 'kilburn@gmail.com',
			auth_level: 'attendee',
			team: '456'
		}
	]
];
