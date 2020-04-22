export declare const enum AuthLevels {
    Unverified = 0,
    Applicant = 1,
    Attendee = 2,
    Volunteer = 3,
    Organiser = 4
}
export declare type RequestUser = {
    authId: string;
    name: string;
    email: string;
    email_verified: boolean;
    authLevel: AuthLevels;
    team?: string;
};
export declare type Team = {
    _id: string;
    name: string;
    creator: string;
    table_no?: number;
};
export declare function getCurrentUser(token: string, originalUrl: string): Promise<RequestUser>;
export declare function getAllUsers(token: string): Promise<RequestUser[]>;
export declare function putCurrentUser(name: string, token: string): Promise<void>;
export declare function getTeams(token: string): Promise<Team[]>;
export declare function getTeam(token: string, teamCode: string): Promise<Team>;
