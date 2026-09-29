import { Link, useLocation } from "react-router-dom";
import CurvedMenu from "./ui/CurvedMenu";
import SpecularButton from "./SpecularButton";
import "./navbar.css";

const navItems = [
  { heading: "Home", href: "/" },
  { heading: "About", href: "/journey" },
  { heading: "Services", href: "/#services" },
  { heading: "Projects", href: "/projects" },
  { heading: "Contact", href: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const isDarkPage = location.pathname !== "/";

  return (
    <>
      {/* 📱 Mobile Screen Only: Animated Hamburger Menu Overlay (Right side) */}
      <div className="mobile-overlay-wrapper">
        <CurvedMenu navItems={navItems} />
      </div>

      <header className={`header-container ${isDarkPage ? "navbar-dark-theme" : ""}`}>
        <nav className="navbar">
          {/* Left: Logo / Name */}
          <div className="nav-left">
            <Link to="/" className="logo">
              Bhavesh Bisht
            </Link>
          </div>

          {/* Center: Navigation links in the middle */}
          <div className="nav-center desktop-only">
            <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
              Home
            </Link>
            <Link to="/journey" className={location.pathname === "/journey" ? "active-link" : ""}>
              About
            </Link>
            <a href="/#services" className="nav-link-anchor">
              Services
            </a>
            <Link to="/projects" className={location.pathname === "/projects" ? "active-link" : ""}>
              Projects
            </Link>
          </div>

          {/* Right: Specular Button (React Bits Specular Button) */}
          <div className="nav-right desktop-only">
            <SpecularButton
              href="/contact"
              size="sm"
              radius={18}
              autoAnimate={false}
            >
              Contact
            </SpecularButton>
          </div>
        </nav>
      </header>
    </>
  );
}