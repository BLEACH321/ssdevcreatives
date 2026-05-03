import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiShoppingCart, FiPenTool, FiSearch, FiZap, FiHeadphones } from 'react-icons/fi';
import Marquee from "react-fast-marquee";
import './styles/Services.css';

const servicesData = [
  {
    icon: <FiMonitor size={32} />,
    title: "Web Development",
    description: "Modern, responsive and fast websites built with the latest technologies.",
  },
  {
    icon: <FiShoppingCart size={32} />,
    title: "E-commerce Development",
    description: "High-converting online stores that drive sales and growth.",
  },
  {
    icon: <FiPenTool size={32} />,
    title: "UI/UX Design",
    description: "Beautiful and user-friendly designs that provide great user experience.",
  },
  {
    icon: <FiSearch size={32} />,
    title: "SEO Optimization",
    description: "Improve your rankings and get discovered by more customers.",
  },
  {
    icon: <FiZap size={32} />,
    title: "Performance Optimization",
    description: "Speed optimization for better performance and user experience.",
  },
  {
    icon: <FiHeadphones size={32} />,
    title: "Maintenance & Support",
    description: "We provide ongoing support and maintenance for your website.",
  }
];

const Services = () => {
  return (
    <div className="services-section" id="services">
      <div className="services-container section-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          OUR <span>SERVICES</span>
        </motion.h2>
        <motion.p 
          className="services-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We build high-performing websites that help your business grow online.
        </motion.p>

        <div className="services-marquee-container">
          <Marquee gradient={false} speed={50} pauseOnHover={true}>
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="service-card"
              >
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Services;
