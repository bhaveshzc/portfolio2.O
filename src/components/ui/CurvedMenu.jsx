import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const MENU_SLIDE_ANIMATION = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

const defaultNavItems = [
  { heading: "Home", href: "/" },
  { heading: "About", href: "/journey" },
  { heading: "Services", href: "/services" },
  { heading: "Projects", href: "/projects" },
  { heading: "Contact", href: "/contact" },
];

const CustomFooter = () => {
  return (
    <div className="flex w-full text-sm justify-between text-[#F5F5F5] px-10 md:px-24 py-5 border-t border-white/10">
      <a href="https://www.linkedin.com/in/bhavesh-bisht-99142a383/" target="_blank" rel="noopener noreferrer" className="hover:text-[#e00101] transition-colors">
        <FaLinkedinIn size={24} />
      </a>
      <a href="https://github.com/bhaveshzc" target="_blank" rel="noopener noreferrer" className="hover:text-[#e00101] transition-colors">
        <FaGithub size={24} />
      </a>
      <a href="https://www.instagram.com/biztxcle/?__d=1%2FHolzbau%2BPiotrowicz" target="_blank" rel="noopener noreferrer" className="hover:text-[#e00101] transition-colors">
        <FaInstagram size={24} />
      </a>
      <a href="https://t.me/+916398854475" target="_blank" rel="noopener noreferrer" className="hover:text-[#e00101] transition-colors">
        <FaTelegramPlane size={24} />
      </a>
    </div>
  );
};

const NavLink = ({ heading, href, setIsActive }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const location = useLocation();

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleClick = () => {
    setIsActive(false);
  };

  const isHash = href.startsWith("/#");

  const content = (
    <div className="relative flex items-start group">
      <div className="flex flex-row gap-1">
        <span
          className={`relative z-10 block text-4xl md:text-5xl font-extralight transition-colors duration-300 ${
            location.pathname === href ||
            ((href === "/services" || href === "/#services") && (location.pathname === "/services" || location.hash === "#services"))
              ? "text-[#e00101]"
              : "text-[#F5F5F5] group-hover:text-[#e00101]"
          }`}
        >
          {heading}
        </span>
      </div>
    </div>
  );

  return (
    <motion.div
      onClick={handleClick}
      className="group relative flex items-center justify-between border-b border-white/10 py-5 transition-colors duration-500 md:py-8 uppercase"
    >
      {isHash ? (
        <a ref={ref} onMouseMove={handleMouseMove} href={href} className="w-full">
          {content}
        </a>
      ) : (
        <Link ref={ref} onMouseMove={handleMouseMove} to={href} className="w-full">
          {content}
        </Link>
      )}
    </motion.div>
  );
};

const Curve = () => {
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg
      className="absolute top-0 -left-[99px] w-[100px] stroke-none h-[100dvh]"
      style={{ fill: "#0A0A0A" }}
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
};

const CurvedNavbar = ({ setIsActive, navItems, footer }) => {
  return (
    <motion.div
      variants={MENU_SLIDE_ANIMATION}
      initial="initial"
      animate="enter"
      exit="exit"
      className="h-[100dvh] w-full max-w-sm fixed right-0 top-0 z-[105] bg-[#0A0A0A] shadow-2xl"
    >
      <div className="h-full pb-10 flex flex-col justify-between">
        <div className="flex flex-col flex-grow justify-center text-5xl gap-3 px-10 md:px-14">
          <section className="bg-transparent mt-0">
            <div className="mx-auto w-full">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.href}
                  {...item}
                  setIsActive={setIsActive}
                  index={index + 1}
                />
              ))}
            </div>
          </section>
        </div>
        {footer}
      </div>
      <Curve />
    </motion.div>
  );
};

export default function CurvedMenu({ navItems = defaultNavItems, footer = <CustomFooter /> }) {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const isDarkPage = location.pathname !== "/";

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isActive]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const iconColor = isActive
    ? "text-white"
    : (isDarkPage ? "text-[#e00101]" : "text-black");

  return (
    <>
      <div className="relative">
        <div
          onClick={handleClick}
          className="fixed right-4 top-5 md:right-8 md:top-8 z-[110] p-2 flex items-center justify-center cursor-pointer transition-colors"
        >
          <svg
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 32 32"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-6 h-6 transition-transform duration-500 ease-out ${iconColor} ${isActive ? '-rotate-45' : ''}`}
          >
            <path
              className={`transition-all duration-500 ease-out ${isActive ? '[stroke-dasharray:20_300] [stroke-dashoffset:-32.42px]' : '[stroke-dasharray:12_63]'}`}
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            />
            <path d="M7 16 27 16" />
          </svg>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <>
            {/* Backdrop — clicking outside closes the menu */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsActive(false)}
              className="fixed inset-0 z-[104] bg-black/40"
            />
            <CurvedNavbar
              setIsActive={setIsActive}
              navItems={navItems}
              footer={footer}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
