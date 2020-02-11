import * as req from "request-promise-native";


export const getCurrentUser = async (): Promise<string> => {
  return req.get(`${process.env.AUTH_URL}/api/v1/users/me`, {
    headers: {
      Authorization: `${req.cookies["Authorization"]}`,
      Referer: req.originalUrl
    }
  });
}

export const getAllUsers = async (): Promise<any> => {
  return req.get(`${process.env.AUTH_URL}/api/v1/users`, {
    headers: {
      Authorization: `${req.cookies["Authorization"]}`
    }
  });
}

export const putCurrentUser = async (): Promise<void> => {
  req.put(`${process.env.AUTH_URL}/api/v1/users/me`, {
    headers: {
      Authorization: `${req.cookies["Authorization"]}`
    },
    body: {
      name: `${name}`
    }
  });
}

export const getTeams = async (): Promise<string> => {
  return req.get(`${process.env.AUTH_URL}/api/v1/teams/`, {
    headers: {
      Authorization: `${req.cookies["Authorization"]}`
    }
  });
}

export const getTeam = async (teamCode: string ): Promise<string> => {
  return req.get(`${process.env.AUTH_URL}/api/v1/teams/${teamCode}`, {
    headers: {
      Authorization: `${req.cookies["Authorization"]}`
    }
  });
}

export const getTeamMembers = async (teamCode: string): Promise<string> => {
  return req.get(`${process.env.AUTH_URL}/api/v1/teams/${teamCode}/members`, {
    headers: {
      Authorization: `${req.cookies["Authorization"]}`
    }
  });
}