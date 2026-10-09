import { Link } from "react-router-dom";
import ditLogo from "../assets/logos/DIT_University_Dehradun_Logo.jpg";
import flatFactoryLogo from "../assets/logos/the flat factory.jpg";
import "./Experience.css";

const experiences = [
  {
    period: "2025 — PRESENT",
    role: "Full-Stack Developer",
    organization: "The Flat Factory",
    location: "Remote",
    logo: flatFactoryLogo,
    logoShape: "square",
    logoAlt: "The Flat Factory Logo",
    url: null,
    description:
      "Architecting and building production full-stack real estate platforms and cloud web applications. Engineering high-performance React user interfaces, robust Node.js backend services, MySQL databases, and interactive maps & dashboard integrations.",
    tech: ["React", "Node.js", "MySQL", "Express", "REST APIs", "Cloud Architecture"],
  },
  {
    period: "2022 — 2025",
    role: "Bachelor of Computer Applications",
    organization: "DIT University",
    location: "Dehradun, Uttarakhand, India",
    logo: ditLogo,
    logoShape: "square",
    logoAlt: "DIT University Dehradun Logo",
    url: "https://www.dituniversity.edu.in/",
    description:
      "Graduated with distinction from DIT University Dehradun in Computer Applications. Built comprehensive foundation in computer science, software architecture, data structures, algorithms, object-oriented systems, and full-stack web engineering.",
    tech: ["Computer Science", "DSA", "DBMS", "Software Engineering", "Full-Stack Dev"],
  },
];

export default function Experience() {
  return (
    <section className="experience-luxury-section" id="experience">
      <div className="experience-luxury-container">
        
        {/* Section Header */}
        <div className="section-header-left">
          <h2 className="section-script-subtitle">Career Timeline</h2>
        </div>

        {/* Timeline Container */}
        <div className="timeline-wrapper">
          {experiences.map((item, idx) => (
            <div key={idx} className="timeline-node-item">
              
              {/* Right Card Content */}
              <div className="luxury-glass-card timeline-card-content">
                <div className="timeline-card-header">
                  <span className="timeline-period-badge">{item.period}</span>
                  <span className="timeline-location-text">{item.location}</span>
                </div>

                <h4 className="timeline-role-title">{item.role}</h4>

                {/* Organization with Logo in Curved Box (Clickable if URL present) */}
                <div className="org-brand-row">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`org-logo-container org-logo-link ${item.logoShape === 'square' ? 'org-logo-box-square' : 'org-logo-box-rect'}`}
                      title={`Visit ${item.organization}`}
                    >
                      <img
                        src={item.logo}
                        alt={item.logoAlt}
                        className={item.logoShape === 'square' ? 'org-logo-img-square' : 'org-logo-img-rect'}
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <div className={`org-logo-container ${item.logoShape === 'square' ? 'org-logo-box-square' : 'org-logo-box-rect'}`}>
                      <img
                        src={item.logo}
                        alt={item.logoAlt}
                        className={item.logoShape === 'square' ? 'org-logo-img-square' : 'org-logo-img-rect'}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <span className="timeline-org-name">{item.organization}</span>
                </div>

                <div className="timeline-tech-row">
                  {item.tech.map((t, tIdx) => (
                    <span key={tIdx} className="timeline-tech-pill">{t}</span>
                  ))}
                </div>
              </div>

            </div>
          ))}
          
          {/* Bottom Cards (Aligned with timeline cards) */}
          <div className="timeline-node-item bottom-boxes-wrapper">
            
            <div className="experience-bottom-cards">
              {/* Rectangular Card: Let's Work Together */}
              <Link to="/contact" className="luxury-glass-card exp-action-card exp-card-contact">
                <h3 className="exp-gradient-card-title">
                  Let's work<br /><span className="exp-red-accent">together.</span>
                </h3>
              </Link>

              {/* Square Card: My work */}
              <Link to="/projects" className="luxury-glass-card exp-action-card exp-card-work">
                <h3 className="exp-script-title">My work</h3>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
