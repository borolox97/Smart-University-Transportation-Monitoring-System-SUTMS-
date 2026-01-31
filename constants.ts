
import { Route, Stop } from './types';

export const CAMPUS_STOPS: Stop[] = [
  { id: 'S1', name: 'Main Gate', location: { x: 50, y: 450 } },
  { id: 'S2', name: 'Engineering Block', location: { x: 200, y: 350 } },
  { id: 'S3', name: 'Science Plaza', location: { x: 400, y: 300 } },
  { id: 'S4', name: 'Student Union', location: { x: 550, y: 400 } },
  { id: 'S5', name: 'Library Central', location: { x: 700, y: 200 } },
  { id: 'S6', name: 'Medical Center', location: { x: 850, y: 450 } },
  { id: 'S7', name: 'Dormitory North', location: { x: 600, y: 50 } },
  { id: 'S8', name: 'Athletic Field', location: { x: 250, y: 100 } },
];

export const ROUTES: Route[] = [
  {
    id: 'R1',
    name: 'Blue Express',
    color: '#3b82f6',
    path: [
      { x: 50, y: 450 }, { x: 200, y: 350 }, { x: 400, y: 300 }, 
      { x: 550, y: 400 }, { x: 850, y: 450 }, { x: 700, y: 200 }, { x: 50, y: 450 }
    ],
    stops: ['S1', 'S2', 'S3', 'S4', 'S6', 'S5']
  },
  {
    id: 'R2',
    name: 'Green Perimeter',
    color: '#10b981',
    path: [
      { x: 250, y: 100 }, { x: 600, y: 50 }, { x: 700, y: 200 }, 
      { x: 850, y: 450 }, { x: 550, y: 400 }, { x: 250, y: 100 }
    ],
    stops: ['S8', 'S7', 'S5', 'S6', 'S4']
  },
  {
    id: 'R3',
    name: 'Red Academic',
    color: '#ef4444',
    path: [
      { x: 50, y: 450 }, { x: 250, y: 100 }, { x: 400, y: 300 }, 
      { x: 200, y: 350 }, { x: 50, y: 450 }
    ],
    stops: ['S1', 'S8', 'S3', 'S2']
  }
];
