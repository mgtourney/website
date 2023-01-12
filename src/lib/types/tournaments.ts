export interface Tournament {
  id: number;
  tournamentname?: string;
  staff?: string;
  players?: string;
  state?: number;
  startdate?: Date;
  enddate?: Date;
  mappools?: MapPool | MapPool[];
  mappool?: MapPool | MapPool[];
  bracket?: string;
  signupstatus?: number;
  twitchchannel?: string;
  public?: boolean;
  image?: string;
  apikey?: string | string[];
}

export interface MapPool {
  id: number | number[];
  round: number | number[];
  public: boolean | boolean[];
  qualifier: boolean | boolean[];
  image: string | string[];
  songs: Song[] | Song[][];
}

export interface Song {
  name: string;
  bsr: number;
  diff: number;
}

export interface Mods {
  name: string;
}
