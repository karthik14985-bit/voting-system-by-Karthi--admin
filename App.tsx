
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VotingDataProvider } from './context/VotingDataContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <VotingDataProvider>
        <Main />
      </VotingDataProvider>
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen text-textPrimary">
      {isAuthenticated ? <DashboardPage /> : <LoginPage />}
    </div>
  );
};

export default App;
