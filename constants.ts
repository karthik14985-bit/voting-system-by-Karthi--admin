
import { Candidate, Voter, AuditLog } from './types';

export const ADMIN_CREDENTIALS = {
  email: 'admin@vote.com',
  password: 'adminpassword123',
};

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    name: 'Eleanor Vance',
    party: 'Innovate Party',
    description: 'Championing technological progress and sustainable development.',
    photoUrl: 'https://picsum.photos/seed/eleanor/200',
    votes: 1250,
  },
  {
    id: 'c2',
    name: 'Marcus Thorne',
    party: 'Unity Alliance',
    description: 'Focused on social equity and community empowerment.',
    photoUrl: 'https://picsum.photos/seed/marcus/200',
    votes: 980,
  },
  {
    id: 'c3',
    name: 'Isabella Rossi',
    party: 'Green Future',
    description: 'Dedicated to environmental protection and renewable energy.',
    photoUrl: 'https://picsum.photos/seed/isabella/200',
    votes: 1520,
  },
  {
    id: 'c4',
    name: 'Julian Feng',
    party: 'Prosperity Front',
    description: 'Advocating for economic growth and fiscal responsibility.',
    photoUrl: '', // To test placeholder
    votes: 730,
  },
];

export const MOCK_VOTERS: Voter[] = Array.from({ length: 5000 }, (_, i) => ({
    id: `v${i + 1}`,
    name: `Voter ${i + 1}`,
    hasVoted: i < 3580, // Simulates some voters having voted
}));


export const MOCK_LOGS: AuditLog[] = [
    {
        id: 'l1',
        action: 'System initialized with mock data.',
        timestamp: new Date().toISOString(),
    }
];
