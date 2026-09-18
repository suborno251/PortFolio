import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_color4;
  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float f = 0.0;
    f += 0.5000 * snoise(p); p = p * 2.02;
    f += 0.2500 * snoise(p); p = p * 2.03;
    f += 0.1250 * snoise(p); p = p * 2.01;
    return f;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Mouse influence with soft distance field
    vec2 mouse = u_mouse * vec2(u_resolution.x / u_resolution.y, 1.0);
    float dist = length(st - mouse);
    float mouseWave = smoothstep(0.9, 0.0, dist) * 0.35;

    vec2 p = st * 1.35;
    float t = u_time * 0.16;

    // Multi-octave domain warping for liquid flowing gradient
    vec2 q = vec2(
      fbm(p + vec2(0.0, 0.0) + t * 0.4),
      fbm(p + vec2(5.2, 1.3) + t * 0.35)
    );

    vec2 r = vec2(
      fbm(p + 2.8 * q + vec2(1.7, 9.2) + 0.12 * t + mouseWave),
      fbm(p + 2.8 * q + vec2(8.3, 2.8) + 0.15 * t)
    );

    float f = fbm(p + 3.2 * r);

    // Color mixing: Electric Indigo, Cyan, Violet, and Soft Lavender
    vec3 col = mix(u_color1, u_color2, clamp(f * f * 3.2, 0.0, 1.0));
    col = mix(col, u_color3, clamp(length(q) * 0.75, 0.0, 1.0));
    col = mix(col, u_color4, clamp(length(r.x) * 0.55, 0.0, 1.0));

    // Subtle fine grain to prevent WebGL color banding
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.02;

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface ShaderGradientCanvasProps {
  className?: string;
  speed?: number;
  opacity?: number;
}

export const ShaderGradientCanvas: React.FC<ShaderGradientCanvasProps> = ({
  className = '',
  speed = 1.0,
  opacity = 0.55,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera (Orthographic 2D quad)
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false,
      alpha: true,
      stencil: false,
      depth: false,
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);

    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    container.appendChild(renderer.domElement);

    // Electric Indigo & Cyan Theme Colors
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(rect.width * dpr, rect.height * dpr) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_color1: { value: new THREE.Color('#4F6EF7') }, // Vibrant Electric Indigo
      u_color2: { value: new THREE.Color('#06B6D4') }, // Vivid Cyan
      u_color3: { value: new THREE.Color('#7C3AED') }, // Deep Cyber Violet
      u_color4: { value: new THREE.Color('#E0E7FF') }, // Soft Ice Lavender
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    // Smooth Mouse coordinates with lerp
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;

    const onPointerMove = (e: MouseEvent) => {
      const b = container.getBoundingClientRect();
      targetMouseX = (e.clientX - b.left) / b.width;
      targetMouseY = 1.0 - (e.clientY - b.top) / b.height;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Resize handling
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width <= 0 || height <= 0) continue;
        renderer.setSize(width, height, false);
        uniforms.u_resolution.value.set(width * dpr, height * dpr);
      }
    });
    resizeObserver.observe(container);

    // Render loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      uniforms.u_time.value += delta * speed;

      // Smooth mouse tracking
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      uniforms.u_mouse.value.set(currentMouseX, currentMouseY);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`shader-gradient-wrapper ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity,
      }}
    />
  );
};

export default ShaderGradientCanvas;
