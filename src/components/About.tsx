import { motion } from "framer-motion";
import "./styles/About.css";

const About = () => {
  // Calculate 3D rotation based on mouse position (Same as Contact Section Effect)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    if (!target) return;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20; // Division reduces rotation severity
    const y = -(e.clientY - top - height / 2) / 20;

    // Applying the 3D rotation and scale
    target.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  // Reset rotation gracefully when mouse leaves
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    if (!target) return;
    target.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="about-section" id="about">
      <div className="section-container">
        <motion.div
          className="about-me"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="title">About Us</h3>
          <p className="para">
            We are SS Creatives, a collective of elite developers dedicated to
            crafting high-performance, scalable web solutions.
            By merging cutting-edge technology with intuitive design, we build robust digital
            experiences that drive innovation and deliver real-world value.
          </p>
        </motion.div>

        <div className="founders-container">
          <motion.div
            className="founder-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor="disable"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="founder-glow"></div>
            <div className="founder-content">
              <div className="founder-header">
                <span className="founder-num">01</span>
                <span className="founder-role">Founder</span>
              </div>
              <h4 className="founder-name">AARYAN BHOIR</h4>
              <p className="founder-desc">
                Full Stack Developer specialized in building scalable web applications and intelligent systems.
              </p>
              <div className="founder-links">
                <a href="https://bleach321.github.io/RESUME-AB/" target="_blank" rel="noopener noreferrer" className="founder-btn">
                  View Resume
                </a>
                <a href="https://github.com/sway0069" target="_blank" rel="noopener noreferrer" className="founder-github">
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="founder-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor="disable"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="founder-glow"></div>
            <div className="founder-content">
              <div className="founder-header">
                <span className="founder-num">02</span>
                <span className="founder-role">Founder</span>
              </div>
              <h4 className="founder-name">SUNNY GUPTA</h4>
              <p className="founder-desc">
                Full Stack Developer expert in React, Node.js and Crafting seamless user experiences.
              </p>
              <div className="founder-links">
                <a href="https://BLEACH321.github.io/resumecv/" target="_blank" rel="noopener noreferrer" className="founder-btn">
                  View Resume
                </a>
                <a href="https://github.com/BLEACH321" target="_blank" rel="noopener noreferrer" className="founder-github">
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
