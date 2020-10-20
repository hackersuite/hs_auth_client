import { AuthUser } from '../../networking';

export type TeamMembers = AuthUser[];

export const teamsWithMembers: TeamMembers[] = [
	// 2-person team
	[
		{
			_id: '123456',
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			team: '123'
		},
		{
			_id: '1a2b3c4d5e',
			name: 'Bob Ross',
			email: 'bobross@outlook.com',
			team: '123'
		}
	],
	// 1-person team
	[
		{
			_id: '34646573456',
			name: 'Kilburn',
			email: 'kilburn@gmail.com',
			team: '456'
		}
	]
];
