export interface Turtle {
  id: string;
  name: string;
  species: string;
  speciesScientific: string;
  age: number;
  weight: number;
  length: number;
  status: 'active' | 'nesting' | 'migrating' | 'resting';
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  threatLevel: 'low' | 'medium' | 'high';
  lastSeen: string;
  temperature: number;
  speed: number;
  depth: number;
  image: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  migrationTrail: { lat: number; lng: number }[];
  taggedDate: string;
  totalDistance: number;
}

export interface Beach {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  country: string;
  nestCount: number;
  volunteers: number;
  threatLevel: 'low' | 'medium' | 'high';
  threats: string[];
  recentActivity: {
    date: string;
    event: string;
  }[];
  image: string;
  description: string;
}

export interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'info';
  title: string;
  message: string;
  turtleId?: string;
  beachId?: string;
  timestamp: string;
}

export interface Stats {
  totalTurtles: number;
  activeTurtles: number;
  nestingBeaches: number;
  totalNests: number;
  volunteersActive: number;
  alertsToday: number;
  turtlesBySpecies: { species: string; count: number }[];
  monthlyNests: { month: string; count: number }[];
  migrationDistances: { turtleId: string; name: string; distance: number }[];
}

export const turtles: Turtle[] = [
  {
    id: 't1',
    name: 'Marina',
    species: 'Green Sea Turtle',
    speciesScientific: 'Chelonia mydas',
    age: 25,
    weight: 180,
    length: 105,
    status: 'migrating',
    healthStatus: 'excellent',
    threatLevel: 'low',
    lastSeen: '2024-01-15T10:30:00Z',
    temperature: 26.5,
    speed: 2.3,
    depth: 15,
    image: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=800',
    description: 'Marina is a healthy adult female green sea turtle who has been tracked since 2019. She regularly nests on the beaches of Costa Rica.',
    location: { lat: 9.7489, lng: -83.7534 },
    migrationTrail: [
      { lat: 9.7489, lng: -83.7534 },
      { lat: 10.2, lng: -84.1 },
      { lat: 10.8, lng: -85.2 },
      { lat: 11.5, lng: -86.0 },
      { lat: 12.1, lng: -86.8 },
    ],
    taggedDate: '2019-06-15',
    totalDistance: 4523,
  },
  {
    id: 't2',
    name: 'Atlas',
    species: 'Loggerhead',
    speciesScientific: 'Caretta caretta',
    age: 32,
    weight: 135,
    length: 95,
    status: 'active',
    healthStatus: 'good',
    threatLevel: 'medium',
    lastSeen: '2024-01-15T08:15:00Z',
    temperature: 24.2,
    speed: 1.8,
    depth: 28,
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800',
    description: 'Atlas is a veteran male loggerhead who has been navigating the Atlantic for over three decades. He is known for his extensive migration routes.',
    location: { lat: 25.7617, lng: -80.1918 },
    migrationTrail: [
      { lat: 25.7617, lng: -80.1918 },
      { lat: 26.5, lng: -79.5 },
      { lat: 27.8, lng: -78.2 },
      { lat: 29.2, lng: -76.8 },
    ],
    taggedDate: '2015-08-22',
    totalDistance: 12847,
  },
  {
    id: 't3',
    name: 'Coral',
    species: 'Hawksbill',
    speciesScientific: 'Eretmochelys imbricata',
    age: 18,
    weight: 68,
    length: 78,
    status: 'nesting',
    healthStatus: 'excellent',
    threatLevel: 'high',
    lastSeen: '2024-01-15T06:45:00Z',
    temperature: 28.1,
    speed: 0.5,
    depth: 3,
    image: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=800',
    description: 'Coral is a critically endangered hawksbill turtle currently nesting in the Caribbean. Her beautiful shell pattern makes her easily identifiable.',
    location: { lat: 18.2208, lng: -66.5901 },
    migrationTrail: [
      { lat: 18.2208, lng: -66.5901 },
      { lat: 18.4, lng: -66.2 },
      { lat: 18.6, lng: -65.8 },
    ],
    taggedDate: '2020-03-10',
    totalDistance: 2156,
  },
  {
    id: 't4',
    name: 'Neptune',
    species: 'Leatherback',
    speciesScientific: 'Dermochelys coriacea',
    age: 45,
    weight: 580,
    length: 175,
    status: 'migrating',
    healthStatus: 'good',
    threatLevel: 'medium',
    lastSeen: '2024-01-15T12:00:00Z',
    temperature: 18.5,
    speed: 3.2,
    depth: 250,
    image: 'https://images.unsplash.com/photo-1571987937535-3dc2bac4b34e?w=800',
    description: 'Neptune is a magnificent leatherback, the largest of all sea turtle species. He regularly dives to extreme depths in search of jellyfish.',
    location: { lat: 35.6762, lng: -10.5698 },
    migrationTrail: [
      { lat: 35.6762, lng: -10.5698 },
      { lat: 33.2, lng: -15.4 },
      { lat: 30.1, lng: -20.8 },
      { lat: 25.5, lng: -28.2 },
      { lat: 18.8, lng: -35.6 },
    ],
    taggedDate: '2012-11-05',
    totalDistance: 28934,
  },
  {
    id: 't5',
    name: 'Sandy',
    species: 'Olive Ridley',
    speciesScientific: 'Lepidochelys olivacea',
    age: 15,
    weight: 45,
    length: 65,
    status: 'resting',
    healthStatus: 'fair',
    threatLevel: 'high',
    lastSeen: '2024-01-14T22:30:00Z',
    temperature: 27.8,
    speed: 0.2,
    depth: 5,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
    description: 'Sandy is recovering from a minor injury caused by fishing nets. She is currently in a protected area being monitored closely.',
    location: { lat: 15.8700, lng: -97.0769 },
    migrationTrail: [
      { lat: 15.8700, lng: -97.0769 },
      { lat: 16.2, lng: -96.5 },
    ],
    taggedDate: '2021-07-18',
    totalDistance: 1823,
  },
  {
    id: 't6',
    name: 'Luna',
    species: 'Green Sea Turtle',
    speciesScientific: 'Chelonia mydas',
    age: 12,
    weight: 95,
    length: 72,
    status: 'active',
    healthStatus: 'excellent',
    threatLevel: 'low',
    lastSeen: '2024-01-15T09:00:00Z',
    temperature: 25.3,
    speed: 2.1,
    depth: 12,
    image: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=800',
    description: 'Luna is a young adult green sea turtle with a distinctive star-shaped marking on her shell. She frequents seagrass meadows near the Great Barrier Reef.',
    location: { lat: -16.9186, lng: 145.7781 },
    migrationTrail: [
      { lat: -16.9186, lng: 145.7781 },
      { lat: -17.5, lng: 146.2 },
      { lat: -18.2, lng: 146.8 },
    ],
    taggedDate: '2022-02-14',
    totalDistance: 987,
  },
];

export const beaches: Beach[] = [
  {
    id: 'b1',
    name: 'Tortuguero Beach',
    location: { lat: 10.5432, lng: -83.5024 },
    country: 'Costa Rica',
    nestCount: 234,
    volunteers: 45,
    threatLevel: 'low',
    threats: ['Light pollution', 'Beach erosion'],
    recentActivity: [
      { date: '2024-01-15', event: 'New nest discovered - Green Sea Turtle' },
      { date: '2024-01-14', event: '67 hatchlings emerged and reached the ocean' },
      { date: '2024-01-13', event: 'Beach patrol completed - no threats detected' },
    ],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    description: 'One of the most important nesting sites for green sea turtles in the Western Hemisphere.',
  },
  {
    id: 'b2',
    name: 'Mon Repos Beach',
    location: { lat: -24.8059, lng: 152.4418 },
    country: 'Australia',
    nestCount: 189,
    volunteers: 32,
    threatLevel: 'medium',
    threats: ['Climate change', 'Predators', 'Light pollution'],
    recentActivity: [
      { date: '2024-01-15', event: 'Nest protection barriers installed' },
      { date: '2024-01-14', event: '2 new loggerhead nests recorded' },
    ],
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800',
    description: 'Australia\'s most accessible turtle rookery and an important research site.',
  },
  {
    id: 'b3',
    name: 'Raine Island',
    location: { lat: -11.5946, lng: 144.0356 },
    country: 'Australia',
    nestCount: 456,
    volunteers: 18,
    threatLevel: 'high',
    threats: ['Sea level rise', 'Beach flooding', 'Nest inundation'],
    recentActivity: [
      { date: '2024-01-15', event: 'Emergency nest relocation due to flooding' },
      { date: '2024-01-14', event: 'Beach restoration project phase 2 completed' },
    ],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    description: 'The largest green turtle nesting site in the world, facing significant climate threats.',
  },
  {
    id: 'b4',
    name: 'Archie Carr NWR',
    location: { lat: 27.8589, lng: -80.4456 },
    country: 'United States',
    nestCount: 312,
    volunteers: 67,
    threatLevel: 'medium',
    threats: ['Coastal development', 'Artificial lighting', 'Beach nourishment'],
    recentActivity: [
      { date: '2024-01-15', event: 'Night patrol recorded 5 nesting attempts' },
      { date: '2024-01-13', event: 'Light ordinance enforcement completed' },
    ],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
    description: 'The most important nesting beach for loggerhead sea turtles in the Western Hemisphere.',
  },
  {
    id: 'b5',
    name: 'Playa Escobilla',
    location: { lat: 15.8700, lng: -97.0769 },
    country: 'Mexico',
    nestCount: 892,
    volunteers: 23,
    threatLevel: 'medium',
    threats: ['Poaching', 'Fishing nets', 'Plastic pollution'],
    recentActivity: [
      { date: '2024-01-15', event: 'Arribada event monitoring in progress' },
      { date: '2024-01-12', event: 'Beach cleanup removed 500kg of debris' },
    ],
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    description: 'Famous for spectacular mass nesting events (arribadas) of olive ridley turtles.',
  },
];

export const alerts: Alert[] = [
  {
    id: 'a1',
    type: 'danger',
    title: 'Fishing Net Detected',
    message: 'Sandy (Olive Ridley) showing signs of entanglement. Rescue team dispatched.',
    turtleId: 't5',
    timestamp: '2024-01-15T14:30:00Z',
  },
  {
    id: 'a2',
    type: 'warning',
    title: 'Storm Approaching',
    message: 'Tropical storm warning for Tortuguero Beach. Nest protection measures activated.',
    beachId: 'b1',
    timestamp: '2024-01-15T12:00:00Z',
  },
  {
    id: 'a3',
    type: 'info',
    title: 'New Nest Discovered',
    message: 'Coral (Hawksbill) has successfully nested. 127 eggs recorded.',
    turtleId: 't3',
    timestamp: '2024-01-15T06:45:00Z',
  },
  {
    id: 'a4',
    type: 'warning',
    title: 'High Temperature Alert',
    message: 'Nest temperatures at Raine Island exceeding safe thresholds.',
    beachId: 'b3',
    timestamp: '2024-01-15T10:15:00Z',
  },
];

export const stats: Stats = {
  totalTurtles: 1247,
  activeTurtles: 892,
  nestingBeaches: 156,
  totalNests: 4567,
  volunteersActive: 2341,
  alertsToday: 12,
  turtlesBySpecies: [
    { species: 'Green Sea Turtle', count: 423 },
    { species: 'Loggerhead', count: 312 },
    { species: 'Hawksbill', count: 156 },
    { species: 'Leatherback', count: 89 },
    { species: 'Olive Ridley', count: 267 },
  ],
  monthlyNests: [
    { month: 'Jan', count: 234 },
    { month: 'Feb', count: 189 },
    { month: 'Mar', count: 156 },
    { month: 'Apr', count: 312 },
    { month: 'May', count: 456 },
    { month: 'Jun', count: 678 },
    { month: 'Jul', count: 892 },
    { month: 'Aug', count: 756 },
    { month: 'Sep', count: 534 },
    { month: 'Oct', count: 345 },
    { month: 'Nov', count: 234 },
    { month: 'Dec', count: 189 },
  ],
  migrationDistances: [
    { turtleId: 't4', name: 'Neptune', distance: 28934 },
    { turtleId: 't2', name: 'Atlas', distance: 12847 },
    { turtleId: 't1', name: 'Marina', distance: 4523 },
    { turtleId: 't3', name: 'Coral', distance: 2156 },
    { turtleId: 't5', name: 'Sandy', distance: 1823 },
  ],
};

export const speciesInfo = [
  {
    name: 'Green Sea Turtle',
    scientific: 'Chelonia mydas',
    status: 'Endangered',
    description: 'Named for the green color of their fat, not their shells. They are the only herbivorous sea turtle species.',
    diet: 'Seagrasses and algae',
    size: 'Up to 1.5m and 200kg',
    lifespan: '80+ years',
    threats: ['Habitat loss', 'Fishing bycatch', 'Climate change'],
    image: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=800',
  },
  {
    name: 'Loggerhead',
    scientific: 'Caretta caretta',
    status: 'Vulnerable',
    description: 'Named for their large heads, which support powerful jaws for crushing hard-shelled prey.',
    diet: 'Crabs, mollusks, jellyfish',
    size: 'Up to 1.2m and 180kg',
    lifespan: '70+ years',
    threats: ['Coastal development', 'Marine pollution', 'Fisheries bycatch'],
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800',
  },
  {
    name: 'Hawksbill',
    scientific: 'Eretmochelys imbricata',
    status: 'Critically Endangered',
    description: 'Known for their beautiful shells, which led to extensive hunting. Essential for coral reef health.',
    diet: 'Sponges, anemones, squid',
    size: 'Up to 1m and 80kg',
    lifespan: '50+ years',
    threats: ['Shell trade', 'Coral reef degradation', 'Egg poaching'],
    image: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=800',
  },
  {
    name: 'Leatherback',
    scientific: 'Dermochelys coriacea',
    status: 'Vulnerable',
    description: 'The largest sea turtle and one of the deepest diving animals. They lack a hard shell.',
    diet: 'Jellyfish, soft-bodied animals',
    size: 'Up to 2m and 700kg',
    lifespan: '45+ years',
    threats: ['Plastic pollution', 'Fisheries interactions', 'Egg harvesting'],
    image: 'https://images.unsplash.com/photo-1571987937535-3dc2bac4b34e?w=800',
  },
  {
    name: 'Olive Ridley',
    scientific: 'Lepidochelys olivacea',
    status: 'Vulnerable',
    description: 'Famous for mass nesting events called "arribadas" where thousands nest simultaneously.',
    diet: 'Crabs, shrimp, algae, fish',
    size: 'Up to 70cm and 50kg',
    lifespan: '50+ years',
    threats: ['Fishing nets', 'Egg harvesting', 'Habitat destruction'],
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
  },
];
