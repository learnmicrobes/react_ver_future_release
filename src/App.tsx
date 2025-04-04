// App.tsx
import React from 'react'; // Add this line
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faFlask,
  faBook,
  faMicroscope
} from '@fortawesome/free-solid-svg-icons';
import BioCalculator from './tools/BioCalculator/Calculator';
import ToolComponent from './components/ToolComponent/ToolComponent';
import './App.css';

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="app-nav">
        <div className="nav-brand" onClick={() => setActiveTool(null)}>
          <FontAwesomeIcon icon={faMicroscope} />
          <span>Learn Microbes</span>
        </div>
        
        <div className="nav-links">
          <button 
            className={!activeTool ? 'active' : ''}
            onClick={() => setActiveTool(null)}
          >
            <FontAwesomeIcon icon={faHome} /> Home
          </button>
          <button 
            className={activeTool === 'Biochemical Calculator' ? 'active' : ''}
            onClick={() => setActiveTool('Biochemical Calculator')}
          >
            <FontAwesomeIcon icon={faFlask} /> Calculator
          </button>
          <button
            className={activeTool === 'Guides' ? 'active' : ''}
            onClick={() => setActiveTool('Guides')}
          >
            <FontAwesomeIcon icon={faBook} /> Guides
          </button>
        </div>
      </nav>

      <main className="app-main">
        {activeTool ? (
          <ToolComponent tool={activeTool}>
            {activeTool === 'Biochemical Calculator' && <BioCalculator />}
            {activeTool === 'Gram Positive Roadmap' && (
              <div className="coming-soon">
                <h3>Gram Positive Identification Guide</h3>
                <p>Interactive roadmap coming soon!</p>
              </div>
            )}
            {activeTool === 'Gram Negative Roadmap' && (
              <div className="coming-soon">
                <h3>Gram Negative Identification Guide</h3>
                <p>Interactive roadmap coming soon!</p>
              </div>
            )}
          </ToolComponent>
        ) : (
          <div className="home-page">
            <h2>Welcome to Learn Microbes</h2>
            <p>Select a tool to get started:</p>
            
            <div className="tool-cards">
              <button 
                className="tool-card calculator"
                onClick={() => setActiveTool('Biochemical Calculator')}
              >
                <span className="tool-icon">🧪</span>
                <h3>Biochemical Calculator</h3>
                <p>Identify Enteric organisms based on 24 biochemical tests</p>
              </button>
              
              <button 
                className="tool-card gram-positive"
                onClick={() => setActiveTool('Gram Positive Roadmap')}
              >
                <span className="tool-icon">🟣</span>
                <h3>Gram Positive Roadmap</h3>
                <p>Step-by-step identification guide (Coming Soon)</p>
              </button>
              
              <button 
                className="tool-card gram-negative"
                onClick={() => setActiveTool('Gram Negative Roadmap')}
              >
                <span className="tool-icon">🔴</span>
                <h3>Gram Negative Roadmap</h3>
                <p>Step-by-step identification guide (Coming Soon)</p>
              </button>
            </div>
          </div>
        )}
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-about">
              <h3>About This Project</h3>
              <p>This free tool was created by a microbiology lab technologist to help students and professionals with bacterial identification. It's based on standard biochemical test patterns used in clinical laboratories.</p>
            </div>
            
            <div className="footer-socials">
              <h3>Connect</h3>
              <div className="social-icons">
                <a href="https://instagram.com/franzescuzar" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
                <a href="mailto:learnmicrobes@outlook.com?subject=Question%20About%20LearnMicrobes" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-envelope"></i> Email Us
                </a>
              </div>
            </div>
            
            <div className="footer-roadmap">
              <h3>What's Coming Next</h3>
              <ul>
                <li>✓ Current: Enterobacteriaceae ID</li>
                <li>→ Next: Gram-positive ID Tool</li>
                <li>→ Future: Gram-negative ID Tool</li>
                <li>→ Future: Mobile App Version</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-copyright">
            <p>&copy; 2025 LearnMicrobes.com | Made for educational purposes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}