import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Blocks, User, HelpCircle } from 'lucide-react';
import { IdentityPage } from './pages/IdentityPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { ConnectionStatus } from './components/ConnectionStatus';
import './App.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <div className="brand-icon">
          <Blocks size={20} />
        </div>
        <h1>Blockchain Identity Ledger</h1>
      </div>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <User size={18} />
          Add Identity
        </Link>
        <Link 
          to="/explorer" 
          className={`nav-link ${location.pathname === '/explorer' ? 'active' : ''}`}
        >
          <Blocks size={18} />
          Blockchain Explorer
        </Link>
      </div>
      <div className="nav-status">
        <ConnectionStatus />
      </div>
    </nav>
  );
};

const HelpSection: React.FC = () => {
  return (
    <div className="help-section">
      <h3>
        <HelpCircle size={20} />
        How it works
      </h3>
      <ul>
        <li><strong>Add Identity:</strong> Submit your name to the blockchain permanently</li>
        <li><strong>Explorer:</strong> View all stored identities and blockchain structure</li>
        <li><strong>Immutable:</strong> Once submitted, data cannot be changed or deleted</li>
        <li><strong>Transparent:</strong> All data is publicly viewable on the blockchain</li>
      </ul>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<IdentityPage />} />
            <Route path="/explorer" element={<ExplorerPage />} />
          </Routes>
        </main>

        <aside className="sidebar">
          <HelpSection />
        </aside>
      </div>
    </Router>
  );
}

export default App;
