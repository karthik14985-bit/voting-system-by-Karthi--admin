
import React, { useState, useEffect } from 'react';
import { Candidate } from '../types';
import { useVotingData } from '../hooks/useVotingData';
import Input from './Input';
import Button from './Button';

interface CandidateFormProps {
  candidateToEdit: Candidate | null;
  onClose: () => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ candidateToEdit, onClose }) => {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { addCandidate, updateCandidate } = useVotingData();

  useEffect(() => {
    if (candidateToEdit) {
      setName(candidateToEdit.name);
      setParty(candidateToEdit.party);
      setDescription(candidateToEdit.description);
      setPhotoUrl(candidateToEdit.photoUrl);
    } else {
      setName('');
      setParty('');
      setDescription('');
      setPhotoUrl('');
    }
  }, [candidateToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (candidateToEdit) {
      await updateCandidate({ ...candidateToEdit, name, party, description, photoUrl });
    } else {
      await addCandidate({ name, party, description, photoUrl });
    }
    
    setIsLoading(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Name" id="name" value={name} onChange={e => setName(e.target.value)} required />
      <Input label="Party" id="party" value={party} onChange={e => setParty(e.target.value)} required />
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          required
        ></textarea>
      </div>
      <Input label="Photo URL (optional)" id="photoUrl" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
      <div className="flex justify-end pt-4 space-x-2">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>{candidateToEdit ? 'Update Candidate' : 'Add Candidate'}</Button>
      </div>
    </form>
  );
};

export default CandidateForm;
