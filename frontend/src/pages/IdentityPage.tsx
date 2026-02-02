import React from 'react';
import { IdentityForm } from '../components/IdentityForm';

export const IdentityPage: React.FC = () => {
  const handleTransactionSubmitted = (hash: string, blockNumber: number) => {
    console.log('Transaction submitted:', { hash, blockNumber });
  };

  return (
    <div className="identity-page">
      <IdentityForm onTransactionSubmitted={handleTransactionSubmitted} />
    </div>
  );
};