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
          <a href="https://docs.google.com/document/d/1ZEJKVN8sqF3BPRH74pOjpF5hIEYhjYiQ/edit?usp=drive_link&ouid=103503313284524832516&rtpof=true&sd=true" target="_blank" rel="noreferrer" data-cursor="pointer">TERMS & CONDITIONS</a>
          <a href="https://docs.google.com/document/d/15lW6lKxub2pSLCkg-ly8h-oZ0OqxBvcY/edit?usp=drive_link&ouid=103503313284524832516&rtpof=true&sd=true" target="_blank" rel="noreferrer" data-cursor="pointer">TERMS OF EXECUTION</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
