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
          <a href="#" data-cursor="pointer">Terms & SERVICES</a>
          <a href="#" data-cursor="pointer">PRIVACY POLICY</a>
          <a href="#" data-cursor="pointer">COOKIE POLICY</a>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
