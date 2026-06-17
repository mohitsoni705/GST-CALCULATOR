import React from "react";

/**
 * Footer — developer information and credits
 */
const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-dev">
          <h4 className="footer-dev-title">Developer Information</h4>
          <p className="footer-dev-row">
            <span className="footer-dev-label">Name:</span>
            <span className="footer-dev-value">MOHIT PARMAR SONI</span>
          </p>
          <p className="footer-dev-row">
            <span className="footer-dev-label">Email:</span>
            <a
              href="mailto:mohitsoni3820@gmail.com"
              className="footer-dev-value footer-link"
            >
              mohitsoni3820@gmail.com
            </a>
          </p>
        </div>

        <div className="footer-center">
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="dh-button dh-button--footer"
          >
            🦸 Built for Digital Heroes
          </a>
          <p className="footer-copy">
            © {new Date().getFullYear()} GST Calculator Pro · All calculations
            are for reference only. Consult a tax professional for advice.
          </p>
        </div>

        <div className="footer-right">
          <p className="footer-tech">
            Built with React + Vite
          </p>
          <p className="footer-disclaimer">
            GST rates per Government of India guidelines.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
