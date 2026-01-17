# Frontend Instructions

## Running the Frontend

From the `frontend` directory, run:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal in your browser.

---

## 🎯 Frontend Goal

The frontend serves as a **visual interface to a local blockchain**.

It enables users to:

* Submit data as **blockchain transactions**
* Inspect how that data is **stored on-chain**
* Clearly observe the **structure and history** of the blockchain

---

## 📄 Required Pages

### 1. Identity Creator Page

**Purpose**
Submit a simple identity entry to the blockchain.

**Requirements**

* Input field for name or identity
* Submit button to write data to the blockchain

After submission, display:

* Transaction hash
* Block number

---

### 2. Node / Ledger Viewer Page

**Purpose**
Provide a clear and transparent view of the blockchain state.

**Requirements**

* Fetch all data directly from the blockchain
* Display entries in the exact order they exist on-chain

For each stored entry, show:

* Exact data written to the blockchain
* Block number in which the data was included
* Block timestamp
* Transaction hash

Include a **raw blockchain view** that displays:

* Block-level metadata (block number, timestamp)
* How multiple entries are grouped within a block
* The linkage between consecutive blocks

---

## ✅ Completion Criteria

The frontend is considered complete when:

* Data submissions result in visible blockchain transactions
* All on-chain data can be viewed in both:

  * Readable format
  * Raw block-level format
* The structure of blocks and stored data is clearly observable

---

> **Next step:** `blockchain/instruction.md` (commands + blockchain-side goals)
