import { transformTeam } from '../util/transformTeam';
import { teams as fixtures } from './fixtures/teams';

test('Team 1 is transformed correctly', () => {
	const fixture = fixtures[0];
	const transformed = transformTeam(fixture);
	expect(transformed.id).toEqual(fixture._id);
	expect(transformed.name).toEqual(fixture.name);
	expect(transformed.creator).toEqual(fixture.creator);
	expect(transformed.tableNumber).toBeUndefined();
});

test('Team 2 is transformed correctly', () => {
	const fixture = fixtures[1];
	const transformed = transformTeam(fixture);
	expect(transformed.id).toEqual(fixture._id);
	expect(transformed.name).toEqual(fixture.name);
	expect(transformed.creator).toEqual(fixture.creator);
	expect(transformed.tableNumber).toEqual(fixture.table_no);
});

test('Team 3 is transformed correctly', () => {
	const fixture = fixtures[2];
	const transformed = transformTeam(fixture);
	expect(transformed.id).toEqual(fixture._id);
	expect(transformed.name).toEqual(fixture.name);
	expect(transformed.creator).toEqual(fixture.creator);
	expect(transformed.tableNumber).toEqual(fixture.table_no);
});
