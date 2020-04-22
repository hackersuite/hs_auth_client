"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const stringAuthLevels = new Map([
    ["unverified", 0 /* Unverified */],
    ["applicant", 2 /* Attendee */],
    ["attendee", 2 /* Attendee */],
    ["volunteer", 3 /* Volunteer */],
    ["organiser", 4 /* Organiser */]
]);
function convertAuthLevel(authLevel) {
    if (stringAuthLevels.has(authLevel)) {
        return stringAuthLevels.get(authLevel);
    }
    else {
        throw new Error("Auth Level Unknown");
    }
}
async function getCurrentUser(token, originalUrl) {
    let res;
    try {
        res = await axios_1.default.get(`${process.env.AUTH_URL}/api/v1/users/me`, {
            headers: {
                Authorization: token,
                Referer: originalUrl
            }
        });
    }
    catch (err) {
        throw new Error(err);
    }
    const data = res.data;
    if (data.error && data.status >= 400) {
        throw new Error(data.error);
    }
    return {
        authId: data.user._id,
        name: data.user.name,
        email: data.user.email,
        email_verified: data.user.email_verified,
        authLevel: convertAuthLevel(data.user.auth_level),
        team: Number(data.user.team) === 0 ? undefined : data.user.team
    };
}
exports.getCurrentUser = getCurrentUser;
async function getAllUsers(token) {
    let res;
    try {
        res = await axios_1.default.get(`${process.env.AUTH_URL}/api/v1/users`, {
            headers: {
                Authorization: token
            }
        });
    }
    catch (err) {
        throw err;
    }
    const data = res.data;
    if (data.error && data.status >= 400) {
        throw new Error(data.error);
    }
    return data.users.map((user) => ({
        authId: user._id,
        name: user.name,
        email: user.email,
        email_verified: user.email_verified,
        authLevel: convertAuthLevel(user.auth_level),
        team: Number(user.team) === 0 ? undefined : user.team
    }));
}
exports.getAllUsers = getAllUsers;
async function putCurrentUser(name, token) {
    const res = await axios_1.default.put(`${process.env.AUTH_URL}/api/v1/users/me`, {
        headers: {
            Authorization: token
        },
        body: {
            name: name
        }
    });
    if (res.data.error && res.status >= 400) {
        throw res.data.error;
    }
}
exports.putCurrentUser = putCurrentUser;
async function getTeams(token) {
    let res;
    try {
        res = await axios_1.default.get(`${process.env.AUTH_URL}/api/v1/teams/`, {
            headers: {
                Authorization: token,
            }
        });
    }
    catch (err) {
        throw new Error(err);
    }
    const data = res.data;
    if (data.error && data.status >= 400) {
        throw new Error(data.error);
    }
    return data.teams.map((team) => ({
        _id: team._id,
        name: team.name,
        creator: team.creator,
        table_no: team.table_no
    }));
}
exports.getTeams = getTeams;
async function getTeam(token, teamCode) {
    const allTeams = await getTeams(token);
    const team = allTeams.find(team => team._id === teamCode);
    if (team === undefined) {
        throw new Error("Team not found");
    }
    return team;
}
exports.getTeam = getTeam;
