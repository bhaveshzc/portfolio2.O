import { Link } from "react-router-dom";
import "./ContactSection.css";

export default function ContactSection() {
  return (
    <section className="contact-luxury-section" id="contact">
      

      <div className="contact-luxury-container">
        
        {/* Three Column Action Row */}
        <div className="contact-three-col-row">
          
          {/* Left: My Journey */}
          <Link to="/journey" className="luxury-glass-card mini-action-card card-journey contact-small-card">
            <h3 className="script-title contact-script-title">My Journey</h3>
          </Link>

          {/* Middle: Let's Work Together */}
          <Link to="/contact" className="luxury-glass-card mini-action-card gradient-text-card contact-small-card">
            <h3 className="gradient-card-title contact-gradient-title">
              Let's work<br /><span className="red-accent">together.</span>
            </h3>
          </Link>

          {/* Right: My Projects */}
          <Link to="/projects" className="luxury-glass-card mini-action-card card-portfolio contact-small-card">
            <h3 className="script-title contact-script-title">My Projects</h3>
          </Link>

        </div>

      </div>
    </section>
  );
}
