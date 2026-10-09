import { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import "./ContactButtonOGL.css";

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    
    // Fluid wave dynamics
    float t = uTime * 1.1;
    vec2 p = uv * 2.0 - 1.0;
    
    // Subtle sine displacement
    p.x += sin(p.y * 3.8 + t) * 0.16;
    p.y += cos(p.x * 3.2 + t * 0.85) * 0.16;
    
    // Mouse proximity wave
    float dist = length(uv - uMouse);
    float mouseWave = sin(dist * 14.0 - t * 3.5) * exp(-dist * 3.5) * uHover;
    
    // Liquid Crimson Ribbon Flow
    float wave1 = sin(p.x * 3.8 + t * 1.1 + mouseWave) * 0.5 + 0.5;
    float wave2 = cos(p.y * 4.2 - t * 0.8) * 0.5 + 0.5;
    float ribbon = smoothstep(0.2, 0.85, wave1 * wave2);
    
    // Black Luxury (#0A0A0A) + Deep Crimson (#e00101) & Bright Red (#e00101)
    vec3 colObsidian = vec3(0.06, 0.06, 0.07);
    vec3 colCrimson = vec3(0.72, 0.0, 0.0);
    vec3 colBright = vec3(0.96, 0.08, 0.08);
    
    vec3 color = mix(colObsidian, colCrimson, ribbon * 0.85 + uHover * 0.35);
    color = mix(color, colBright, pow(ribbon, 2.5) * (0.6 + uHover * 0.6));
    
    // Perimeter Glow Rim
    float border = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    float rim = smoothstep(0.08, 0.01, border);
    color += colBright * rim * (0.35 + uHover * 0.4);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

export default function ContactButtonOGL({ href = "/#contact", label = "Contact" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTargetRef = useRef(0);
  const hoverCurrentRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let renderer;
    let gl;
    try {
      renderer = new Renderer({
        canvas,
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
      gl = renderer.gl;
    } catch (e) {
      console.warn("OGL initialization skipped:", e);
      return;
    }

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uHover: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth || 110;
      const height = container.clientHeight || 40;
      renderer.setSize(width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    let animationFrameId = null;
    let startTime = performance.now();
    let isIntersecting = true;
    let io = null;

    if (typeof IntersectionObserver !== "undefined" && container) {
      io = new IntersectionObserver(
        ([entry]) => {
          const wasIntersecting = isIntersecting;
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && !wasIntersecting && !animationFrameId) {
            startTime = performance.now();
            animationFrameId = requestAnimationFrame(render);
          }
        },
        { threshold: 0.05 }
      );
      io.observe(container);
    }

    const onContextLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    };
    canvas.addEventListener("webglcontextlost", onContextLost, false);

    const render = (time) => {
      if (!isIntersecting) {
        animationFrameId = null;
        return;
      }
      const elapsed = (time - startTime) * 0.001;
      program.uniforms.uTime.value = elapsed;

      hoverCurrentRef.current += (hoverTargetRef.current - hoverCurrentRef.current) * 0.08;
      program.uniforms.uHover.value = hoverCurrentRef.current;
      program.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];

      renderer.render({ scene: mesh });
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (io) io.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      if (gl) {
        const loseContext = gl.getExtension("WEBGL_lose_context");
        if (loseContext) loseContext.loseContext();
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    mouseRef.current = { x, y };
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    hoverTargetRef.current = 1;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    hoverTargetRef.current = 0;
  };

  return (
    <a
      href={href}
      ref={containerRef}
      className={`ogl-contact-button ${isHovered ? "is-hovered" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Contact Section"
    >
      <canvas ref={canvasRef} className="ogl-canvas" />
      <span className="ogl-button-content">
        <span className="ogl-button-text">{label}</span>
        <svg 
          className="ogl-button-arrow" 
          width="13" 
          height="13" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </span>
      <div className="ogl-button-border" />
    </a>
  );
}
