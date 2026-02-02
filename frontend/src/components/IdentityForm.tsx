import React, { useState } from 'react';
import { Send, CheckCircle, Clock, AlertCircle, Sparkles, BookOpen, Hash, Layers } from 'lucide-react';
import { blockchainService } from '../services/blockchain';

interface IdentityFormProps {
  onTransactionSubmitted?: (hash: string, blockNumber: number) => void;
}

export const IdentityForm: React.FC<IdentityFormProps> = ({ onTransactionSubmitted }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<{
    hash: string;
    blockNumber: number;
    status: 'pending' | 'confirmed' | 'error';
  } | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setLastTransaction(null);

    try {
      // Check if connected to blockchain
      const connected = await blockchainService.isConnected();
      if (!connected) {
        throw new Error('Not connected to blockchain. Make sure Hardhat node is running.');
      }

      // Submit the transaction
      const result = await blockchainService.submitIdentity(name.trim());
      
      setLastTransaction({
        hash: result.hash,
        blockNumber: result.blockNumber,
        status: 'confirmed'
      });

      // Notify parent component
      onTransactionSubmitted?.(result.hash, result.blockNumber);

      // Clear the form
      setName('');
      
    } catch (err: any) {
      setError(err.message || 'Failed to submit to blockchain');
      setLastTransaction(prev => prev ? { ...prev, status: 'error' } : null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  return (
    <div className="identity-form">
      <div className="form-header">
        <h2>
          <Sparkles size={32} style={{ display: 'inline' }} />
          Add Your Identity
        </h2>
        <p>Submit your name to the blockchain ledger</p>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            disabled={isSubmitting}
            maxLength={50}
          />
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting || !name.trim()}
          className="submit-button"
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Mining Transaction...
            </>
          ) : (
            <>
              <Send size={20} />
              Submit to Blockchain
            </>
          )}
        </button>
      </form>

      {lastTransaction && (
        <div className={`transaction-result ${lastTransaction.status}`}>
          <div className="result-header">
            <span className="status-icon">
              {lastTransaction.status === 'confirmed' && <CheckCircle size={24} />}
              {lastTransaction.status === 'pending' && <Clock size={24} />}
              {lastTransaction.status === 'error' && <AlertCircle size={24} />}
            </span>
            <span className="status-text">
              {lastTransaction.status === 'confirmed' && 'Transaction Confirmed!'}
              {lastTransaction.status === 'pending' && 'Transaction Pending...'}
              {lastTransaction.status === 'error' && 'Transaction Failed'}
            </span>
          </div>

          {lastTransaction.status === 'confirmed' && (
            <div className="transaction-details">
              <div className="detail-row">
                <span className="label">
                  <Hash size={14} />
                  Transaction Hash:
                </span>
                <span className="value" title={lastTransaction.hash}>
                  {formatHash(lastTransaction.hash)}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">
                  <Layers size={14} />
                  Block Number:
                </span>
                <span className="value">#{lastTransaction.blockNumber}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="info-box">
        <h3>
          <BookOpen size={20} />
          What happens next?
        </h3>
        <ul>
          <li>Your name is stored permanently on the blockchain</li>
          <li>The transaction gets a unique hash (fingerprint)</li>
          <li>Data is included in a numbered block</li>
          <li>Once confirmed, it cannot be edited or deleted</li>
        </ul>
      </div>
    </div>
  );
};