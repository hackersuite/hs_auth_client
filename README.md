# HS_AUTH_CLIENT

## Use
```
$ npm install @unicsmcr/hs_auth_client
```
## Provides
### Two Exported TypeScript Type Definitions

**RequestUser**

- `authId`: string
- `name`: string
- `email`: string
- `email_verified`: boolean
- `authLevel`: AuthLevels
- `team?`: string

**Team**

- `_id`: string
- `name`: string
- `creator`: string
- `table_no?`: number

### Methods to query and post data
- **getCurrentUser**: (token: string, originalUrl: string) => Promise<RequestUser>

    > originalUrl can be accessed from req object -> req.originalUrl
- **getAllUsers**: (token: string) => Promise<RequestUser[]>
- **putCurrentUser**: (name: string, token: string) => Promise<void>
- **getTeams**: (token: string) => Promise<Team[]>;
- **getTeam**: (token: string, teamCode: string) => Promise<Team>

Token can be accessed from browser cookies under **Authorization**
