import { FiGithub } from "react-icons/fi";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <a href="https://github.com/SSdevcreations-lab" target="_blank" rel="noreferrer" className="footer-icon" data-cursor="pointer">
            <FiGithub size={24} />
          </a>
          <span className="footer-copyright">© 2026 SSDevCreations.</span>
        </div>

        <div className="footer-links">
          <a href="#" data-cursor="pointer">Terms</a>
          <a href="#" data-cursor="pointer">Privacy</a>
          <a href="#" data-cursor="pointer">Security</a>
          <a href="#" data-cursor="pointer">Status</a>
          <a href="#" data-cursor="pointer">Docs</a>
          <a href="#" data-cursor="pointer">Contact</a>
          <a href="#" data-cursor="pointer">Manage cookies</a>
          <a href="#" data-cursor="pointer">Do not share my personal information</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
