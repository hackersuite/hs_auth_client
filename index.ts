import * as req from "request-promise-native";

import { RequestUser, Team } from "./types";


export const getCurrentUser = async (token: string): Promise<RequestUser> => {
  let res: string;
  try {
    res =  await req.get(`${process.env.AUTH_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `${token}`,
      }
    })
  } catch (err) { throw err; }

  const user: any  = JSON.parse(res);
  if (user.error && user.status >= 400 )
    throw user.error;

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    email_verified: user.email_verified,
    auth_level: user.auth_level,
    team: user.team
  };
}


export const getAllUsers = async (token: string): Promise<RequestUser[]> => {
  let res;
  try {
    res =  await req.get(`${process.env.AUTH_URL}/api/v1/users`, {
      headers: {
        Authorization: `${token}`
      }
    });
  } catch (err) { throw err; }

  const users: any = JSON.parse(res);
  if (users.error && users.status >= 400 ) { throw users.error; }
  
  return users.map( (user: RequestUser) => (
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      email_verified: user.email_verified,
      auth_level: user.auth_level,
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

  if (res.error && res.status >= 400 ) { throw res.error; }
}

export const getTeams = async (token: string): Promise<Team[]> => {
  let res: string;
  try {
    res = await req.get(`${process.env.AUTH_URL}/api/v1/teams/`, {
      headers: {
        Authorization: `${token}`,
      }
    })
  } catch (err) { throw err; }

  const teams: any = JSON.parse(res);
  if (teams.error && teams.status >= 400 ) { throw teams.error; }

  return teams.map( (team: Team) => (
    {
      _id: team._id,
      name: team.name,
      creator: team.creator
    }
  ))
}