import { useState, useRef, MouseEvent, FormEvent } from "react";
import "./styles/Contact.css";

// Hybrid Backend Logic:
// Localhost uses the native Excel server; Production (Vercel) uses the Make.com webhook.
const WEBHOOK_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000/api/contact" 
  : "https://hook.eu1.make.com/8w7qbrfd6i3vdl6j1ddvtujtqeohyvyg";

const Contact = () => {
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", number: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000); // Reset after 5 seconds
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  // Calculate 3D rotation based on mouse position over the right column
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;
    const { left, top, width, height } = formRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; // Division reduces rotation severity
    const y = -(e.clientY - top - height / 2) / 25;
    
    // Applying the 3D rotation and scale
    formRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  // Reset rotation gracefully when mouse leaves
  const handleMouseLeave = () => {
    if (!formRef.current) return;
    formRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container split-layout">
        
        {/* Left Column: Information */}
        <div className="contact-left">
          <h3 className="contact-title">
            CONTACT <span className="accent-gold">US</span>
          </h3>
          
          <div className="contact-details">
            <h4 className="accent-gold">Contact Details</h4>
            <p>Phone : +91 8591466581</p>
            <p>Email : ss.devcreations@gmail.com</p>
          </div>
        </div>

        {/* Right Column: Interactive 3D Form */}
        <div 
          className="contact-right"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="form-card" ref={formRef}>
            <h4 className="accent-gold card-title">Contact Form</h4>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group full-width">
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder=" " required />
                <label htmlFor="name">Your Name *</label>
              </div>
              
              <div className="form-row">
                <div className="form-group half-width">
                  <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder=" " required />
                  <label htmlFor="email">Your Email *</label>
                </div>
                <div className="form-group half-width">
                  <input type="tel" id="number" value={formData.number} onChange={handleChange} placeholder=" " required />
                  <label htmlFor="number">Your Number *</label>
                </div>
              </div>

              <div className="form-group full-width">
                <input type="text" id="subject" value={formData.subject} onChange={handleChange} placeholder=" " required />
                <label htmlFor="subject">Subject *</label>
              </div>

              <div className="form-group full-width">
                <textarea id="message" value={formData.message} onChange={handleChange} rows={4} placeholder=" " required></textarea>
                <label htmlFor="message">Message *</label>
              </div>

              <button type="submit" className="submit-btn" disabled={status === "loading" || status === "success"} data-cursor="disable">
                {status === "loading" && "SENDING..."}
                {status === "success" && "MESSAGE SENT!"}
                {status === "error" && "ERROR - TRY AGAIN"}
                {status === "idle" && "SEND MESSAGE"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
