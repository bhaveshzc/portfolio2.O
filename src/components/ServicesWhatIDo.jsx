import { motion } from "motion/react";
import "./ServicesWhatIDo.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ServicesWhatIDo() {
  const cards = [
    {
      titleTop: "",
      titleMain: "frontend development",
      subtitle: "For ideas that need a sharp, fast interface.",
      description:
        "Responsive websites, landing pages, portfolios, web apps, dashboards, and pixel-perfect UI built from Figma designs.",
      tags: "FRONTEND / UI / RESPONSIVE",
    },
    {
      titleTop: "",
      titleMain: "backend development",
      subtitle: "Pretty interfaces don't run on their own.",
      description:
        "I build the engine behind your product: APIs, databases, authentication, server logic, and secure data handling using Node.js, MongoDB, and other modern tools.",
      tags: "APIS / DATABASES / SECURITY",
    },
    {
      titleTop: "Custom",
      titleMain: "web apps",
      subtitle: "When a template isn't enough, we build it right.",
      description:
        "Full-stack web apps, SaaS MVPs, admin panels, booking systems, client portals, calculators, and AI-assisted tools made around your exact needs.",
      tags: "CUSTOM / FULL-STACK / AI-ASSISTED",
    },
    {
      titleTop: "",
      titleMain: "integrations & deployment",
      subtitle: "Because a product that doesn't connect is still unfinished.",
      description:
        "Payment gateways, third-party APIs, CRM and email integrations, hosting, domains, performance optimization, and ongoing maintenance.",
      tags: "INTEGRATE / DEPLOY / SCALE",
    },
  ];

  return (
    <section className="what-i-do-section">
      <div className="what-i-do__container">
        {/* Top Header */}
        <motion.div
          className="what-i-do__header-bar"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="what-i-do__label-left">
            02 / WHAT I DO
          </div>
          <div className="what-i-do__label-right">
            Web Development & Digital Products
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="what-i-do__content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {/* Text Area */}
          <div className="what-i-do__text-area">
            <motion.h2 className="what-i-do__headline" variants={fadeUp}>
              <span className="what-i-do__headline-line">not just code.</span>
              <span className="what-i-do__headline-line">
                the <span className="what-i-do__highlight">whole</span> product.
              </span>
            </motion.h2>

            <motion.p className="what-i-do__intro" variants={fadeUp}>
              From idea to architecture to deployment, I build fast, clean, and scalable web experiences that work beautifully for your users and reliably for your business.
            </motion.p>
          </div>

          {/* Grid Area */}
          <div className="what-i-do__grid">
            {cards.map((card, index) => (
              <motion.div
                className="what-i-do__card"
                key={index}
                variants={fadeUp}
              >
                <div className="what-i-do__card-title-group">
                  {card.titleTop && (
                    <span className="what-i-do__card-title-cursive">
                      {card.titleTop}
                    </span>
                  )}
                  <h3 className="what-i-do__card-title-main">
                    {card.titleMain}
                  </h3>
                </div>

                <p className="what-i-do__card-subtitle">{card.subtitle}</p>
                <p className="what-i-do__card-desc">{card.description}</p>

                <div className="what-i-do__card-tag-wrapper">
                  <span className="what-i-do__card-tag">{card.tags}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
