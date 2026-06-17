import React from "react";
import ThemeToggle from "./ThemeToggle";

/**
 * Header — gradient banner with app title and tagline
 */
const Header = ({ theme, onThemeToggle }) => {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo">
            <span className="logo-icon">₹</span>
          </div>
          <div className="header-text">
            <h1 className="header-title">GST Calculator Pro</h1>
            <p className="header-subtitle">
              Precise GST calculations for Indian businesses
            </p>
          </div>
        </div>
        <div className="header-actions">
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="dh-button"
            aria-label="Visit Digital Heroes Co"
          >
            🦸 Built for Digital Heroes
          </a>
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </header>
  );
};

export default Header;
