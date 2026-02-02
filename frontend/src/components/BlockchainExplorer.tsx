import React, { useState, useEffect } from 'react';
import { RotateCw, Archive, User, Hash, Clock, Layers, AlertTriangle, Inbox, BookOpen, Database, FileText, Fingerprint } from 'lucide-react';
import { blockchainService } from '../services/blockchain';
import type { BlockInfo, BlockchainTransaction } from '../services/blockchain';

interface BlockchainExplorerProps {
  refreshTrigger?: number;
}

export const BlockchainExplorer: React.FC<BlockchainExplorerProps> = ({ refreshTrigger }) => {
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'simple' | 'detailed'>('simple');

  const fetchBlockchainData = async () => {
    try {
      setLoading(true);
      setError('');

      // Check connection first
      const connected = await blockchainService.isConnected();
      if (!connected) {
        setError('Not connected to blockchain. Start the Hardhat node first.');
        return;
      }

      // Fetch both blocks and transactions
      const [blocksData, transactionsData] = await Promise.all([
        blockchainService.getBlocks(),
        blockchainService.getAllIdentities()
      ]);

      setBlocks(blocksData);
      setTransactions(transactionsData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch blockchain data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockchainData();
  }, [refreshTrigger]);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(fetchBlockchainData, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const timeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - (timestamp * 1000);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  if (loading && blocks.length === 0) {
    return (
      <div className="blockchain-explorer loading">
        <div className="loading-spinner"></div>
        <p>Loading blockchain data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blockchain-explorer">
        <div className="explorer-header">
          <h2>
            <Archive size={32} style={{ display: 'inline' }} />
            Live Blockchain Data
          </h2>
        </div>

        <div className="error-message-box">
          <span className="error-icon">
            <AlertTriangle size={32} />
          </span>
          <div>
            <h3>Connection Error</h3>
            <p>{error}</p>
            <button onClick={fetchBlockchainData} className="retry-button">
              <RotateCw size={16} />
              Retry Connection
            </button>
          </div>
        </div>

        {/* Info Section - Always visible */}
        <div className="info-box explorer-info-box">
          <h3>
            <BookOpen size={20} />
            What is a Blockchain Explorer?
          </h3>
          <p className="info-description">
            A blockchain explorer is like a search engine for the blockchain. It allows you to 
            view and verify all transactions, blocks, and data stored on the network in real-time.
          </p>
          <div className="info-grid">
            <div className="info-card">
              <Database size={24} className="info-card-icon" />
              <strong>Blocks</strong>
              <span>Containers that store batches of transactions, each linked to the previous block forming an unbreakable chain.</span>
            </div>
            <div className="info-card">
              <FileText size={24} className="info-card-icon" />
              <strong>Transactions</strong>
              <span>Individual records of data changes on the blockchain. Each transaction has a unique hash for verification.</span>
            </div>
            <div className="info-card">
              <Fingerprint size={24} className="info-card-icon" />
              <strong>Hash</strong>
              <span>A unique digital fingerprint generated from data. Even a tiny change produces a completely different hash.</span>
            </div>
            <div className="info-card">
              <Clock size={24} className="info-card-icon" />
              <strong>Timestamp</strong>
              <span>The exact moment when a transaction was recorded, providing an immutable audit trail of all activities.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blockchain-explorer">
      <div className="explorer-header">
        <h2>
          <Archive size={32} style={{ display: 'inline' }} />
          Live Blockchain Data
        </h2>
        <div className="explorer-controls">
          <button 
            onClick={fetchBlockchainData} 
            className="refresh-button"
            disabled={loading}
          >
            <RotateCw size={16} />
            Refresh
          </button>
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value as 'simple' | 'detailed')}
            className="view-mode-select"
          >
            <option value="simple">Simple View</option>
            <option value="detailed">Detailed View</option>
          </select>
        </div>
      </div>

      {viewMode === 'simple' && (
        <div className="simple-view">
          <div className="transactions-list">
            {transactions.length === 0 ? (
              <div className="empty-state">
                <h3>
                  <Inbox size={48} />
                  No identities yet
                </h3>
                <p>Submit your first identity to see it appear here!</p>
              </div>
            ) : (
              transactions.map((tx) => (
                <div key={tx.hash} className="transaction-card">
                  <div className="transaction-header">
                    <span className="identity-name">
                      <User size={20} />
                      {tx.value}
                    </span>
                    <span className="time-ago">
                      <Clock size={14} />
                      {timeAgo(tx.timestamp)}
                    </span>
                  </div>
                  <div className="transaction-details">
                    <div className="detail">
                      <span className="label">
                        <Layers size={12} />
                        Block:
                      </span>
                      <span className="value">#{tx.blockNumber}</span>
                    </div>
                    <div className="detail">
                      <span className="label">
                        <Hash size={12} />
                        Hash:
                      </span>
                      <span className="value" title={tx.hash}>
                        {formatHash(tx.hash)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {viewMode === 'detailed' && (
        <div className="detailed-view">
          <div className="blocks-list">
            {blocks.length === 0 ? (
              <div className="empty-state">
                <h3>
                  <Inbox size={48} />
                  No blocks with data yet
                </h3>
                <p>Submit identities to see blockchain blocks!</p>
              </div>
            ) : (
              blocks.map((block) => (
                <div key={block.number} className="block-card">
                  <div className="block-header">
                    <div className="block-info">
                      <h3>
                        <Layers size={20} />
                        Block #{block.number}
                      </h3>
                      <span className="block-time">
                        <Clock size={14} />
                        {timeAgo(block.timestamp)}
                      </span>
                    </div>
                    <div className="block-hash" title={block.hash}>
                      <Hash size={14} />
                      Hash: {formatHash(block.hash)}
                    </div>
                  </div>

                  <div className="block-content">
                    {block.transactions.length === 0 ? (
                      <div className="no-transactions">
                        <Inbox size={24} />
                        No identity transactions in this block
                      </div>
                    ) : (
                      <div className="block-transactions">
                        <h4>
                          <Archive size={16} />
                          Transactions ({block.transactions.length}):
                        </h4>
                        {block.transactions.map((tx) => (
                          <div key={tx.hash} className="block-transaction">
                            <div className="transaction-identity">
                              <span className="identity-icon">
                                <User size={18} />
                              </span>
                              <span className="identity-value">{tx.value}</span>
                            </div>
                            <div className="transaction-meta">
                              <span title={tx.hash}>
                                <Hash size={12} />
                                Tx: {formatHash(tx.hash)}
                              </span>
                              <span title={tx.from}>
                                <User size={12} />
                                From: {formatHash(tx.from)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="block-meta">
                    <div className="meta-item">
                      <span className="label">
                        <Clock size={14} />
                        Timestamp:
                      </span>
                      <span className="value">{formatTimestamp(block.timestamp)}</span>
                    </div>
                    <div className="meta-item">
                      <span className="label">
                        <Hash size={14} />
                        Block Hash:
                      </span>
                      <span className="value" title={block.hash}>{formatHash(block.hash)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="refresh-indicator">
          <span className="loading-spinner small"></span>
          Refreshing...
        </div>
      )}

      {/* Info Section - About Blockchain Explorer */}
      <div className="info-box explorer-info-box">
        <h3>
          <BookOpen size={20} />
          What is a Blockchain Explorer?
        </h3>
        <p className="info-description">
          A blockchain explorer is like a search engine for the blockchain. It allows you to 
          view and verify all transactions, blocks, and data stored on the network in real-time.
        </p>
        <div className="info-grid">
          <div className="info-card">
            <Database size={24} className="info-card-icon" />
            <strong>Blocks</strong>
            <span>Containers that store batches of transactions, each linked to the previous block forming an unbreakable chain.</span>
          </div>
          <div className="info-card">
            <FileText size={24} className="info-card-icon" />
            <strong>Transactions</strong>
            <span>Individual records of data changes on the blockchain. Each transaction has a unique hash for verification.</span>
          </div>
          <div className="info-card">
            <Fingerprint size={24} className="info-card-icon" />
            <strong>Hash</strong>
            <span>A unique digital fingerprint generated from data. Even a tiny change produces a completely different hash.</span>
          </div>
          <div className="info-card">
            <Clock size={24} className="info-card-icon" />
            <strong>Timestamp</strong>
            <span>The exact moment when a transaction was recorded, providing an immutable audit trail of all activities.</span>
          </div>
        </div>
      </div>
    </div>
  );
};