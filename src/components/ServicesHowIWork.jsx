import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./ServicesHowIWork.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "diagnose", subtitle: "Figure out what we're actually building, and why.", body: "Problem, users, goals, must-have features, and what's slowing the business down right now." },
  { num: "02", title: "architect", subtitle: "Plan the system before writing a single line.", body: "Tech stack, database structure, user flows, API design, and a clear roadmap so nothing gets rebuilt halfway." },
  { num: "03", title: "design", subtitle: "Make it feel as good as it works.", body: "Clean UI, smooth UX, responsive layouts, and every screen designed around how people actually use it." },
  { num: "04", title: "build", subtitle: "Turn the plan into something that actually runs.", body: "Clean, scalable frontend, backend, and database code, delivered in clear milestones you can see and test." },
  { num: "05", title: "connect", subtitle: "Make sure nothing works alone.", body: "Payments, third-party APIs, authentication, email, CRM, automations, and every moving part talking to each other." },
  { num: "06", title: "launch", subtitle: "Test it. Break it. Fix it. Then go live.", body: "Cross-device testing, bug fixes, security checks, performance tuning, and a smooth deployment — with support after launch." },
];

export default function ServicesHowIWork() {
  const containerRef = useRef(null);
  const railRef = useRef(null);
  const fillRef = useRef(null);
  const dotRef = useRef(null);


  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepsElements = gsap.utils.toArray(".hiw__step", containerRef.current);
    const rail = railRef.current;
    const fill = fillRef.current;
    const dot = dotRef.current;

    if (prefersReducedMotion) {
      gsap.set(stepsElements, { opacity: 1, filter: "blur(0px)", scale: 1 });
      if (rail) gsap.set(rail, { display: "none" });
      return;
    }

    // Dynamic Rail & Single Dot Animation
    if (stepsElements.length >= 2 && rail && dot && fill) {
      const firstStep = stepsElements[0];
      const lastStep = stepsElements[stepsElements.length - 1];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: firstStep,
          start: "center center",
          endTrigger: lastStep,
          end: "center center",
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      tl.to(dot, {
        y: () => {
          // Calculate the center of the first step and last step
          const startY = firstStep.offsetTop + firstStep.offsetHeight / 2;
          const endY = lastStep.offsetTop + lastStep.offsetHeight / 2;

          // Set the line to strictly connect the two centers
          gsap.set(rail, { top: startY, height: endY - startY });

          // Return the distance the dot needs to travel
          return endY - startY;
        },
        ease: "none",
      }, 0);

      tl.fromTo(fill,
        { scaleY: 0 },
        { scaleY: 1, ease: "none" },
        0
      );
    }

    // Individual Step Focus Animation
    stepsElements.forEach((step, i) => {
      const nextStep = stepsElements[i + 1] || null;

      // Step 01 starts sharp, others start blurred
      if (i === 0) {
        gsap.set(step, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          transformOrigin: "left center"
        });
      } else {
        gsap.set(step, {
          opacity: 0.15,
          filter: "blur(8px)",
          scale: 0.8,
          transformOrigin: "left center"
        });
      }

      // Animate INTO focus (Steps 02-06)
      // Unblurs ONLY when the dot hits the tip of THIS step, finishing at the middle
      if (i > 0) {
        gsap.fromTo(step,
          { opacity: 0.15, filter: "blur(8px)", scale: 0.8 },
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: step,
              start: "top center",
              end: "center center",
              scrub: true,
            }
          }
        );
      }

      // Animate OUT of focus (Steps 01-05)
      // Blurs ONLY when the dot hits the tip of the NEXT step, finishing at its middle
      if (nextStep) {
        gsap.fromTo(step,
          { opacity: 1, filter: "blur(0px)", scale: 1 },
          {
            opacity: 0.15,
            filter: "blur(8px)",
            scale: 0.8,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: nextStep,
              start: "top center",
              end: "center center",
              scrub: true,
            }
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section className="hiw" ref={containerRef} aria-label="How I Work">
      <div className="hiw__container">

        {/* Header Block - Left Aligned */}
        <div className="hiw__header">
          <div className="hiw__label">
            <span className="label-num">04 / </span>
            <span className="label-text">HOW I WORK</span>
          </div>
          <h2 className="hiw__headline">
            <span className="hiw__h-black">No random code.</span>
            <span className="hiw__h-red">Every step has a job.</span>
          </h2>
          <p className="hiw__intro-light">
            We start with the problem, map the system, design around real users,
            then build the d*mn thing properly.
          </p>
        </div>

        {/* Steps Stage */}
        <div className="hiw__stage">
          <div className="hiw__rail" aria-hidden="true" ref={railRef}>
            <div className="hiw__rail-fill" ref={fillRef} />
            <div className="hiw__rail-dot" ref={dotRef} />
          </div>
          <div className="hiw__steps">
            {steps.map((step) => (
              <div key={step.num} className="hiw__step">
                <span className="hiw__num">{step.num}</span>
                <div className="hiw__step-text">
                  <span className="hiw__step-title">{step.title}</span>
                  <p className="hiw__step-sub">{step.subtitle}</p>
                  <p className="hiw__step-body">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
