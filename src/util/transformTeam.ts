import { AuthTeam } from "../networking";
import { Team } from "..";

export function transformTeam(raw: AuthTeam): Team {
	return {
		id: raw._id,
		creator: raw.creator,
		name: raw.name,
		tableNumber: raw.table_no ? raw.table_no : undefined
	};
}
