import { Link, useLocation } from "react-router-dom";
import CurvedMenu from "./ui/CurvedMenu";
import SpecularButton from "./SpecularButton";
import Magnet from "./Magnet";
import "./navbar.css";

const navItems = [
  { heading: "Home", href: "/" },
  { heading: "About", href: "/journey" },
  { heading: "Services", href: "/services" },
  { heading: "Projects", href: "/projects" },
  { heading: "Contact", href: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const isWhiteBgPage = location.pathname === "/services";

  return (
    <>
      {/* 📱 Mobile Screen Only: Animated Hamburger Menu Overlay (Right side) */}
      <div className="mobile-overlay-wrapper">
        <CurvedMenu navItems={navItems} />
      </div>

      <header className={`header-container ${isWhiteBgPage ? "navbar-dark-theme" : ""}`}>
        <nav className="navbar">
          {/* Left: Logo / Name */}
          <div className="nav-left">
            <Magnet padding={50} disabled={false} magnetStrength={3}>
              <Link to="/" className="logo">
                Biztxcle
              </Link>
            </Magnet>
          </div>

          {/* Center: Navigation links in the middle */}
          <div className="nav-center desktop-only">
            <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
              Home
            </Link>
            <Link to="/journey" className={location.pathname === "/journey" ? "active-link" : ""}>
              About
            </Link>
            <Link to="/services" className={location.pathname === "/services" ? "active-link" : ""}>
              Services
            </Link>
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
              textColor={isWhiteBgPage ? "#e00101" : "#f5f5f5"}
              lineColor={isWhiteBgPage ? "#e00101" : "#ffffff"}
            >
              Contact
            </SpecularButton>
          </div>
        </nav>
      </header>
    </>
  );
}