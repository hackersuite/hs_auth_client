import { AuthLevels } from "../";

const stringAuthLevels = new Map<string, AuthLevels>([
  ["unverified", AuthLevels.Unverified],
  ["applicant", AuthLevels.Applicant],
  ["attendee", AuthLevels.Attendee],
  ["volunteer", AuthLevels.Volunteer],
  ["organiser", AuthLevels.Organiser]
]);

export function convertAuthLevel(authLevel: string): AuthLevels {
  if (stringAuthLevels.has(authLevel)) {
    return stringAuthLevels.get(authLevel) as AuthLevels
  } else {
    throw new Error("Auth Level Unknown");
  }
}
