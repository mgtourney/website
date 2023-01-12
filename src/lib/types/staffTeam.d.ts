export interface StaffTeam {
  [key: string]: Team;
}

export interface Team {
  [key: string]: any[];
}

export interface Member {
  Id?: string;
  Image?: string;
  Name?: string;
  Roles?: [];
  ScoreSaberID?: string;
  Discord?: string;
  Twitter?: string;
  Twitch?: string;
}
