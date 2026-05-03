import { useState, useCallback, useEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { smoother } from "./Navbar";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    category: "Personal Brand",
    tools: "Contact us for details",
    readiness: "Will be ready in 1 month",
    image: "/images/portfolio_mockup.png",
    isComingSoon: true,
  },
  {
    title: "E-Commerce Website",
    category: "Online Store Platform",
    tools: "Contact us for details",
    readiness: "Will be ready in 3 months",
    image: "/images/ecommerce_mockup.png",
    isComingSoon: true,
  },
  {
    title: "RedPulse",
    category: "Blood Donation Platform",
    tools: "Next.js, NestJS, MongoDB, AI Chatbot",
    github: "https://github.com/BLEACH321/redpulse",
    image: "/images/redpulse.png",
  },
  {
    title: "Student Hub",
    category: "All-in-One Student Platform",
    tools: "React, Node.js, Express, SQLite",
    github: "https://github.com/BLEACH321/student_hub",
    image: "/images/student_hub.jpg",
  },
  {
    title: "Crypto Tracker",
    category: "Cryptocurrency Dashboard",
    tools: "React, Next.js, Tailwind CSS",
    liveDemo: "https://v0-crypto-price-website-5gxjk1vwj.vercel.app?_vercel_share=tLyNe8IYAY0DAttNPZnoyzLgVurXJadT",
    image: "/images/crypto.jpeg",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const goToSlide = useCallback(
    (index: number, newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex(index);
    },
    []
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex, -1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex, 1);
  }, [currentIndex, goToSlide]);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [goToNext]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      goToNext();
    } else if (info.offset.x > threshold) {
      goToPrev();
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.innerWidth > 1024 && smoother) {
      smoother.scrollTo("#contact", true, "top top");
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.5,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring" as const, stiffness: 450, damping: 30 },
        opacity: { duration: 0.15 },
        scale: { type: "spring" as const, stiffness: 500, damping: 25 },
        filter: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.5,
      filter: "blur(10px)",
      transition: {
        x: { type: "spring" as const, stiffness: 450, damping: 30 },
        opacity: { duration: 0.15 },
        scale: { duration: 0.15 },
      },
    }),
  };

  const project = projects[currentIndex];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          ELITE <span>CREATIONS</span>
        </h2>

        <div className="carousel-wrapper" style={{ position: "relative" }}>
          {/* Slides */}
          <div className="carousel-track-container" style={{ position: "relative" }}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="carousel-slide"
                style={{ width: "100%" }}
              >
                <div className="carousel-content">
                  <div className="carousel-info">
                    <motion.div
                      className="carousel-number"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 0.3, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3>0{currentIndex + 1}</h3>
                    </motion.div>
                    <div className="carousel-details">
                      <motion.h4
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                      >
                        {project.title}
                      </motion.h4>
                      <motion.p
                        className="carousel-category"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        {project.category}
                      </motion.p>
                      <motion.div
                        className="carousel-tools"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.15 }}
                      >
                        {project.isComingSoon ? (
                          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <span
                              className="coming-soon-3d"
                              style={{ display: 'inline-block', cursor: 'default' }}
                            >
                              {project.readiness}
                            </span>
                            <a
                              href="#contact"
                              className="coming-soon-3d"
                              onClick={handleContactClick}
                              style={{ textDecoration: 'none', display: 'inline-block' }}
                            >
                              {project.tools}
                            </a>
                          </div>
                        ) : (
                          <>
                            <span className="tools-label">Tools & Features</span>
                            <p>{project.tools}</p>
                            {project.github && (
                              <div style={{ marginTop: '1rem' }}>
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="coming-soon-3d"
                                  style={{ textDecoration: 'none' }}
                                >
                                  View Source Code
                                </a>
                              </div>
                            )}
                            {project.liveDemo && (
                              <div style={{ marginTop: '0.5rem' }}>
                                <a
                                  href={project.liveDemo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="coming-soon-3d"
                                  style={{ textDecoration: 'none' }}
                                >
                                  View Live App
                                </a>
                              </div>
                            )}
                          </>
                        )}
                      </motion.div>
                    </div>
                  </div>
                  <motion.div
                    className="carousel-image-wrapper"
                    initial={{ opacity: 0, scale: 0.4, rotateY: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <WorkImage image={project.image} alt={project.title} />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots" style={{ position: "relative", zIndex: 10 }}>
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index, index > currentIndex ? 1 : -1)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;


