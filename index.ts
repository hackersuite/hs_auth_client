import * as req from "request-promise-native";

export type RequestUser = {
  authId: string;
  name: string;
  email: string;
  email_verified: boolean;
  authLevel: string;
  team?: string;
};

export type Team = {
  _id: string;
  name: string;
  creator: string;
  table_no?: number;
}

export const getCurrentUser = async (token: string, originalUrl: string): Promise<RequestUser> => {
  let res: string;
  try {
    res = await req.get(`${process.env.AUTH_URL}/api/v1/users/me`, {
      headers: {
        Authorization: token,
        Referer: originalUrl
      }
    });
  } catch (err) {
    throw new Error(err);
  }

  const user = JSON.parse(res);
  if (user.error && user.status >= 400) {
    throw new Error(user.error);
  }

  return {
    authId: user.user._id,
    name: user.user.name,
    email: user.user.email,
    email_verified: user.user.email_verified,
    authLevel: user.user.auth_level,
    team: user.user.team
  };
}


export const getAllUsers = async (token: string): Promise<RequestUser[]> => {
  let res;
  try {
    res = await req.get(`${process.env.AUTH_URL}/api/v1/users`, {
      headers: {
        Authorization: `${token}`
      }
    });
  } catch (err) { throw err; }

  const users = JSON.parse(res);
  if (users.error && users.status >= 400) { throw new Error(users.error); }

  return users.users.map((user: any) => (
    {
      authId: user._id,
      name: user.name,
      email: user.email,
      email_verified: user.email_verified,
      auth_level: user.authLevel,
      team: user.team
    }
  ));
}

export const putCurrentUser = async (name: string, token: string): Promise<void> => {
  const res = await req.put(`${process.env.AUTH_URL}/api/v1/users/me`, {
    headers: {
      Authorization: `${token}`
    },
    body: {
      name: `${name}`
    }
  });

  if (res.error && res.status >= 400) { throw res.error; }
}

export const getTeams = async (token: string): Promise<Team[]> => {
  let res: string;
  try {
    res = await req.get(`${process.env.AUTH_URL}/api/v1/teams/`, {
      headers: {
        Authorization: `${token}`,
      }
    })
  } catch (err) { throw new Error(err); }

  const teams: any = JSON.parse(res);
  if (teams.error && teams.status >= 400) { throw new Error(teams.error); }

  return teams.map((team: any) => ({
    _id: team.team._id,
    name: team.team.name,
    creator: team.team.creator,
    table_no: team.team.table_no
  }));
}

export const getTeam = async (token: string, teamCode: string): Promise<Team> => {
  const allTeams: Team[] = await getTeams(token);

  const team: Team | undefined = allTeams.find(team => team._id === teamCode)

  if (team === undefined) {
    throw new Error("Team not found")
  }

  return team;
}