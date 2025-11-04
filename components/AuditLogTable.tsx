
import React from 'react';
import { useVotingData } from '../hooks/useVotingData';

const AuditLogTable: React.FC = () => {
  const { auditLogs } = useVotingData();

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold text-textPrimary">Audit Log</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Action</th>
              <th scope="col" className="px-6 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map(log => (
              <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{log.action}</td>
                <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AuditLogTable;
