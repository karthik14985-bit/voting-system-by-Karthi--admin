
import React, { useState } from 'react';
import { useVotingData } from '../hooks/useVotingData';
import { Candidate } from '../types';
import Button from './Button';
import Modal from './Modal';
import CandidateForm from './CandidateForm';

const CandidateTable: React.FC = () => {
  const { candidates, deleteCandidate } = useVotingData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidateToEdit, setCandidateToEdit] = useState<Candidate | null>(null);

  const handleAdd = () => {
    setCandidateToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (candidate: Candidate) => {
    setCandidateToEdit(candidate);
    setIsModalOpen(true);
  };
  
  const handleDelete = (candidate: Candidate) => {
    if (window.confirm(`Are you sure you want to delete ${candidate.name}?`)) {
      deleteCandidate(candidate.id);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-textPrimary">Manage Candidates</h2>
        <Button onClick={handleAdd}>Add New Candidate</Button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Photo</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Party</th>
              <th scope="col" className="px-6 py-3">Vote Count</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(candidate => (
              <tr key={candidate.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img 
                    src={candidate.photoUrl || `https://picsum.photos/seed/${candidate.id}/200`} 
                    alt={candidate.name} 
                    className="w-10 h-10 rounded-full" 
                  />
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {candidate.name}
                </th>
                <td className="px-6 py-4">{candidate.party}</td>
                <td className="px-6 py-4">{candidate.votes.toLocaleString()}</td>
                <td className="px-6 py-4 space-x-2">
                  <Button onClick={() => handleEdit(candidate)} variant="secondary" className="px-3 py-1 text-xs">Edit</Button>
                  <Button onClick={() => handleDelete(candidate)} variant="danger" className="px-3 py-1 text-xs">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={candidateToEdit ? 'Edit Candidate' : 'Add New Candidate'}>
        <CandidateForm candidateToEdit={candidateToEdit} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default CandidateTable;
