export interface User {
  id: string;
  name: string;
  permissions: number;
  image: string;
  roles: string[];
  scoresaberdata: ScoreSaber[];
  twitter: string;
  twitch: string;
  discord: string;
  previous_tourneys: PlayerTournament[];
  rating?: number;
  pronouns: string;
  banned?: boolean;
}

export interface ScoreSaber {
  id: string;
  rank: number;
  countryrank: number;
  country: string;
}

export interface PlayerTournament {
  ID: number;
  Name: string;
  FinishedPlacement?: number;
  Rated: boolean;
}
