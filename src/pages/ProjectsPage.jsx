import React, { useState } from "react";
import ContactSection from "../components/ContactSection";
import { CoverflowCarousel } from "../components/ui/coverflow-carousel";
import { Globe, Share2, Check } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import "./Pages.css";

import oceanFood from "../assets/PROJECTS SS/OCEAN FOOD.png";
import grilli from "../assets/PROJECTS SS/GRILLI.png";
import studio from "../assets/PROJECTS SS/STUDIO.png";
import amwaj from "../assets/PROJECTS SS/AMWAJ.png";
import valueStation from "../assets/PROJECTS SS/valuestation.png";
import flatFactory from "../assets/PROJECTS SS/flatfactory.png";

const PROJECTS = [
  {
    src: oceanFood,
    alt: "Ocean Food Project",
    title: "Ocean Food",
    subtitle: "Premium Seafood Platform & Direct Ordering Experience",
    link: "https://oceanfood.vercel.app/",
    github: "https://github.com/bhaveshzc/Ocean-Food",
  },
  {
    src: grilli,
    alt: "Grill Restaurant Project",
    title: "Grilli Restaurant",
    subtitle: "Luxury Dining UI & Interactive Table Reservation Portal",
    link: "https://grill-restaurant-mu.vercel.app/",
    github: "https://github.com/bhaveshzc/Grill-Restaurant",
  },
  {
    src: studio,
    alt: "Biztxcle Studio Project",
    title: "Biztxcle Studio",
    subtitle: "Creative Digital Agency & 3D Interactive Showcase",
    link: "https://biztxcle-studio.vercel.app/",
    github: "https://github.com/bhaveshzc/biztxcle-studio",
  },
  {
    src: amwaj,
    alt: "Amwaj Development Project",
    title: "Amwaj Development",
    subtitle: "Corporate Real Estate Architecture & Living Spaces",
    link: "https://amwaj-development.com/",
    github: "https://github.com/bhaveshzc/amwaj-development",
  },
  {
    src: valueStation,
    alt: "Value Station Project",
    title: "Value Station",
    subtitle: "Curated Daily Essentials & Modern E-Commerce Storefront",
    link: "https://valuestation.xo.je/?i=1",
    github: "https://github.com/bhaveshzc/valuestation",
  },
  {
    src: flatFactory,
    alt: "The Flat Factory Project",
    title: "The Flat Factory",
    subtitle: "Modern Urban Living Discovery & Property Management Suite",
    link: "https://theflatfactory.gt.tc/?i=1",
    github: "https://github.com/bhaveshzc/theflatfactory",
  },
];

export default function ProjectsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeProject = PROJECTS[selectedIndex] || PROJECTS[0];

  const handleShare = async () => {
    const shareData = {
      title: `${activeProject.title} — Biztxcle Portfolio`,
      text: `Check out ${activeProject.title}: ${activeProject.subtitle}`,
      url: activeProject.link || window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    // Fallback: Copy link to clipboard
    navigator.clipboard.writeText(activeProject.link || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="projects-page-container">
      {/* =====================================================================
          1. HEADER TITLE
          ===================================================================== */}
      <div className="w-full flex flex-col items-center text-center px-4 pt-4 mb-4 select-none">
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#e00101]"
          style={{
            fontFamily: "'Syne', sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          Explore My Work
        </h1>
      </div>

      {/* =====================================================================
          2. 3D COVERFLOW CAROUSEL (Shifted Down from Heading)
          👉 TO ADJUST Y POSITION: Change 'marginTop' below (e.g. 30px, 60px, 80px)
          ===================================================================== */}
      <section
        className="carousel-stage-container"
        style={{ marginTop: "55px", marginBottom: "35px" }}
      >
        <CoverflowCarousel
          slides={PROJECTS}
          initialIndex={0}
          rotate={38}
          depth={0.52}
          perspective={3}
          falloff={0.55}
          fade={0.12}
          cardWidth="clamp(280px, 36vw, 480px)"
          cardAspect="16 / 8"
          gap={0.08}
          loop={true}
          showCaption={false}
          showPagination={false}
          showNavigation={true}
          onSelect={(idx) => setSelectedIndex(idx)}
          onCardClick={(slide) => {
            if (slide.link) window.open(slide.link, "_blank");
          }}
          className="w-full"
        />
      </section>

      {/* =====================================================================
          3. ACTIVE PROJECT DETAILS & ACTION BUTTONS
          - Adjust top gap via pt-8 / pt-10
          - Centered in the middle of the page
          ===================================================================== */}
      <div className="w-full flex flex-col items-center justify-center px-4 pt-8 pb-16 z-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col items-center text-center max-w-2xl w-full"
          >
            {/* Project Name */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-white mb-2 font-['Inter',sans-serif]">
              {activeProject?.title}
            </h3>

            {/* Project Subtitle */}
            <p className="text-sm sm:text-base text-neutral-400 font-normal tracking-wide mb-6 max-w-xl">
              {activeProject?.subtitle}
            </p>

            {/* Action Bar (Centered in the Middle) */}
            <div className="project-actions-row">
              <div className="project-btns-group">
                {/* Segmented Pill: Website + Code */}
                <div className="project-segmented-pill">
                  {activeProject?.link && (
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-segment-btn group"
                      title="Visit live website"
                    >
                      <Globe
                        size={14}
                        className="text-neutral-400 group-hover:text-white transition-colors"
                      />
                      <span className="grey-shine-text">Website</span>
                    </a>
                  )}

                  <a
                    href={activeProject?.github || "https://github.com/bhaveshzc"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-segment-btn group"
                    title="View source code on GitHub"
                  >
                    <FaGithub
                      size={14}
                      className="text-neutral-400 group-hover:text-white transition-colors"
                    />
                    <span className="grey-shine-text">Code</span>
                  </a>
                </div>

                {/* Standalone Share Pill */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="project-share-btn group"
                  title="Share this project"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      <span className="text-green-400 font-medium text-[13px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2
                        size={14}
                        className="text-neutral-400 group-hover:text-white transition-colors"
                      />
                      <span className="grey-shine-text">Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Contact Section */}
      <ContactSection />
    </main>
  );
}
