import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RotateCw } from 'lucide-react';
import { blockchainService } from '../services/blockchain';

export const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkConnection = async () => {
    try {
      const connected = await blockchainService.isConnected();
      setIsConnected(connected);
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
    // Check connection status every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isChecking) {
    return (
      <div className="connection-status checking">
        <span className="status-dot"></span>
        <span>Checking...</span>
      </div>
    );
  }

  return (
    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
      {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
      <span className="status-dot"></span>
      <span>{isConnected ? 'Connected to Blockchain' : 'Blockchain Offline'}</span>
      {!isConnected && (
        <button onClick={checkConnection} className="retry-connection">
          <RotateCw size={14} />
        </button>
      )}
    </div>
  );
};