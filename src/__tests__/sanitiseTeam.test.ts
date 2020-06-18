import { sanitiseTeam } from '../util/sanitiseTeam';

test(`Parses valid team IDs`, () => {
	const teams = [
		'123456',
		'abcdef',
		'1a2b3c4d5e6f7g8h9i0j',
		'5e2f142e714294ee19c1ad2a',
		'01',
		'000001'
	];
	for (const team of teams) {
		expect(sanitiseTeam(team)).toEqual(team);
	}
});

test(`Parses empty team IDs`, () => {
	const teams = [
		'0',
		'000',
		'000000000000000000000000'
	];
	for (const team of teams) {
		expect(sanitiseTeam(team)).toBeUndefined();
	}
});
