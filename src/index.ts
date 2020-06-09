import axios, { AxiosResponse } from "axios";
import * as networking from './networking';
import { convertAuthLevel } from "./util/authLevel";
import { sanitiseTeam } from "./util/sanitiseTeam";

export const enum AuthLevels {
  // NOTE: the auth levels must be in ascending order
  Unverified,
  Applicant,
  Attendee,
  Volunteer,
  Organiser
}

export type RequestUser = {
  authId: string;
  name: string;
  email: string;
  email_verified: boolean;
  authLevel: AuthLevels;
  team?: string;
};

export type Team = {
  _id: string;
  name: string;
  creator: string;
  table_no?: number;
}

export async function getCurrentUser(token: string, originalUrl: string): Promise<RequestUser> {
  const res = networking.handleError(await networking.getCurrentUser(token, originalUrl));

  return {
    authId: res.data.user._id,
    name: res.data.user.name,
    email: res.data.user.email,
    email_verified: res.data.user.email_verified,
    authLevel: convertAuthLevel(res.data.user.auth_level),
    team: sanitiseTeam(res.data.user.team)
  };
}

export async function getAllUsers(token: string): Promise<RequestUser[]> {
  const res = networking.handleError(await networking.getAllUsers(token));

  return res.data.users.map((user: any) => (
    {
      authId: user._id,
      name: user.name,
      email: user.email,
      email_verified: user.email_verified,
      authLevel: convertAuthLevel(user.auth_level),
      team: sanitiseTeam(user.team)
    }
  ));
}

export async function putCurrentUser(name: string, token: string): Promise<void> {
  networking.handleError(await networking.putCurrentUser(name, token));
}

export async function getTeams(token: string): Promise<Team[]> {
  const res = networking.handleError(await networking.getTeams(token));

  return res.data.teams;
}

export async function getTeam(token: string, teamCode: string): Promise<Team> {
  const allTeams: Team[] = await getTeams(token);

  const team: Team | undefined = allTeams.find(team => team._id === teamCode)

  if (team === undefined) {
    throw new Error("Team not found")
  }

  return team;
}
