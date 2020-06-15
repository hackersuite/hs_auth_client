import { AuthUser, ExtendedAuthUser } from "../networking";
import { User, ExtendedUser } from "..";
import { sanitiseTeam } from "./sanitiseTeam";
import { convertAuthLevel } from "./authLevel";

export function transformUser(raw: AuthUser): User {
	return {
		id: raw._id,
		authLevel: convertAuthLevel(raw.auth_level),
		email: raw.email,
		name: raw.name,
		team: sanitiseTeam(raw.team)
	}
}

export function transformExtendedUser(raw: ExtendedAuthUser): ExtendedUser {
	return {
		...transformUser(raw),
		emailVerified: raw.email_verified
	};
}
