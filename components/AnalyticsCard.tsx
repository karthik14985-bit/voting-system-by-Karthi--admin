
import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-sm font-medium text-textSecondary">{title}</h3>
      <p className="mt-1 text-3xl font-semibold text-textPrimary">{value}</p>
    </div>
  );
};

export default AnalyticsCard;
