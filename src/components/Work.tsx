import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { smoother } from "./Navbar";

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
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.innerWidth > 1024 && smoother) {
      smoother.scrollTo("#contact", true, "top top");
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
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
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
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
