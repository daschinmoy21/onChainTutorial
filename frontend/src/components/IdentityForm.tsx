import React, { useState } from "react";

import {
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  UserPlus,
  BookOpen,
  Hash,
  Layers,
  Database,
  Lock
} from "lucide-react";

import { blockchainService } from "../services/blockchain";

interface IdentityFormProps {
  onTransactionSubmitted?: (
    hash: string,
    blockNumber: number
  ) => void;
}

export const IdentityForm: React.FC<IdentityFormProps> = ({
  onTransactionSubmitted
}) => {

  /* -------- STATE -------- */

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const [lastTransaction, setLastTransaction] =
    useState<{
      hash: string;
      blockNumber: number;
      status: "pending" | "confirmed" | "error";
    } | null>(null);

  /* -------- SUBMIT -------- */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    /* ---- Validation ---- */

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!roll.trim()) {
      setError("Roll number is required");
      return;
    }

    setError("");
    setIsSubmitting(true);

    setLastTransaction({
      hash: "",
      blockNumber: 0,
      status: "pending"
    });

    try {
      /* ---- Check Node ---- */

      const connected =
        await blockchainService.isConnected();

      if (!connected) {
        throw new Error(
          "Hardhat node not running"
        );
      }

      /* ---- Send TX ---- */

      const result =
        await blockchainService.submitIdentity(
          name.trim(),
          roll.trim()
        );

      /* ---- Success ---- */

      setLastTransaction({
        hash: result.hash,
        blockNumber: result.blockNumber,
        status: "confirmed"
      });

      onTransactionSubmitted?.(
        result.hash,
        result.blockNumber
      );

      /* ---- Reset ---- */

      setName("");
      setRoll("");

    } catch (err: any) {

      console.error(err);

      setError(
        err.message ||
          "Blockchain transaction failed"
      );

      setLastTransaction(prev =>
        prev
          ? { ...prev, status: "error" }
          : null
      );

    } finally {
      setIsSubmitting(false);
    }
  };

  /* -------- UTILS -------- */

  const formatHash = (h: string) =>
    `${h.slice(0, 8)}...${h.slice(-6)}`;

  /* -------- UI -------- */

  return (
    <div className="identity-form">

      {/* HEADER */}

      <div className="form-header">

        <h2>
          <UserPlus size={32} />
          Add Student
        </h2>

        <p>
          Register your identity on blockchain
        </p>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="form-container"
      >

        {/* NAME */}

        <div className="input-group">

          <label htmlFor="name">
            Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={e =>
              setName(e.target.value)
            }
            placeholder="Enter name"
            disabled={isSubmitting}
            maxLength={50}
          />
        </div>

        {/* ROLL */}

        <div className="input-group">

          <label htmlFor="roll">
            Roll Number
          </label>

          <input
            id="roll"
            type="text"
            value={roll}
            onChange={e =>
              setRoll(e.target.value)
            }
            placeholder="Enter roll number"
            disabled={isSubmitting}
            maxLength={30}
          />
        </div>

        {/* ERROR */}

        {error && (

          <div className="error-message">

            <AlertCircle size={16} />
            {error}

          </div>
        )}

        {/* BUTTON */}

        <button
          type="submit"
          disabled={
            isSubmitting ||
            !name.trim() ||
            !roll.trim()
          }
          className="submit-button"
        >

          {isSubmitting ? (

            <>
              <span className="loading-spinner" />
              Mining...
            </>

          ) : (

            <>
              <Send size={20} />
              Register
            </>
          )}

        </button>

      </form>

      {/* RESULT */}

      {lastTransaction && (

        <div
          className={`transaction-result ${lastTransaction.status}`}
        >

          <div className="result-header">

            {lastTransaction.status ===
              "confirmed" && (
              <CheckCircle size={24} />
            )}

            {lastTransaction.status ===
              "pending" && (
              <Clock size={24} />
            )}

            {lastTransaction.status ===
              "error" && (
              <AlertCircle size={24} />
            )}

            <span>

              {lastTransaction.status ===
                "confirmed" &&
                "Confirmed"}

              {lastTransaction.status ===
                "pending" &&
                "Pending"}

              {lastTransaction.status ===
                "error" &&
                "Failed"}

            </span>
          </div>

          {lastTransaction.status ===
            "confirmed" && (

            <div className="transaction-details">

              <div>

                <Hash size={14} />
                {formatHash(
                  lastTransaction.hash
                )}

              </div>

              <div>

                <Layers size={14} />
                #{lastTransaction.blockNumber}

              </div>

            </div>
          )}
        </div>
      )}

      {/* INFO */}

      <div className="info-box">

        <h3>
          <BookOpen size={20} />
          What happens?
        </h3>

        <div className="info-grid">

          <div>
            <Database /> Permanent
          </div>

          <div>
            <Hash /> Verifiable
          </div>

          <div>
            <Layers /> Linked
          </div>

          <div>
            <Lock /> Immutable
          </div>

        </div>
      </div>
    </div>
  );
};
