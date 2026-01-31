
export type UserRole = 'none' | 'student' | 'driver';

export interface Coordinate {
  x: number;
  y: number;
}

export interface Stop {
  id: string;
  name: string;
  location: Coordinate;
}

export interface Route {
  id: string;
  name: string;
  color: string;
  path: Coordinate[];
  stops: string[]; // IDs of stops
}

export interface Bus {
  id: string;
  routeId: string;
  currentPosition: Coordinate;
  nextStopId: string;
  status: 'active' | 'maintenance' | 'delayed';
  occupancy: number; // 0 to 100 percentage
  speed: number;
  lastUpdated: Date;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
