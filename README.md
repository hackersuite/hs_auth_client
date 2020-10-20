# Hacker Suite - Auth Client

A client for the [Hacker Suite Auth API](https://github.com/unicsmcr/hs_auth).

![Tests](https://github.com/unicsmcr/hs_auth_client/workflows/Tests/badge.svg)
![Lint](https://github.com/unicsmcr/hs_auth_client/workflows/Lint/badge.svg)
[![codecov](https://codecov.io/gh/unicsmcr/hs_auth_client/branch/main/graph/badge.svg)](https://codecov.io/gh/unicsmcr/hs_auth_client)



## Installation

```
npm install @unicsmcr/hs_auth_client
```

## Documentation

### Definitions

**User**

- `id`: string
- `name`: string
- `email`: string
- `team?`: string

**Team**

- `id`: string
- `name`: string
- `creator`: string
- `tableNumber?`: number

### Methods
- **getCurrentUser**: (token: string) => Promise\<User>;
- **getUser**: (token: string, userId: string) => Promise\<User>;
- **getUsers**: (token: string) => Promise\<User[]>;
- **getCurrentTeam**: (token: string) => Promise\<Team>;
- **getTeam**: (token: string, teamId: string) => Promise\<Team>;
- **getTeamMembers**: (token: string, teamId: string) => Promise\<User[]>;
- **getTeams**: (token: string) => Promise\<Team[]>;
- **setRole**: (token: string, role: string, userId: string) => Promise\<boolean>;
- **getAuthorizedResources**: (token: string, from: Array\<string>) => Promise\<Array\<string>>;
- **newUri**: (path: string, args: Map\<string, string>) => string;

Token can be accessed from browser cookies under **Authorization**

### Usage
```typescript
import { AuthApi } from '@unicsmcr/hs_auth_client';

const authApi = new AuthApi('hs_service');

const allUsers = await authApi.getUsers(token);
const user = await authApi.getCurrentUser(token);
```

## License

> Copyright 2020 UniCS
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.