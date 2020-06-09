export function sanitiseTeam(team: string) {
	return Number(team) === 0 ? undefined : team;
}
