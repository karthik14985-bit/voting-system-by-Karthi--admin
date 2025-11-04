import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { Candidate, Voter, AuditLog } from '../types';
import * as storage from '../services/storageService';

interface VotingDataContextType {
  candidates: Candidate[];
  voters: Voter[];
  auditLogs: AuditLog[];
  isLoading: boolean;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'votes'>) => Promise<void>;
  updateCandidate: (candidate: Candidate) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;
}

// Fix: Export VotingDataContext to be available for imports.
export const VotingDataContext = createContext<VotingDataContextType | undefined>(undefined);

export const VotingDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [voters, setVoters] = useState<Voter[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = useCallback(() => {
    setIsLoading(true);
    // Simulate async data loading
    setTimeout(() => {
      storage.initializeData();
      setCandidates(storage.getCandidates());
      setVoters(storage.getVoters());
      setAuditLogs(storage.getAuditLogs());
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addLog = useCallback((action: string) => {
    const newLog: AuditLog = {
      id: `l-${Date.now()}`,
      action,
      timestamp: new Date().toISOString(),
    };
    const updatedLogs = [newLog, ...auditLogs];
    setAuditLogs(updatedLogs);
    storage.setAuditLogs(updatedLogs);
  }, [auditLogs]);
  
  const addCandidate = async (candidateData: Omit<Candidate, 'id' | 'votes'>): Promise<void> => {
    setIsLoading(true);
    return new Promise(resolve => setTimeout(() => {
      const newCandidate: Candidate = {
        ...candidateData,
        id: `c-${Date.now()}`,
        votes: 0,
        photoUrl: candidateData.photoUrl || `https://picsum.photos/seed/${Date.now()}/200`,
      };
      const updatedCandidates = [...candidates, newCandidate];
      setCandidates(updatedCandidates);
      storage.setCandidates(updatedCandidates);
      addLog(`Added new candidate: ${newCandidate.name}`);
      setIsLoading(false);
      resolve();
    }, 500));
  };
  
  const updateCandidate = async (updatedCandidate: Candidate): Promise<void> => {
    setIsLoading(true);
    return new Promise(resolve => setTimeout(() => {
      const updatedCandidates = candidates.map(c => c.id === updatedCandidate.id ? updatedCandidate : c);
      setCandidates(updatedCandidates);
      storage.setCandidates(updatedCandidates);
      addLog(`Updated candidate: ${updatedCandidate.name}`);
      setIsLoading(false);
      resolve();
    }, 500));
  };
  
  const deleteCandidate = async (id: string): Promise<void> => {
    setIsLoading(true);
    return new Promise(resolve => setTimeout(() => {
      const candidateToDelete = candidates.find(c => c.id === id);
      const updatedCandidates = candidates.filter(c => c.id !== id);
      setCandidates(updatedCandidates);
      storage.setCandidates(updatedCandidates);
      if (candidateToDelete) {
        addLog(`Deleted candidate: ${candidateToDelete.name}`);
      }
      setIsLoading(false);
      resolve();
    }, 500));
  };

  return (
    <VotingDataContext.Provider value={{ candidates, voters, auditLogs, isLoading, addCandidate, updateCandidate, deleteCandidate }}>
      {children}
    </VotingDataContext.Provider>
  );
};

export const useVotingData = (): VotingDataContextType => {
  const context = useContext(VotingDataContext);
  if (!context) {
    throw new Error('useVotingData must be used within a VotingDataProvider');
  }
  return context;
};
