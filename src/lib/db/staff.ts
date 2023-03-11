import Information from "./server";
import { Team, Member } from "@lib/types/staffTeam";

export function length(a: any) {
  return a.length;
}

export async function getStaffRoles(): Promise<{ Members: Team[] }> {
  const result = await Information.query(
    `SELECT * FROM s_roles WHERE permission >= 4 ORDER BY permission DESC`
  );
  const roles: Team[] = result.rows.map((row) => ({
    [row.name]: [],
  }));
  return { Members: roles };
}

export async function getSRoles() {
  let roles;
  const result = await Information.query(
    `SELECT * FROM getroles ORDER BY id ASC`
  );
  //Return all roles found as an array
  if (length(result.rows) === 0) {
    roles = [];
  }
  roles = result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    permission: row.permission,
  }));
  return roles;
}

export async function getStaffMembers() {
  const staffRoles: { Members: Team[] } = await getStaffRoles();
  const result = await Information.query(`SELECT * FROM staffview`);

  if (length(result.rows) === 0) {
    return staffRoles;
  } else {
    result.rows.forEach((row) => {
      const SSID = JSON.parse(row.scoresaberdata);
      const member: Member = {
        Name: row.name,
        Image: row.image,
        Roles: JSON.parse(row.roles),
        ScoreSaberID: SSID[0],
        Discord: row.id,
        Twitter: row.twitter,
        Twitch: row.twitch,
      };
      staffRoles.Members.forEach((role) => {
        if (role[row.roleName]) {
          role[row.roleName].push(member);
        }
      });
    });
    return staffRoles;
  }
}
