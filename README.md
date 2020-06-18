# HS_Auth_Client

![Tests](https://github.com/unicsmcr/hs_auth_client/workflows/Tests/badge.svg)
![Lint](https://github.com/unicsmcr/hs_auth_client/workflows/Lint/badge.svg)

## Use

```
$ npm install @unicsmcr/hs_auth_client
```

## Provides

### Two Exported TypeScript Type Definitions

**User**

- `id`: string
- `name`: string
- `email`: string
- `authLevel`: AuthLevels
- `team?`: string

**ExtendedUser**

- All the properties of `User`, as well as:
- `emailVerified`: boolean

**Team**

- `id`: string
- `name`: string
- `creator`: string
- `tableNumber?`: number

### Methods to query and post data

- **getCurrentUser**: (token: string, originalUrl: string) => Promise<ExtendedUser>

  > originalUrl can be accessed from req object -> req.originalUrl

- **getAllUsers**: (token: string) => Promise<User[]>
- **putCurrentUser**: (name: string, token: string) => Promise<void>
- **getTeams**: (token: string) => Promise<Team[]>;
- **getTeam**: (token: string, teamCode: string) => Promise<Team>

Token can be accessed from browser cookies under **Authorization**
