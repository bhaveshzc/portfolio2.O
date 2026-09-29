import "./SkillsSection.css";

// SVG Icons from logos
import reactIcon from "../assets/logos/react.svg";
import jsIcon from "../assets/logos/javascript.svg";
import tailwindIcon from "../assets/logos/tailwind.svg";
import htmlIcon from "../assets/logos/html.svg";
import cssIcon from "../assets/logos/css.svg";
import nodeIcon from "../assets/logos/javascript.svg"; // Node.js
import nginxIcon from "../assets/logos/nginx.svg";
import oauthIcon from "../assets/logos/oauth.svg";
import mysqlIcon from "../assets/logos/mysql.svg";
import mongoIcon from "../assets/logos/mongodb.svg";
import supabaseIcon from "../assets/logos/supabase.svg";
import gcloudIcon from "../assets/logos/google-cloud.svg";
import cloudflareIcon from "../assets/logos/cloudflare.svg";
import dockerIcon from "../assets/logos/docker.svg";
import gitIcon from "../assets/logos/git.svg";
import githubIcon from "../assets/logos/github.svg";
import vscodeIcon from "../assets/logos/vscode.svg";
import openaiIcon from "../assets/logos/openai.svg";

const skillCategories = [
  {
    category: "Frontend Architecture",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    skills: [
      { name: "React", icon: reactIcon },
      { name: "JavaScript (ES6+)", icon: jsIcon },
      { name: "Tailwind CSS", icon: tailwindIcon },
      { name: "HTML5", icon: htmlIcon },
      { name: "CSS3 / SCSS", icon: cssIcon },
    ],
  },
  {
    category: "Backend & Systems",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    ),
    skills: [
      { name: "Node.js", icon: nodeIcon },
      { name: "RESTful APIs", icon: oauthIcon },
      { name: "Nginx", icon: nginxIcon },
      { name: "OAuth 2.0 / Auth", icon: oauthIcon },
      { name: "OpenAI / AI APIs", icon: openaiIcon },
    ],
  },
  {
    category: "Databases & Cloud",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
    skills: [
      { name: "MySQL", icon: mysqlIcon },
      { name: "MongoDB", icon: mongoIcon },
      { name: "Supabase", icon: supabaseIcon },
      { name: "Google Cloud", icon: gcloudIcon },
      { name: "Cloudflare", icon: cloudflareIcon },
    ],
  },
  {
    category: "DevOps & Tooling",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    skills: [
      { name: "Docker", icon: dockerIcon },
      { name: "Git", icon: gitIcon },
      { name: "GitHub", icon: githubIcon },
      { name: "VS Code", icon: vscodeIcon },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section className="skills-luxury-section" id="skills">
      <div className="skills-luxury-container">
        
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-micro-tag">CORE COMPETENCIES</span>
          <h2 className="section-script-subtitle">Technical Arsenal</h2>
          <h3 className="section-main-heading">Skills & Tech Stack</h3>
        </div>

        {/* 4 Category Glass Cards Grid */}
        <div className="skills-category-grid">
          {skillCategories.map((group, idx) => (
            <div key={idx} className="luxury-glass-card skill-category-card">
              <div className="category-header">
                <div className="category-icon-wrapper">{group.icon}</div>
                <h4 className="category-name">{group.category}</h4>
              </div>

              <div className="skills-pill-list">
                {group.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item-pill">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="skill-pill-icon"
                      loading="lazy"
                    />
                    <span className="skill-pill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
