import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Blocks, 
  ArrowRight, 
  Database, 
  Lock, 
  Users, 
  FileText, 
  Hash, 
  Link as LinkIcon,
  Shield,
  Eye,
  Clock,
  CheckCircle,
  ArrowRightCircle
} from 'lucide-react';

export const IntroPage: React.FC = () => {
  return (
    <div className="intro-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            <Blocks size={48} className="hero-icon" />
            Welcome to Blockchain
          </h1>
          <p className="hero-subtitle">
            Learn the fundamentals of blockchain technology through hands-on interaction
          </p>
          <Link to="/identity" className="cta-button">
            Start Adding Identities
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* What is Blockchain Section */}
      <section className="info-section">
        <h2>What is Blockchain?</h2>
        <p className="section-description">
          A blockchain is a distributed, decentralized digital ledger that records transactions 
          across many computers. Once data is recorded, it cannot be altered without changing 
          all subsequent blocks, making it virtually tamper-proof.
        </p>
        
        <div className="features-grid">
          <div className="feature-card">
            <Database size={32} className="feature-icon" />
            <h3>Distributed Ledger</h3>
            <p>Data is stored across multiple nodes, not in a single central location</p>
          </div>
          <div className="feature-card">
            <Lock size={32} className="feature-icon" />
            <h3>Immutable</h3>
            <p>Once recorded, data cannot be changed or deleted by anyone</p>
          </div>
          <div className="feature-card">
            <Eye size={32} className="feature-icon" />
            <h3>Transparent</h3>
            <p>All transactions are visible and verifiable by everyone on the network</p>
          </div>
          <div className="feature-card">
            <Shield size={32} className="feature-icon" />
            <h3>Secure</h3>
            <p>Cryptographic hashing ensures data integrity and security</p>
          </div>
        </div>
      </section>

      {/* How Blockchain Works - Flowchart */}
      <section className="flowchart-section">
        <h2>How This Project Works</h2>
        <p className="section-description">
          Follow the journey of your data from submission to permanent storage on the blockchain
        </p>

        <div className="flowchart-container">
          {/* Top Row - Steps 1, 2, 3 */}
          <div className="flowchart-row top-row">
            <div className="flow-step">
              <div className="step-number">1</div>
              <div className="step-card">
                <Users size={36} className="step-icon" />
                <h3>User Submits Data</h3>
                <p>Enter your identity into the form and click submit</p>
              </div>
            </div>

            <div className="flow-arrow horizontal">
              <ArrowRightCircle size={28} />
            </div>

            <div className="flow-step">
              <div className="step-number">2</div>
              <div className="step-card">
                <FileText size={36} className="step-icon" />
                <h3>Transaction Created</h3>
                <p>A transaction is created and sent to the network</p>
              </div>
            </div>

            <div className="flow-arrow horizontal">
              <ArrowRightCircle size={28} />
            </div>

            <div className="flow-step step-with-down-arrow">
              <div className="step-number">3</div>
              <div className="step-card">
                <Hash size={36} className="step-icon" />
                <h3>Hash Generated</h3>
                <p>Unique cryptographic fingerprint is created</p>
              </div>
              {/* Down arrow attached to step 3 */}
              <div className="flow-arrow-down-connector">
                <ArrowRightCircle size={28} />
              </div>
            </div>
          </div>

          {/* Bottom Row - Steps 6, 5, 4 (reversed for flow) */}
          <div className="flowchart-row bottom-row">
            <div className="flow-step">
              <div className="step-number">6</div>
              <div className="step-card">
                <CheckCircle size={36} className="step-icon" />
                <h3>Permanently Stored</h3>
                <p>Data is immutably recorded on the blockchain</p>
              </div>
            </div>

            <div className="flow-arrow horizontal reverse">
              <ArrowRightCircle size={28} />
            </div>

            <div className="flow-step">
              <div className="step-number">5</div>
              <div className="step-card">
                <LinkIcon size={36} className="step-icon" />
                <h3>Block Linked</h3>
                <p>Block is cryptographically linked to previous</p>
              </div>
            </div>

            <div className="flow-arrow horizontal reverse">
              <ArrowRightCircle size={28} />
            </div>

            <div className="flow-step">
              <div className="step-number">4</div>
              <div className="step-card">
                <Blocks size={36} className="step-icon" />
                <h3>Added to Block</h3>
                <p>Transaction bundled into a new block</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Block Chain */}
      <section className="chain-section">
        <h2>The Chain Structure</h2>
        <p className="section-description">
          Each block contains data, its own hash, and the hash of the previous block, creating an unbreakable chain
        </p>

        <div className="block-chain-visual">
          <div className="chain-block genesis">
            <div className="block-header">
              <span className="block-label">Genesis Block</span>
              <span className="block-number">#0</span>
            </div>
            <div className="block-body">
              <div className="block-field">
                <Clock size={14} />
                <span>Timestamp: Origin</span>
              </div>
              <div className="block-field">
                <Hash size={14} />
                <span>Prev: 0000...0000</span>
              </div>
              <div className="block-field">
                <Database size={14} />
                <span>Data: Initial Block</span>
              </div>
            </div>
          </div>

          <div className="chain-link">
            <div className="link-line"></div>
            <LinkIcon size={20} />
            <div className="link-line"></div>
          </div>

          <div className="chain-block">
            <div className="block-header">
              <span className="block-label">Block</span>
              <span className="block-number">#1</span>
            </div>
            <div className="block-body">
              <div className="block-field">
                <Clock size={14} />
                <span>Timestamp: T+1</span>
              </div>
              <div className="block-field">
                <Hash size={14} />
                <span>Prev: abc1...2def</span>
              </div>
              <div className="block-field">
                <Database size={14} />
                <span>Data: "Alice"</span>
              </div>
            </div>
          </div>

          <div className="chain-link">
            <div className="link-line"></div>
            <LinkIcon size={20} />
            <div className="link-line"></div>
          </div>

          <div className="chain-block">
            <div className="block-header">
              <span className="block-label">Block</span>
              <span className="block-number">#2</span>
            </div>
            <div className="block-body">
              <div className="block-field">
                <Clock size={14} />
                <span>Timestamp: T+2</span>
              </div>
              <div className="block-field">
                <Hash size={14} />
                <span>Prev: def3...4ghi</span>
              </div>
              <div className="block-field">
                <Database size={14} />
                <span>Data: "Bob"</span>
              </div>
            </div>
          </div>

          <div className="chain-link">
            <div className="link-line"></div>
            <LinkIcon size={20} />
            <div className="link-line"></div>
          </div>

          <div className="chain-block next">
            <div className="block-header">
              <span className="block-label">Next Block</span>
              <span className="block-number">#3</span>
            </div>
            <div className="block-body">
              <div className="block-field pending">
                <Clock size={14} />
                <span>Waiting for data...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Section */}
      <section className="try-section">
        <h2>Try It Yourself!</h2>
        <p className="section-description">
          Now that you understand the basics, experience blockchain in action
        </p>
        
        <div className="action-cards">
          <Link to="/identity" className="action-card">
            <Users size={40} className="action-icon" />
            <h3>Add Your Identity</h3>
            <p>Submit your name to the blockchain and watch it get recorded</p>
            <span className="action-link">
              Get Started <ArrowRight size={16} />
            </span>
          </Link>

          <Link to="/explorer" className="action-card">
            <Blocks size={40} className="action-icon" />
            <h3>Explore Blockchain</h3>
            <p>View all recorded identities and explore block structure</p>
            <span className="action-link">
              View Explorer <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};
