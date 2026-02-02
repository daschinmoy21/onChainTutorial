import React, { useState } from 'react';
import { BlockchainExplorer } from '../components/BlockchainExplorer';

export const ExplorerPage: React.FC = () => {
  const [refreshTrigger] = useState(0);

  return (
    <div className="explorer-page">
      <BlockchainExplorer refreshTrigger={refreshTrigger} />
    </div>
  );
};