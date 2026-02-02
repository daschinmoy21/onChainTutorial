import React, { useEffect, useState } from "react";

import {
  RotateCw,
  Archive,
  User,
  Hash,
  Clock,
  Layers,
  AlertTriangle,
  Inbox,
  BookOpen,
  Database,
  FileText,
  Fingerprint,
  Wallet,
  Calendar
} from "lucide-react";

import { blockchainService } from "../services/blockchain";
import type { BlockInfo, BlockchainTransaction } from "../services/blockchain";

interface Props {
  refreshTrigger?: number;
}

export const BlockchainExplorer: React.FC<Props> = ({
  refreshTrigger
}) => {
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);
  const [transactions, setTransactions] =
    useState<BlockchainTransaction[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewMode, setViewMode] =
    useState<"simple" | "detailed">("simple");

  /* ---------- HELPERS ---------- */

  const shortHash = (h: string) =>
    `${h.slice(0, 10)}...${h.slice(-8)}`;

  const fullHash = (h: string) => h;

  const timeAgo = (ts: number) => {
    const diff = Date.now() - ts * 1000;

    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);

    if (d > 0) return `${d}d ago`;
    if (h > 0) return `${h}h ago`;
    if (m > 0) return `${m}m ago`;
    return "Just now";
  };

  const formatTimestamp = (ts: number) => {
    return new Date(ts * 1000).toLocaleString();
  };

  /* ---------- FETCH ---------- */

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const ok = await blockchainService.isConnected();

      if (!ok) {
        setError("Hardhat node not running");
        return;
      }

      const [b, t] = await Promise.all([
        blockchainService.getBlocks(),
        blockchainService.getAllIdentities()
      ]);

      setBlocks(b);
      setTransactions(t);
    } catch (err: any) {
      setError(err.message || "Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  useEffect(() => {
    const id = setInterval(fetchData, 10000);
    return () => clearInterval(id);
  }, []);

  /* ---------- ERROR ---------- */

  if (error) {
    return (
      <div className="blockchain-explorer">

        <h2>
          <Archive /> Live Blockchain Data
        </h2>

        <div className="error-message-box">

          <AlertTriangle size={32} />

          <div>
            <h3>Connection Error</h3>
            <p>{error}</p>

            <button onClick={fetchData}>
              <RotateCw size={16} /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- UI ---------- */

  return (
    <div className="blockchain-explorer">

      {/* HEADER */}

      <div className="explorer-header">

        <h2>
          <Archive /> Live Blockchain Data
        </h2>

        <div className="explorer-controls">

          <button
            onClick={fetchData}
            disabled={loading}
          >
            <RotateCw size={16} /> Refresh
          </button>

          <select
            value={viewMode}
            onChange={e =>
              setViewMode(e.target.value as any)
            }
          >
            <option value="simple">
              Simple View
            </option>
            <option value="detailed">
              Detailed View
            </option>
          </select>
        </div>
      </div>

      {/* SIMPLE VIEW - Minimal: Just name and transaction ID */}

      {viewMode === "simple" && (

        <div className="transactions-list">

          {transactions.length === 0 ? (

            <div className="empty-state">

              <Inbox size={48} />
              <p>No students yet</p>

            </div>

          ) : (

            transactions.map(tx => (

              <div
                key={tx.hash}
                className="transaction-card simple"
              >

                <div className="simple-tx-content">
                  <div className="simple-name">
                    <User size={18} />
                    <strong>{tx.name}</strong>
                  </div>

                  <div className="simple-hash" title={tx.hash}>
                    <Hash size={14} />
                    <code>{shortHash(tx.hash)}</code>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* DETAILED VIEW - Comprehensive: Show all transaction data */}

      {viewMode === "detailed" && (

        <div className="blocks-list">

          {blocks.length === 0 ? (

            <div className="empty-state">
              <Inbox size={48} />
              <p>No blocks yet</p>
            </div>

          ) : (

            blocks.map(block => {
              // Find all transactions for this block
              const blockTxs = transactions.filter(tx => tx.blockNumber === block.number);
              
              return (
                <div
                  key={block.number}
                  className="block-card detailed"
                >

                  <div className="block-header">

                    <div className="block-title">
                      <h3>
                        <Layers />
                        Block #{block.number}
                      </h3>
                      <span className="block-time">
                        {timeAgo(block.timestamp)}
                      </span>
                    </div>

                    <div className="block-meta">
                      <div className="block-info-item">
                        <Clock size={14} />
                        <span>{formatTimestamp(block.timestamp)}</span>
                      </div>
                      <div className="block-info-item">
                        <Hash size={14} />
                        <code title={block.hash}>{shortHash(block.hash)}</code>
                      </div>
                      <div className="block-info-item">
                        <FileText size={14} />
                        <span>{blockTxs.length} transaction{blockTxs.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>

                  </div>

                  <div className="block-content">

                    {blockTxs.length === 0 ? (

                      <p className="no-transactions">No students in this block</p>

                    ) : (

                      blockTxs.map(tx => (

                        <div
                          key={tx.hash}
                          className="block-transaction detailed"
                        >

                          <div className="tx-main-info">
                            <div className="tx-student">
                              <User size={20} />
                              <div>
                                <div className="tx-name">{tx.name}</div>
                                <div className="tx-roll">Roll: {tx.rollNumber}</div>
                              </div>
                            </div>
                          </div>

                          <div className="tx-details-grid">
                            
                            <div className="tx-detail-item">
                              <div className="tx-detail-label">
                                <Hash size={14} />
                                Transaction Hash
                              </div>
                              <div className="tx-detail-value">
                                <code title={tx.hash}>{fullHash(tx.hash)}</code>
                              </div>
                            </div>

                            <div className="tx-detail-item">
                              <div className="tx-detail-label">
                                <Wallet size={14} />
                                From Address
                              </div>
                              <div className="tx-detail-value">
                                <code title={tx.from}>{tx.from}</code>
                              </div>
                            </div>

                            <div className="tx-detail-item">
                              <div className="tx-detail-label">
                                <Layers size={14} />
                                Block Number
                              </div>
                              <div className="tx-detail-value">
                                #{tx.blockNumber}
                              </div>
                            </div>

                            <div className="tx-detail-item">
                              <div className="tx-detail-label">
                                <Calendar size={14} />
                                Timestamp
                              </div>
                              <div className="tx-detail-value">
                                {formatTimestamp(tx.timestamp)}
                              </div>
                            </div>

                            <div className="tx-detail-item">
                              <div className="tx-detail-label">
                                <Clock size={14} />
                                Time Ago
                              </div>
                              <div className="tx-detail-value">
                                {timeAgo(tx.timestamp)}
                              </div>
                            </div>

                          </div>

                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* INFO */}

      <div className="info-box">

        <h3>
          <BookOpen /> About Explorer
        </h3>

        <div className="info-grid">

          <div>
            <Database /> Blocks
          </div>

          <div>
            <FileText /> Transactions
          </div>

          <div>
            <Fingerprint /> Hashes
          </div>

          <div>
            <Clock /> Timestamps
          </div>

        </div>
      </div>
    </div>
  );
};