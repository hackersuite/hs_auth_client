import axios, { AxiosResponse } from "axios";
import * as networking from './networking';

export const enum AuthLevels {
  // NOTE: the auth levels must be in ascending order
  Unverified,
  Applicant,
  Attendee,
  Volunteer,
  Organiser
}
const stringAuthLevels = new Map<string, AuthLevels>([
  ["unverified", AuthLevels.Unverified],
  ["applicant", AuthLevels.Applicant],
  ["attendee", AuthLevels.Attendee],
  ["volunteer", AuthLevels.Volunteer],
  ["organiser", AuthLevels.Organiser]
]);
function convertAuthLevel(authLevel: string): AuthLevels {
  if (stringAuthLevels.has(authLevel)) {
    return stringAuthLevels.get(authLevel) as AuthLevels
  } else {
    throw new Error("Auth Level Unknown");
  }
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
  const res = await networking.getCurrentUser(token, originalUrl);

  return {
    authId: res.data.user._id,
    name: res.data.user.name,
    email: res.data.user.email,
    email_verified: res.data.user.email_verified,
    authLevel: convertAuthLevel(res.data.user.auth_level),
    team: Number(res.data.user.team) === 0 ? undefined : res.data.user.team
  };
}

export async function getAllUsers(token: string): Promise<RequestUser[]> {
  const res = await networking.getAllUsers(token);

  return res.data.users.map((user: any) => (
    {
      authId: user._id,
      name: user.name,
      email: user.email,
      email_verified: user.email_verified,
      authLevel: convertAuthLevel(user.auth_level),
      team: Number(user.team) === 0 ? undefined : user.team
    }
  ));
}

export async function putCurrentUser(name: string, token: string): Promise<void> {
  const res: AxiosResponse<any> = await axios.put(`${process.env.AUTH_URL}/api/v1/users/me`, {
    headers: {
      Authorization: token
    },
    body: {
      name: name
    }
  });

  if (res.data.error && res.status >= 400) { throw res.data.error; }
}

export async function getTeams(token: string): Promise<Team[]> {
  let res: AxiosResponse<any>;
  try {
    res = await axios.get(`${process.env.AUTH_URL}/api/v1/teams/`, {
      headers: {
        Authorization: token,
      }
    })
  } catch (err) { throw new Error(err); }

  const data: any = res.data;
  if (data.error && data.status >= 400) { throw new Error(data.error); }

  return data.teams.map((team: any) => ({
    _id: team._id,
    name: team.name,
    creator: team.creator,
    table_no: team.table_no
  }));
}

export async function getTeam(token: string, teamCode: string): Promise<Team> {
  const allTeams: Team[] = await getTeams(token);

  const team: Team | undefined = allTeams.find(team => team._id === teamCode)

  if (team === undefined) {
    throw new Error("Team not found")
  }

  return team;
}