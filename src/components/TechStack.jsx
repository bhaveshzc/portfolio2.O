import { useState, useRef, useEffect, useCallback } from "react";
import { Engine, Bodies, Composite, Body } from "matter-js";
import "./TechStack.css";

// The SVG icons
import htmlIcon from "../assets/logos/html.svg";
import cssIcon from "../assets/logos/css.svg";
import jsIcon from "../assets/logos/javascript.svg";
import reactIcon from "../assets/logos/react.svg";
import tailwindIcon from "../assets/logos/tailwind.svg";
import mongoIcon from "../assets/logos/mongodb.svg";
import mysqlIcon from "../assets/logos/mysql.svg";
import gitIcon from "../assets/logos/git.svg";
import githubIcon from "../assets/logos/github.svg";
import dockerIcon from "../assets/logos/docker.svg";
import openaiIcon from "../assets/logos/openai.svg";
import gcloudIcon from "../assets/logos/google-cloud.svg";
import supabaseIcon from "../assets/logos/supabase.svg";
import cloudflareIcon from "../assets/logos/cloudflare.svg";
import vscodeIcon from "../assets/logos/vscode.svg";
import nginxIcon from "../assets/logos/nginx.svg";
import oauthIcon from "../assets/logos/oauth.svg";
import sheetsIcon from "../assets/logos/google-sheets.svg";
import antigravityIcon from "../assets/logos/antigravity.svg";

// Configurable constants: Total 6.0 seconds (tumbles for ~4.6s, flies back up & readjusts at 6.0s)
const REASSEMBLE_START_MS = 4600; // Freeze physics & start fly-up re-assembly
const TOTAL_FALL_DURATION_MS = 6000; // Complete restoration back to original grid

// 19 Technologies: 3 Large (2x2 = 12 cells) + 16 Small (1x1 = 16 cells) = 28 cells
// Perfectly fills 7 columns × 4 rows (Desktop) and 4 columns × 7 rows (Mobile) with 0 gaps!
const technologies = [
  { id: "javascript", name: "JavaScript", icon: jsIcon, size: "large" },
  { id: "html", name: "HTML5", icon: htmlIcon, size: "small" },
  { id: "css", name: "CSS3", icon: cssIcon, size: "small" },
  { id: "git", name: "Git", icon: gitIcon, size: "small" },
  { id: "react", name: "React", icon: reactIcon, size: "large" },
  { id: "github", name: "GitHub", icon: githubIcon, size: "small" },
  { id: "tailwind", name: "Tailwind CSS", icon: tailwindIcon, size: "small" },
  { id: "docker", name: "Docker", icon: dockerIcon, size: "small" },
  { id: "mongodb", name: "MongoDB", icon: mongoIcon, size: "small" },
  { id: "mysql", name: "MySQL", icon: mysqlIcon, size: "small" },
  { id: "antigravity", name: "Google Antigravity", icon: antigravityIcon, size: "large" },
  { id: "supabase", name: "Supabase", icon: supabaseIcon, size: "small" },
  { id: "cloudflare", name: "Cloudflare", icon: cloudflareIcon, size: "small" },
  { id: "google-cloud", name: "Google Cloud", icon: gcloudIcon, size: "small" },
  { id: "vscode", name: "VS Code", icon: vscodeIcon, size: "small" },
  { id: "nginx", name: "Nginx", icon: nginxIcon, size: "small" },
  { id: "oauth", name: "Google OAuth", icon: oauthIcon, size: "small" },
  { id: "google-sheets", name: "Google Sheets", icon: sheetsIcon, size: "small" },
  { id: "openai", name: "OpenAI", icon: openaiIcon, size: "small" },
];

export default function TechStack() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isFalling, setIsFalling] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [fallingCardsData, setFallingCardsData] = useState([]);
  const [detachedIds, setDetachedIds] = useState([]);

  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef({});
  const fallingCardRefs = useRef({});
  const animationFrameRef = useRef(null);
  const timeoutsRef = useRef([]);
  const triggerRef = useRef(null);
  const hasTriggeredRef = useRef(false);
  const activeEngineRef = useRef(null);
  const isRunningRef = useRef(false);
  const isFallingRef = useRef(false);

  useEffect(() => {
    isFallingRef.current = isFalling;
  }, [isFalling]);

  // Clean up timers and physics engine on unmount
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      isRunningRef.current = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      timeouts.forEach(clearTimeout);
      if (activeEngineRef.current) {
        Engine.clear(activeEngineRef.current);
        Composite.clear(activeEngineRef.current.world, false, true);
        activeEngineRef.current = null;
      }
    };
  }, []);

  // Trigger Matter.js Rigid Body Gravity Physics for ALL 19 cards
  const triggerAllFallingPhysics = useCallback(() => {
    if (!sectionRef.current || isFallingRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setIsFalling(true);
    setIsReturning(false);
    const allIds = technologies.map((t) => t.id);
    setDetachedIds(allIds);

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const containerWidth = sectionRect.width;
    const containerHeight = sectionRect.height;

    // 1. Measure exact current positions of all 19 cards in the DOM
    const initialItems = technologies
      .map((tech) => {
        const cardEl = cardRefs.current[tech.id];
        if (!cardEl) return null;

        const rect = cardEl.getBoundingClientRect();
        const startX = rect.left - sectionRect.left;
        const startY = rect.top - sectionRect.top;

        return {
          id: tech.id,
          name: tech.name,
          icon: tech.icon,
          size: tech.size,
          startX,
          startY,
          width: rect.width,
          height: rect.height,
        };
      })
      .filter(Boolean);

    setFallingCardsData(initialItems);

    if (prefersReducedMotion) {
      // Reduced motion: simple fade and restore after duration
      const returnTimeout = setTimeout(() => {
        setIsReturning(true);
        const finishTimeout = setTimeout(() => {
          setSelectedIds([]);
          setDetachedIds([]);
          setFallingCardsData([]);
          setIsFalling(false);
          setIsReturning(false);
        }, 800);
        timeoutsRef.current.push(finishTimeout);
      }, TOTAL_FALL_DURATION_MS - 800);
      timeoutsRef.current.push(returnTimeout);
      return;
    }

    // 2. Initialize Matter.js Physics Engine with Pure Downward Gravity
    const engine = Engine.create({
      gravity: {
        x: 0,
        y: 1.25, // Dominant realistic downward gravitational acceleration
        scale: 0.001,
      },
      positionIterations: 4,
      velocityIterations: 4,
    });
    activeEngineRef.current = engine;
    isRunningRef.current = true;

    // 3. Create Rigid Boundary Bodies (Floor and Side Walls within Skills section)
    const floorY = containerHeight - 10;
    const floor = Bodies.rectangle(
      containerWidth / 2,
      floorY + 25,
      containerWidth * 3,
      50,
      {
        isStatic: true,
        restitution: 0.22,
        friction: 0.4,
      }
    );

    const leftWall = Bodies.rectangle(-25, containerHeight / 2, 50, containerHeight * 3, {
      isStatic: true,
      friction: 0.2,
    });

    const rightWall = Bodies.rectangle(
      containerWidth + 25,
      containerHeight / 2,
      50,
      containerHeight * 3,
      {
        isStatic: true,
        friction: 0.2,
      }
    );

    // 4. Create Rigid Rectangle Bodies for all 19 Cards at their EXACT starting positions
    const cardBodies = {};
    const matterBodiesList = [];

    initialItems.forEach((item) => {
      const centerX = item.startX + item.width / 2;
      const centerY = item.startY + item.height / 2;
      const bodyW = Math.max(10, item.width - 2);
      const bodyH = Math.max(10, item.height - 2);

      const body = Bodies.rectangle(centerX, centerY, bodyW, bodyH, {
        chamfer: { radius: Math.min(10, item.width * 0.15) },
        restitution: 0.22, // Solid realistic card collisions
        friction: 0.35,
        frictionAir: 0.018, // Smooth downward glide through air
        density: 0.002,
        angle: (Math.random() - 0.5) * 0.008, // Very subtle initial tilt
      });

      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.015);

      cardBodies[item.id] = { body, width: item.width, height: item.height };
      matterBodiesList.push(body);
    });

    Composite.add(engine.world, [...matterBodiesList, floor, leftWall, rightWall]);

    let isRunning = true;

    // 5. Physics Update Loop syncing DOM Transforms
    const updatePhysics = () => {
      if (!isRunning || !isRunningRef.current) return;

      Engine.update(engine, 1000 / 60);

      initialItems.forEach((item) => {
        const domEl = fallingCardRefs.current[item.id];
        const bodyObj = cardBodies[item.id];
        if (domEl && bodyObj) {
          const { body, width, height } = bodyObj;
          const x = body.position.x - width / 2;
          const y = body.position.y - height / 2;
          const angle = body.angle;
          domEl.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}rad)`;
        }
      });

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);

    // 6. At ~4.6 seconds: Freeze physics & initiate smooth fly-up re-assembly
    const returnTimer = setTimeout(() => {
      isRunning = false;
      isRunningRef.current = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setIsReturning(true);

      initialItems.forEach((item) => {
        const domEl = fallingCardRefs.current[item.id];
        if (domEl) {
          domEl.style.transition = "transform 1.25s cubic-bezier(0.34, 1.56, 0.64, 1)";
          domEl.style.transform = `translate3d(${item.startX}px, ${item.startY}px, 0) rotate(0rad)`;
        }
      });

      // 7. At 6.0 seconds (6000ms total): Restore original masonry grid state
      const finishTimer = setTimeout(() => {
        Engine.clear(engine);
        Composite.clear(engine.world, false, true);
        activeEngineRef.current = null;
        setSelectedIds([]);
        setDetachedIds([]);
        setFallingCardsData([]);
        setIsFalling(false);
        setIsReturning(false);
      }, 1400);

      timeoutsRef.current.push(finishTimer);
    }, REASSEMBLE_START_MS);

    timeoutsRef.current.push(returnTimer);
  }, []);

  useEffect(() => {
    triggerRef.current = triggerAllFallingPhysics;
  }, [triggerAllFallingPhysics]);

  // Scroll Trigger: Automatically triggers when user scrolls into the TechStack section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Trigger when user scrolls into the section (grid is comfortably in view)
          const isInTriggerZone = rect.top <= windowHeight * 0.55 && rect.bottom >= windowHeight * 0.25;

          if (isInTriggerZone && !isFallingRef.current && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            if (triggerRef.current) {
              triggerRef.current();
            }
          }

          // Reset trigger flag when user scrolls away from the section so it can trigger again on next visit
          const isFarAway = rect.bottom < -150 || rect.top > windowHeight + 150;
          if (isFarAway && !isFallingRef.current) {
            hasTriggeredRef.current = false;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Card click for simple selection/interaction
  const handleCardClick = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(id);
    }
  };

  return (
    <section className="techstack-section" id="skills" ref={sectionRef}>
      <div className="techstack-container">

        {/* Clean, Minimal Header */}
        <div className="techstack-header">
          <h2 className="techstack-title">
            Working with the latest technologies.
          </h2>
        </div>

        {/* Tightly Packed Square Bento Grid */}
        <div className="techstack-square-grid" ref={gridRef}>
          {technologies.map((tech) => {
            const isSelected = selectedIds.includes(tech.id);
            const isDetached = detachedIds.includes(tech.id);

            return (
              <div
                key={tech.id}
                ref={(el) => {
                  if (el) cardRefs.current[tech.id] = el;
                }}
                className={`square-card-slot size-${tech.size} ${
                  isDetached ? "is-detached" : ""
                }`}
              >
                <button
                  type="button"
                  className={`square-card ${isSelected ? "is-selected" : ""}`}
                  onClick={() => handleCardClick(tech.id)}
                  onKeyDown={(e) => handleKeyDown(e, tech.id)}
                  disabled={isFalling}
                  aria-pressed={isSelected}
                  aria-label={tech.name}
                  title={tech.name}
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="square-card-icon"
                    loading="lazy"
                  />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Matter.js Rigid Body Physics Falling Layer */}
      {fallingCardsData.length > 0 && (
        <div className="techstack-falling-layer" aria-hidden="true">
          {fallingCardsData.map((item) => (
            <div
              key={`falling-${item.id}`}
              ref={(el) => {
                if (el) fallingCardRefs.current[item.id] = el;
              }}
              className={`falling-square-card size-${item.size} ${
                isReturning ? "is-returning" : ""
              }`}
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                transform: `translate3d(${item.startX}px, ${item.startY}px, 0)`,
              }}
            >
              <div className="square-card">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="square-card-icon"
                  loading="eager"
                  decoding="sync"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
