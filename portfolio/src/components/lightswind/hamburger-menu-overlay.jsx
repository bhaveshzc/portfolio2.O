import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function HamburgerMenuOverlay({
  items = [],
  buttonTop = "28px",
  buttonLeft = null,
  buttonRight = "24px",
  buttonSize = "md",
  buttonColor = "rgba(154, 0, 2, 0.7)",
  overlayBackground = "linear-gradient(160deg, rgba(35, 5, 8, 0.98) 0%, rgba(18, 2, 4, 0.99) 100%)",
  textColor = "#EFE6DD",
  fontSize = "sm",
  fontFamily = "inherit",
  fontWeight = "semibold",
  animationDuration = 0.7,
  staggerDelay = 0.05,
  menuAlignment = "center",
  className = "",
  buttonClassName = "",
  menuItemClassName = "",
  keepOpenOnItemClick = false,
  customButton = null,
  ariaLabel = "Navigation menu",
  onOpen,
  onClose,
  enableBlur = true,
  zIndex = 1000,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const containerRef = useRef(null);

  const buttonSizes = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-14 h-14",
  };

  const fontSizes = {
    sm: "text-xl sm:text-2xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-4xl",
    xl: "text-4xl sm:text-5xl",
    "2xl": "text-5xl sm:text-6xl",
  };

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (newState) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }

    if (item.href && !item.onClick) {
      if (item.href.startsWith("#")) {
        const targetElement = document.querySelector(item.href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.assign(item.href);
      }
    }

    if (!keepOpenOnItemClick) {
      setIsOpen(false);
      onClose?.();
    }
  };

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const originX = buttonRight ? `calc(100% - ${buttonRight})` : (buttonLeft || "28px");
  const positionStyle = buttonRight
    ? `right: ${buttonRight}; left: auto; transform: translate(50%, -50%);`
    : `left: ${buttonLeft || "28px"}; right: auto; transform: translate(-50%, -50%);`;

  return (
    <div ref={containerRef} className={cn("mobile-lightswind-container", className)}>
      <style>
        {`
          .hamburger-overlay-${zIndex} {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            height: 100dvh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: ${overlayBackground};
            z-index: ${zIndex};
            clip-path: circle(0px at ${originX} ${buttonTop});
            transition: clip-path ${animationDuration}s cubic-bezier(0.16, 1, 0.3, 1);
            ${enableBlur ? "backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);" : ""}
            pointer-events: none;
            box-sizing: border-box;
            padding: 20px;
          }
          
          .hamburger-overlay-${zIndex}.open {
            clip-path: circle(160% at ${originX} ${buttonTop});
            pointer-events: auto;
          }
          
          .hamburger-button-${zIndex} {
            position: ${isOpen ? "fixed" : "absolute"};
            ${positionStyle}
            top: ${buttonTop};
            border-radius: 12px;
            z-index: ${zIndex + 1};
            background: ${buttonColor};
            border: 1px solid rgba(239, 230, 221, 0.2);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            cursor: pointer;
            transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-tap-highlight-color: transparent;
          }
          
          .hamburger-button-${zIndex}:hover,
          .hamburger-button-${zIndex}:active {
            ${buttonRight ? "transform: translate(50%, -50%) scale(1.06);" : "transform: translate(-50%, -50%) scale(1.06);"}
            background: rgba(154, 0, 2, 0.9);
            border-color: rgba(239, 230, 221, 0.4);
          }
          
          .menu-items-${zIndex} {
            width: 100%;
            max-width: 380px;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
            ${menuAlignment === "center" ? "text-align: center; align-items: center;" : ""}
            ${menuAlignment === "right" ? "text-align: right; align-items: flex-end;" : ""}
          }
          
          .menu-item-${zIndex} {
            position: relative;
            list-style: none;
            padding: 0.6rem 1rem;
            border-radius: 10px;
            cursor: pointer;
            transform: translateX(-40px);
            opacity: 0;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, background 0.2s ease;
            font-family: ${fontFamily};
            font-weight: ${fontWeight};
            color: ${textColor};
            -webkit-tap-highlight-color: transparent;
          }
          
          .menu-item-${zIndex}.visible {
            transform: translateX(0);
            opacity: 1;
          }
          
          .menu-item-${zIndex}::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 0%;
            border-radius: 4px;
            background: #EFE6DD;
            transition: height 0.25s ease;
            pointer-events: none;
          }
          
          .menu-item-${zIndex}:hover::before,
          .menu-item-${zIndex}:active::before {
            height: 70%;
          }
          
          .menu-item-${zIndex} span {
            opacity: 0.85;
            transition: opacity 0.2s ease, transform 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            letter-spacing: 0.5px;
          }
          
          .menu-item-${zIndex}:hover,
          .menu-item-${zIndex}:active {
            background: rgba(154, 0, 2, 0.3);
          }
          
          .menu-item-${zIndex}:hover span,
          .menu-item-${zIndex}:active span {
            opacity: 1;
            transform: translateX(6px);
            color: #FFFFFF;
          }
        `}
      </style>

      {/* Fullscreen Circular Clip-Path Overlay */}
      <div
        ref={navRef}
        className={cn(
          `hamburger-overlay-${zIndex}`,
          isOpen && "open"
        )}
        aria-hidden={!isOpen}
      >
        <ul className={`menu-items-${zIndex}`}>
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(
                `menu-item-${zIndex}`,
                fontSizes[fontSize] || fontSizes.sm,
                isOpen && "visible",
                menuItemClassName
              )}
              style={{
                transitionDelay: isOpen ? `${index * staggerDelay}s` : "0s",
              }}
              onClick={() => handleItemClick(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleItemClick(item);
                }
              }}
              tabIndex={isOpen ? 0 : -1}
              role="button"
              aria-label={`Navigate to ${item.label}`}
            >
              <span>
                {item.icon && <span className="menu-icon">{item.icon}</span>}
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hamburger Toggle Button */}
      <button
        type="button"
        className={cn(
          `hamburger-button-${zIndex}`,
          buttonSizes[buttonSize] || buttonSizes.md,
          buttonClassName
        )}
        onClick={toggleMenu}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-controls="navigation-menu"
      >
        {customButton || (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <Menu
              className={cn(
                "absolute transition-all duration-300",
                isOpen
                  ? "opacity-0 rotate-45 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              )}
              size={buttonSize === "sm" ? 18 : buttonSize === "md" ? 22 : 26}
              color={textColor}
            />
            <X
              className={cn(
                "absolute transition-all duration-300",
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-45 scale-0"
              )}
              size={buttonSize === "sm" ? 18 : buttonSize === "md" ? 22 : 26}
              color={textColor}
            />
          </div>
        )}
      </button>
    </div>
  );
}

export default HamburgerMenuOverlay;
