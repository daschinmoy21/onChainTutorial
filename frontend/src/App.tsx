import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Blocks, User } from 'lucide-react';
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
      </div>
    </Router>
  );
}

export default App;
