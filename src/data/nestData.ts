// Mock nest data for volunteer management

export interface Nest {
  id: string;
  beachId: string;
  beachName: string;
  turtleCount: number;
  hatchDate: string;
  declaredBy: string;
  declaredAt: string;
  status: 'active' | 'hatched' | 'failed';
  notes?: string;
}

// Initial mock nests
export const initialNests: Nest[] = [
  {
    id: 'nest-1',
    beachId: '1',
    beachName: 'Akumal Beach',
    turtleCount: 95,
    hatchDate: '2024-02-15',
    declaredBy: 'volunteer-demo',
    declaredAt: '2024-01-01T10:00:00Z',
    status: 'active',
    notes: 'Large nest near marker 5',
  },
  {
    id: 'nest-2',
    beachId: '2',
    beachName: 'Ras Al Jinz',
    turtleCount: 78,
    hatchDate: '2024-02-20',
    declaredBy: 'volunteer-demo',
    declaredAt: '2024-01-05T14:30:00Z',
    status: 'hatched',
  },
];

// Storage key
const NESTS_STORAGE_KEY = 'turtle_track_nests';

// Get nests from localStorage or use initial data
export function getNests(): Nest[] {
  const stored = localStorage.getItem(NESTS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return initialNests;
}

// Save nests to localStorage
export function saveNests(nests: Nest[]): void {
  localStorage.setItem(NESTS_STORAGE_KEY, JSON.stringify(nests));
}
