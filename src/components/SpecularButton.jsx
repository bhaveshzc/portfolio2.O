import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';
import './SpecularButton.css';

const PAD = 20;

// Universal WebGL1 & WebGL2 Compatible Shaders
const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float shapeSDF(vec2 p) { 
  return sdRoundedRect(p, uHalfSize, uRadius); 
}

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = shapeSDF(p);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  // Dark base stroke hugging the edge for a sense of thickness
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  // Symmetric specular: the edges facing toward/away from the light both catch a streak
  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  gl_FragColor = vec4(col, a);
}
`;

export default function SpecularButton({
  children = 'Contact',
  size = 'sm',
  radius = 18,
  tint = '#ffffff',
  tintOpacity = 0,
  blur = 0,
  textColor = '#f5f5f5',
  lineColor = '#ffffff',
  baseColor = '#525252',
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = true,
  disabled = false,
  onClick,
  href = '/#contact',
  className = '',
  type = 'button',
}) {
  const btnRef = useRef(null);
  const fxRef = useRef(null);
  const propsRef = useRef({
    radius,
    lineColor,
    baseColor,
    intensity,
    shineSize,
    shineFade,
    thickness,
    speed,
    followMouse,
    proximity,
    autoAnimate,
  });

  useEffect(() => {
    propsRef.current = {
      radius,
      lineColor,
      baseColor,
      intensity,
      shineSize,
      shineFade,
      thickness,
      speed,
      followMouse,
      proximity,
      autoAnimate,
    };
  });

  useEffect(() => {
    const btn = btnRef.current;
    const fx = fxRef.current;
    if (!btn || !fx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let renderer;
    let gl;
    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr });
      gl = renderer.gl;
    } catch (e) {
      console.warn('SpecularButton WebGL error:', e);
      return;
    }

    if (!gl) return;

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const geometry = new Triangle(gl);
    if (geometry.attributes && geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    let program;
    try {
      program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uCenter: { value: [0, 0] },
          uHalfSize: { value: [1, 1] },
          uRadius: { value: 0 },
          uAngle: { value: 2.4 },
          uPx: { value: dpr },
          uLineColor: { value: [1, 1, 1] },
          uBaseColor: { value: [0.32, 0.32, 0.32] },
          uIntensity: { value: 1 },
          uShineSize: { value: 0.17 },
          uShineFade: { value: 0.7 },
          uThickness: { value: 1 },
          uBaseWidth: { value: dpr },
        },
      });
    } catch (e) {
      console.warn('SpecularButton Program compilation error:', e);
      return;
    }

    const mesh = new Mesh(gl, { geometry, program });
    if (gl.canvas) {
      fx.appendChild(gl.canvas);
    }

    const sizeRef = { w: 1, h: 1 };
    const resize = () => {
      if (!btn || !renderer || !program) return;
      const rect = btn.getBoundingClientRect();
      const w = Math.max(rect.width, 1);
      const h = Math.max(rect.height, 1);
      sizeRef.w = w;
      sizeRef.h = h;
      renderer.setSize(w + PAD * 2, h + PAD * 2);
      program.uniforms.uCenter.value = [(PAD + w / 2) * dpr, (PAD + h / 2) * dpr];
      program.uniforms.uHalfSize.value = [(w / 2) * dpr, (h / 2) * dpr];
    };

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(resize);
      ro.observe(btn);
    }
    resize();

    let pointerAngle = null;
    let proximityT = 0;
    const onPointerMove = (e) => {
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const dist = Math.hypot(dx, dy);
      if (dist === 0) {
        const nx = (e.clientX - cx) / (rect.width / 2 || 1);
        const ny = (cy - e.clientY) / (rect.height / 2 || 1);
        pointerAngle = Math.atan2(2 / (rect.height || 1), -2 / (rect.width || 1)) + nx * 0.3 + ny * 0.15;
      } else {
        pointerAngle = Math.atan2(cy - e.clientY, e.clientX - cx);
      }
      const t = Math.max(0, 1 - dist / Math.max(propsRef.current.proximity || 250, 1));
      proximityT = t * t * (3 - 2 * t);
    };
    window.addEventListener('pointermove', onPointerMove);

    let angle = 2.4;
    let idleAngle = 2.4;
    let bright = 0;
    let last = performance.now();
    let raf = 0;

    const lineC = new Color();
    const baseC = new Color();

    let isIntersecting = true;
    let io;
    if (typeof IntersectionObserver !== 'undefined' && btn) {
      io = new IntersectionObserver(
        ([entry]) => {
          const wasIntersecting = isIntersecting;
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && !wasIntersecting && !raf) {
            last = performance.now();
            raf = requestAnimationFrame(update);
          }
        },
        { threshold: 0.05 }
      );
      io.observe(btn);
    }

    const onContextLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      raf = 0;
    };
    gl?.canvas?.addEventListener('webglcontextlost', onContextLost, false);

    const update = (now) => {
      if (!isIntersecting) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(update);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const p = propsRef.current;

      if (p.autoAnimate && proximityT === 0) {
        idleAngle += (p.speed || 0.35) * dt;
      }
      
      const isHoveredOrNear = proximityT > 0 && pointerAngle != null;
      const target = isHoveredOrNear ? pointerAngle : idleAngle;
      const diff = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += diff * (1 - Math.exp(-dt * 6));

      const brightTarget = isHoveredOrNear ? 1 : (p.autoAnimate ? 0.7 : 0);
      bright += (brightTarget - bright) * (1 - Math.exp(-dt * 6));

      lineC.set(p.lineColor || '#ffffff');
      baseC.set(p.baseColor || '#525252');
      program.uniforms.uAngle.value = angle;
      program.uniforms.uRadius.value = Math.min(p.radius || 18, Math.min(sizeRef.w, sizeRef.h) / 2) * dpr;
      program.uniforms.uLineColor.value = [lineC.r, lineC.g, lineC.b];
      program.uniforms.uBaseColor.value = [baseC.r, baseC.g, baseC.b];
      program.uniforms.uIntensity.value = (p.intensity || 1) * bright;
      program.uniforms.uShineSize.value = ((p.shineSize || 10) * Math.PI) / 180;
      program.uniforms.uShineFade.value = ((p.shineFade || 40) * Math.PI) / 180;
      program.uniforms.uThickness.value = (p.thickness || 1) * dpr;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      gl?.canvas?.removeEventListener('webglcontextlost', onContextLost);
      if (gl && gl.canvas && gl.canvas.parentNode === fx) {
        fx.removeChild(gl.canvas);
      }
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (href && href.startsWith('/#')) {
      const targetId = href.substring(2);
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isAnchor = Boolean(href);
  const Component = isAnchor ? 'a' : 'button';

  return (
    <Component
      ref={btnRef}
      href={isAnchor ? href : undefined}
      type={isAnchor ? undefined : type}
      disabled={isAnchor ? undefined : disabled}
      aria-disabled={disabled ? 'true' : undefined}
      onClick={handleClick}
      className={`specular-button specular-button--${size}${className ? ` ${className}` : ''}`}
      style={{
        '--sb-radius': `${radius}px`,
        '--sb-tint': tint,
        '--sb-tint-opacity': tintOpacity,
        '--sb-blur': `${blur}px`,
        '--sb-text-color': textColor,
      }}
    >
      <span ref={fxRef} className="specular-button__fx" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </Component>
  );
}
