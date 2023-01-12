export enum CalendarType {
  "grid",
  "list",
}

export interface Config {
  view: CalendarType;
  months: number | null;
}

export interface EventType {
  id: string;
  name: string;
  description: string;
  url: string;
  color: string;
  textColor: string;
  maxEntries: number;
  timeControl: string;
  eventType: string;
  defaultPrice: string;
  canRegister: boolean;
}

export interface APICalendarEvent {
  id: string;
  name: string;
  description: string;
  rounds: number;
  time: string | null;
  timeControl: string | null;
  startDate: string;
  endDate: string;
  maxEntries: number;
  entryCount: number;
  complete: boolean;
  cancelled: boolean;
  isLive: boolean;
  active: string;
  eventType: string;
  color: string | null;
  textColor: string | null;
  url: string;
  isFull: boolean;
}

export interface EventInterface {
  timeControl: string;
  eventType: string;
  time: string;
  description: string;
  id: string;
  maxEntries: number;
  name: string;
  eventTypeId: string;
  cancelled: false;
  endDate: null;
  rounds: number;
  entryCount: number;
  complete: boolean;
  startDate: string;
  isLive: boolean;
}

export interface CalendarEvent {
  id: string;
  name: string;
  description: string | null;
  rounds: number | null;
  timeControl: string | null;
  startDate: string;
  endDate: string | null;
  maxEntries: number;
  entryCount: number | null;
  complete: boolean;
  cancelled: boolean;
  isLive: boolean;
  active: string;
  eventType: string;
  color: string | null;
  textColor: string | null;
  url: string;
  isFull: boolean;
}
