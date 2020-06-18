import { convertAuthLevel } from '../util/authLevel';

test('unverified is 0', () => {
	expect(convertAuthLevel('unverified')).toEqual(0);
});

test('applicant is 1', () => {
	expect(convertAuthLevel('applicant')).toEqual(1);
});

test('attendee is 2', () => {
	expect(convertAuthLevel('attendee')).toEqual(2);
});

test('volunteer is 3', () => {
	expect(convertAuthLevel('volunteer')).toEqual(3);
});

test('organiser is 4', () => {
	expect(convertAuthLevel('organiser')).toEqual(4);
});

test('throws for invalid auth level', () => {
	expect(() => convertAuthLevel('god')).toThrow();
});
