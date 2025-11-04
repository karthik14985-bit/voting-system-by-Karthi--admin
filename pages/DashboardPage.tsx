
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { useVotingData } from '../hooks/useVotingData';
import { Tab, Candidate } from '../types';
import Button from '../components/Button';
import CandidateTable from '../components/CandidateTable';
import AuditLogTable from '../components/AuditLogTable';
import AnalyticsCard from '../components/AnalyticsCard';

const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const { candidates, voters, auditLogs, isLoading } = useVotingData();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Candidates);

  const totalVotes = useMemo(() => candidates.reduce((sum, c) => sum + c.votes, 0), [candidates]);
  const totalVoters = voters.length;
  const turnout = totalVoters > 0 ? (totalVotes / totalVoters * 100).toFixed(2) : '0.00';

  const chartData = candidates.map(c => ({ name: c.name, votes: c.votes }));

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Candidates:
        return <CandidateTable />;
      case Tab.Analytics:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <AnalyticsCard title="Total Votes Cast" value={totalVotes.toLocaleString()} />
              <AnalyticsCard title="Total Registered Voters" value={totalVoters.toLocaleString()} />
              <AnalyticsCard title="Voter Turnout" value={`${turnout}%`} />
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="mb-4 text-lg font-semibold text-textPrimary">Candidate Results</h3>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="votes" fill="#1565C0" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case Tab.AuditLog:
        return <AuditLogTable />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tab: Tab }> = ({ tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === tab 
          ? 'bg-primary text-white shadow' 
          : 'text-textSecondary hover:bg-gray-200'
      }`}
    >
      {tab}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
        <Button onClick={logout} variant="secondary">Logout</Button>
      </header>
      <main className="p-4 mx-auto max-w-7xl md:p-8">
        <div className="mb-6">
          <div className="flex p-1 space-x-1 bg-gray-100 rounded-lg">
            {Object.values(Tab).map(tab => <TabButton key={tab} tab={tab} />)}
          </div>
        </div>
        {isLoading && activeTab !== Tab.Analytics ? (
            <div className="flex items-center justify-center p-10 bg-white rounded-lg shadow">
                <svg className="w-8 h-8 mr-3 -ml-1 text-primary animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-textSecondary">Loading Data...</span>
            </div>
        ) : renderContent()}
      </main>
    </div>
  );
};

export default DashboardPage;
