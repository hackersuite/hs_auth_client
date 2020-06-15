const { transformTeam } = require('../dist/util/transformTeam');
const fixtures = require('./fixtures/teams');

test('Team 1 is transformed correctly', () => {
	const fixture = fixtures.Team1;
	const transformed = transformTeam(fixture);
	expect(transformed.id).toEqual(fixture._id);
	expect(transformed.name).toEqual(fixture.name);
	expect(transformed.creator).toEqual(fixture.creator);
	expect(transformed.tableNumber).toBeUndefined();
});

test('Team 2 is transformed correctly', () => {
	const fixture = fixtures.Team2;
	const transformed = transformTeam(fixture);
	expect(transformed.id).toEqual(fixture._id);
	expect(transformed.name).toEqual(fixture.name);
	expect(transformed.creator).toEqual(fixture.creator);
	expect(transformed.tableNumber).toEqual(fixture.table_no);
});
