import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Blocks, User, Home } from 'lucide-react';
import { IdentityPage } from './pages/IdentityPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { IntroPage } from './pages/IntroPage';
import { ConnectionStatus } from './components/ConnectionStatus';
import './App.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  // Hide navigation on intro page for cleaner experience
  if (location.pathname === '/') {
    return null;
  }

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
          <Home size={18} />
          Home
        </Link>
        <Link 
          to="/identity" 
          className={`nav-link ${location.pathname === '/identity' ? 'active' : ''}`}
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
        {/* Global Animated Background */}
        <div className="animated-bg">
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}></div>
            ))}
          </div>
          <div className="grid-lines"></div>
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          <div className="glow-orb orb-3"></div>
        </div>

        <Navigation />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/identity" element={<IdentityPage />} />
            <Route path="/explorer" element={<ExplorerPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
