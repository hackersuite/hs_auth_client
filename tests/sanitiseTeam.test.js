const { sanitiseTeam } = require('../dist/util/sanitiseTeam');

const validTeams = [
	'123456',
	'abcdef',
	'1a2b3c4d5e6f7g8h9i0j',
	'5e2f142e714294ee19c1ad2a'
];

const invalidTeams = [
	undefined,
	null,
	'0',
	'000',
	'000000000000000000000000'
];

for (const team of validTeams) {
	test(`${team} is valid`, () => {
		expect(sanitiseTeam(team)).toEqual(team);
	});
}

for (const team of invalidTeams) {
	test(`${team} is invalid`, () => {
		expect(sanitiseTeam(team)).toBeUndefined();
	});
}
