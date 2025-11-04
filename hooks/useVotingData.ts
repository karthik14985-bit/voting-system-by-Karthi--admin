
import { useContext } from 'react';
import { VotingDataContext } from '../context/VotingDataContext';

// The context/VotingDataContext.tsx file exports a named `useVotingData` hook. 
// This file is to satisfy the project structure requirement but simply re-exports the hook.

import { useVotingData as useVotingDataFromContext } from '../context/VotingDataContext';

export const useVotingData = useVotingDataFromContext;
