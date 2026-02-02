# Student Blockchain Workshop Roadmap

This document outlines the roadmap and building guidelines for the hands-on session.

## Phase 1: Environment Setup
**Goal**: Prepare the development environment for the workshop lead and participants.
- [x] Initialize Monorepo (Contracts + Web).
- [x] Setup Hardhat for the Smart Contract (LAN Configured).
- [x] Setup Vite + React + TypeScript for the Web UI.
- [x] Create Registration Script task.

## Phase 2: Content Preparation
**Goal**: Create the materials students will use.
- [x] Create Scaffolding/"Fill-in-the-blank" code.
- [x] Write `INSTRUCTIONS.md` for each module.
- [ ] **Action Item**: Verify the "Student Experience" by trying to do the tasks yourself from a fresh folder.

## Phase 3: Distribution Strategy
**Goal**: Ensure students can get the code without hassle.
- [ ] Decide on Git vs Zip distribution.
- [ ] Prapare the "Shared Doc" (Google Doc or Discord Channel) to paste:
    - Host IP / RPC URL.
    - Contract Address (once deployed).
    - Contract ABI (once compiled).

## Phase 4: The Workshop Flow
1.  **Intro**: Explain Blockchain & Smart Contracts.
2.  **Setup**: Students download starter code & install Node.js.
3.  **Task 1 (Script)**: Students write `index.ts` to register their name.
    - *Learning*: Providers, Signers, Transactions.
4.  **Task 2 (Web)**: Students build the ID Card view.
    - *Learning*: Reading from chain, MetaMask integration.
5.  **Conclusion**: Everyone shows off their ID Cards on the Host's screen (or their own).

## Phase 5: Dry Run
- [ ] Simulate the workshop flow.
- [ ] Test network connectivity for multiple users (if using local LAN).
