
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// The context/AuthContext.tsx file exports a named `useAuth` hook. 
// This file is to satisfy the project structure requirement but simply re-exports the hook.
// In a larger app, this file could add more logic on top of the context hook.

import { useAuth as useAuthFromContext } from '../context/AuthContext';

export const useAuth = useAuthFromContext;
