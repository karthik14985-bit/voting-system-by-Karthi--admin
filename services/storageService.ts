
import { MOCK_CANDIDATES, MOCK_VOTERS, MOCK_LOGS } from '../constants';
import { Candidate, Voter, AuditLog } from '../types';

const CANDIDATES_KEY = 'voting_system_candidates';
const VOTERS_KEY = 'voting_system_voters';
const LOGS_KEY = 'voting_system_logs';

const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const setToStorage = <T,>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

export const initializeData = () => {
    if (!localStorage.getItem(CANDIDATES_KEY)) {
        setToStorage(CANDIDATES_KEY, MOCK_CANDIDATES);
    }
    if (!localStorage.getItem(VOTERS_KEY)) {
        setToStorage(VOTERS_KEY, MOCK_VOTERS);
    }
    if (!localStorage.getItem(LOGS_KEY)) {
        setToStorage(LOGS_KEY, MOCK_LOGS);
    }
};

export const getCandidates = (): Candidate[] => getFromStorage(CANDIDATES_KEY, []);
export const setCandidates = (candidates: Candidate[]) => setToStorage(CANDIDATES_KEY, candidates);

export const getVoters = (): Voter[] => getFromStorage(VOTERS_KEY, []);
export const setVoters = (voters: Voter[]) => setToStorage(VOTERS_KEY, voters);

export const getAuditLogs = (): AuditLog[] => getFromStorage(LOGS_KEY, []);
export const setAuditLogs = (logs: AuditLog[]) => setToStorage(LOGS_KEY, logs);
