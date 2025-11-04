
export interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
  photoUrl: string;
  votes: number;
}

export interface Voter {
  id: string;
  name: string;
  hasVoted: boolean;
}

export interface AuditLog {
  id: string;
  action: string;
  timestamp: string;
}

export enum Tab {
  Candidates = 'Candidates',
  Analytics = 'Analytics',
  AuditLog = 'Audit Log',
}
