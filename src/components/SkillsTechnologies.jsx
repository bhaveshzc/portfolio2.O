import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiRust,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiRedux,
  SiVite,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiFastify,
  SiGraphql,
  SiPostman,
  SiSocketdotio,
  SiNestjs,
  SiPrisma,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiSqlite,
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiCloudflare,
  SiNginx,
  SiGit,
  SiGithub,
  SiLinux,
  SiFigma,
  SiBlender,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import {
  TbBrandAdobePremiere,
  TbBrandAdobePhotoshop,
  TbBrandAdobeIllustrator,
  TbBrandAdobeAfterEffect,
} from "react-icons/tb";
import "./SkillsTechnologies.css";

const skillCategories = [
  {
    category: "Languages",
    direction: "left",
    speed: "65s",
    skills: [
      { name: "JavaScript", Icon: SiJavascript, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "TypeScript", Icon: SiTypescript, url: "https://www.typescriptlang.org/" },
      { name: "Python", Icon: SiPython, url: "https://www.python.org/" },
      { name: "C++", Icon: SiCplusplus, url: "https://isocpp.org/" },
      { name: "Rust", Icon: SiRust, url: "https://www.rust-lang.org/" },
      { name: "HTML5", Icon: SiHtml5, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS3", Icon: SiCss, url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    ],
  },
  {
    category: "Frontend",
    direction: "right",
    speed: "75s",
    skills: [
      { name: "HTML5", Icon: SiHtml5, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS3", Icon: SiCss, url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "JavaScript", Icon: SiJavascript, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "React", Icon: SiReact, url: "https://react.dev/" },
      { name: "Next.js", Icon: SiNextdotjs, url: "https://nextjs.org/" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, url: "https://tailwindcss.com/" },
      { name: "Shadcn UI", Icon: SiShadcnui, url: "https://ui.shadcn.com/" },
      { name: "Redux", Icon: SiRedux, url: "https://redux.js.org/" },
      { name: "Vite", Icon: SiVite, url: "https://vite.dev/" },
      { name: "Framer Motion", Icon: SiFramer, url: "https://motion.dev/" },
    ],
  },
  {
    category: "Backend",
    direction: "left",
    speed: "70s",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, url: "https://nodejs.org/" },
      { name: "Express.js", Icon: SiExpress, url: "https://expressjs.com/" },
      { name: "Fastify", Icon: SiFastify, url: "https://fastify.dev/" },
      { name: "GraphQL", Icon: SiGraphql, url: "https://graphql.org/" },
      { name: "REST APIs & Postman", Icon: SiPostman, url: "https://www.postman.com/" },
      { name: "Socket.io", Icon: SiSocketdotio, url: "https://socket.io/" },
      { name: "NestJS", Icon: SiNestjs, url: "https://nestjs.com/" },
      { name: "Prisma ORM", Icon: SiPrisma, url: "https://www.prisma.io/" },
    ],
  },
  {
    category: "Databases",
    direction: "right",
    speed: "65s",
    skills: [
      { name: "MySQL", Icon: SiMysql, url: "https://www.mysql.com/" },
      { name: "PostgreSQL", Icon: SiPostgresql, url: "https://www.postgresql.org/" },
      { name: "MongoDB", Icon: SiMongodb, url: "https://www.mongodb.com/" },
      { name: "Redis", Icon: SiRedis, url: "https://redis.io/" },
      { name: "Supabase", Icon: SiSupabase, url: "https://supabase.com/" },
      { name: "Firebase", Icon: SiFirebase, url: "https://firebase.google.com/" },
      { name: "SQLite", Icon: SiSqlite, url: "https://www.sqlite.org/" },
    ],
  },
  {
    category: "Cloud & DevOps",
    direction: "left",
    speed: "72s",
    skills: [
      { name: "Docker", Icon: SiDocker, url: "https://www.docker.com/" },
      { name: "AWS", Icon: FaAws, url: "https://aws.amazon.com/" },
      { name: "Google Cloud", Icon: SiGooglecloud, url: "https://cloud.google.com/" },
      { name: "Cloudflare", Icon: SiCloudflare, url: "https://www.cloudflare.com/" },
      { name: "Kubernetes", Icon: SiKubernetes, url: "https://kubernetes.io/" },
      { name: "Nginx", Icon: SiNginx, url: "https://nginx.org/" },
      { name: "Git", Icon: SiGit, url: "https://git-scm.com/" },
      { name: "GitHub", Icon: SiGithub, url: "https://github.com/" },
      { name: "Linux", Icon: SiLinux, url: "https://www.linux.org/" },
    ],
  },
  {
    category: "Design",
    direction: "right",
    speed: "60s",
    skills: [
      { name: "Figma", Icon: SiFigma, url: "https://www.figma.com/" },
      { name: "Adobe Photoshop", Icon: TbBrandAdobePhotoshop, url: "https://www.adobe.com/products/photoshop.html" },
      { name: "Adobe Premiere Pro", Icon: TbBrandAdobePremiere, url: "https://www.adobe.com/products/premiere.html" },
      { name: "Adobe After Effects", Icon: TbBrandAdobeAfterEffect, url: "https://www.adobe.com/products/aftereffects.html" },
      { name: "Adobe Illustrator", Icon: TbBrandAdobeIllustrator, url: "https://www.adobe.com/products/illustrator.html" },
      { name: "Blender", Icon: SiBlender, url: "https://www.blender.org/" },
    ],
  },
];

export default function SkillsTechnologies() {
  return (
    <div className="skills-tech-card luxury-glass-card">
      {/* Header bar */}
      <div className="skills-card-header">
        <h4 className="skills-section-title">SKILLS <span className="skills-title-amp">&</span> TECHNOLOGIES</h4>
      </div>

      {/* Skills Table Rows */}
      <div className="skills-table-body">
        {skillCategories.map((cat, idx) => {
          // Repeat skills array to ensure continuous long track for any resolution
          const repeatedSkills = [
            ...cat.skills,
            ...cat.skills,
            ...cat.skills,
            ...cat.skills,
          ];

          return (
            <div key={idx} className="skills-table-row">
              {/* Left Category Column */}
              <div className="skills-category-col">
                <span className="category-label-text">{cat.category}</span>
              </div>

              {/* Right Marquee Column */}
              <div className="skills-marquee-col" aria-label={`${cat.category} skills`}>
                <div 
                  className={`skills-marquee-track ${cat.direction === "left" ? "direction-left" : "direction-right"}`}
                  style={{ animationDuration: cat.speed }}
                >
                  {/* Track Segment 1 */}
                  <div className="skills-track-segment">
                    {repeatedSkills.map((item, sIdx) => {
                      const IconComp = item.Icon;
                      return (
                        <a
                          key={`s1-${sIdx}`}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="skills-icon-pill"
                          title={item.name}
                          aria-label={item.name}
                        >
                          <IconComp className="skills-tech-icon" />
                        </a>
                      );
                    })}
                  </div>

                  {/* Track Segment 2 (Identical Clone for 100% Seamless Gapless Loop) */}
                  <div className="skills-track-segment" aria-hidden="true">
                    {repeatedSkills.map((item, sIdx) => {
                      const IconComp = item.Icon;
                      return (
                        <a
                          key={`s2-${sIdx}`}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="skills-icon-pill"
                          title={item.name}
                          tabIndex="-1"
                        >
                          <IconComp className="skills-tech-icon" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
