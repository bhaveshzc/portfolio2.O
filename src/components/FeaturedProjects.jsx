import "./FeaturedProjects.css";

const projects = [
  {
    id: "flat-factory",
    title: "The Flat Factory",
    category: "Full-Stack Real Estate Platform",
    tag: "FEATURED PRODUCTION",
    description:
      "A comprehensive real estate discovery engine and management suite. Features interactive map search, real-time property filtering, verified listing portals, and an administrative analytics dashboard.",
    technologies: ["React", "Node.js", "MySQL", "Google Maps API", "Express", "Tailwind CSS"],
    highlights: [
      "Custom geospatial property querying with Google Maps integration",
      "Robust relational database schemas with MySQL",
      "Role-based access control for brokers, clients, and admins",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername",
  },
  {
    id: "novacommerce",
    title: "NovaCommerce SaaS",
    category: "Modern E-Commerce Storefront",
    tag: "SAAS PLATFORM",
    description:
      "A fast, responsive online commerce platform engineered with secure checkout flows, dynamic product variants, inventory state synchronization, and user account management.",
    technologies: ["React", "Node.js", "REST APIs", "Tailwind CSS", "JWT Auth"],
    highlights: [
      "Sub-second load times with optimized React rendering",
      "Secure payment processing integration",
      "Responsive customer and seller portal dashboards",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername",
  },
  {
    id: "ai-workspace",
    title: "OmniAI Studio",
    category: "AI Productivity Application",
    tag: "AI WORKFLOW",
    description:
      "Intelligent content and code automation studio leveraging LLM APIs with real-time token streaming, prompt templating, and custom markdown rendering.",
    technologies: ["React", "OpenAI / Gemini API", "Node.js", "WebSockets"],
    highlights: [
      "Streamed generation with zero UI lag",
      "Modular workspace with persistent session history",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="projects-luxury-section" id="projects">
      <div className="projects-luxury-container">
        
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-micro-tag">PORTFOLIO</span>
          <h2 className="section-script-subtitle">Selected Works</h2>
          <h3 className="section-main-heading">Featured Projects</h3>
        </div>

        {/* Project Cards List */}
        <div className="projects-list-wrapper">
          {projects.map((project, idx) => (
            <div key={project.id} className="luxury-glass-card project-card-item">
              
              <div className="project-card-top">
                <div className="project-badge-row">
                  <span className="project-tag-pill">{project.tag}</span>
                  <span className="project-index">0{idx + 1}</span>
                </div>

                <h4 className="project-title">{project.title}</h4>
                <p className="project-subtitle-category">{project.category}</p>
                <p className="project-description-text">{project.description}</p>
              </div>

              {/* Highlights */}
              <div className="project-highlights-box">
                {project.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="highlight-point">
                    <span className="point-diamond">✦</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges & Actions */}
              <div className="project-card-bottom">
                <div className="project-tech-tags">
                  {project.technologies.map((t, tIdx) => (
                    <span key={tIdx} className="project-tech-badge">{t}</span>
                  ))}
                </div>

                <div className="project-action-buttons">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-btn btn-secondary"
                  >
                    <span>Source Code</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>

                  <a
                    href={project.liveUrl}
                    className="project-action-btn btn-primary"
                  >
                    <span>View Project</span>
                    <span className="btn-arrow">→</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
