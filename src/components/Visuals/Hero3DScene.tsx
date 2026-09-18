import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RefreshCw, Sparkles } from 'lucide-react';

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [shapeIndex, setShapeIndex] = useState<number>(0);
  const shapes = ['Icosahedron', 'Torus Knot', 'Octahedron'];

  // Ref to pass current shape to Three.js render loop without re-instantiating scene
  const shapeChangeRef = useRef<(index: number) => void>(() => {});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6.2;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4f6ef7, 3.5, 20); // Electric Indigo
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 3.5, 20); // Cyber Cyan
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x8b5cf6, 2.5, 20); // Soft Violet
    pointLight3.position.set(0, 4, -4);
    scene.add(pointLight3);

    // --- Main 3D Group ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Geometries pool
    const geomList = [
      new THREE.IcosahedronGeometry(1.65, 1),
      new THREE.TorusKnotGeometry(1.15, 0.38, 100, 24, 2, 3),
      new THREE.OctahedronGeometry(1.7, 2),
    ];

    // Wireframe Mesh Material
    const wireframeMaterial = new THREE.MeshStandardMaterial({
      color: 0x4f6ef7,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x1d2d7d,
      emissiveIntensity: 0.35,
    });

    let activeMesh = new THREE.Mesh(geomList[0], wireframeMaterial);
    mainGroup.add(activeMesh);

    // Vertex points on mesh
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
    });
    let activePoints = new THREE.Points(geomList[0], pointsMaterial);
    mainGroup.add(activePoints);

    // 2. Inner Glowing Core
    const coreGeometry = new THREE.SphereGeometry(0.72, 32, 32);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      emissive: 0x4f6ef7,
      emissiveIntensity: 0.7,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      opacity: 0.9,
      transparent: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 3. Orbiting Rings
    const createOrbitRing = (radius: number, particleCount: number, color: number) => {
      const ringGeom = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const theta = (i / particleCount) * Math.PI * 2;
        positions[i * 3] = Math.cos(theta) * radius;
        positions[i * 3 + 1] = Math.sin(theta) * radius;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      }
      ringGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const ringMat = new THREE.PointsMaterial({
        color,
        size: 0.05,
        transparent: true,
        opacity: 0.75,
      });
      return new THREE.Points(ringGeom, ringMat);
    };

    const ring1 = createOrbitRing(2.4, 70, 0x06b6d4);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2 = createOrbitRing(2.7, 90, 0x8b5cf6);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    mainGroup.add(ring2);

    // 4. Floating Dust / Stars Background
    const dustCount = 140;
    const dustGeom = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 12;
      dustPositions[i + 1] = (Math.random() - 0.5) * 10;
      dustPositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
    });
    const dustPoints = new THREE.Points(dustGeom, dustMat);
    scene.add(dustPoints);

    // Function to change shapes smoothly
    shapeChangeRef.current = (idx: number) => {
      mainGroup.remove(activeMesh);
      mainGroup.remove(activePoints);

      activeMesh = new THREE.Mesh(geomList[idx], wireframeMaterial);
      activePoints = new THREE.Points(geomList[idx], pointsMaterial);

      mainGroup.add(activeMesh);
      mainGroup.add(activePoints);

      // Pulse on change
      pulseScale = 1.35;
    };

    // --- Interaction States ---
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    let pulseScale = 1.0;

    // Pointer event handlers
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        rotationVelocityY += deltaX * 0.005;
        rotationVelocityX += deltaY * 0.005;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      }

      // Parallax tracking relative to canvas center
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetParallaxX = nx * 0.45;
      targetParallaxY = ny * 0.45;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = () => {
      pulseScale = 1.28;
    };

    const dom = renderer.domElement;
    dom.style.touchAction = 'none';
    dom.style.cursor = 'grab';

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('click', onClick);

    // --- Resize Handling ---
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Floating oscillation
      mainGroup.position.y = Math.sin(elapsed * 1.6) * 0.12;

      // Base auto rotation + user drag velocity
      mainGroup.rotation.y += 0.008 + rotationVelocityY;
      mainGroup.rotation.x += 0.004 + rotationVelocityX;

      // Friction / Damping
      rotationVelocityX *= 0.92;
      rotationVelocityY *= 0.92;

      // Parallax smooth interpolation
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.06;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.06;
      camera.position.x = currentParallaxX;
      camera.position.y = currentParallaxY;
      camera.lookAt(0, 0, 0);

      // Rings orbit
      ring1.rotation.z += 0.015;
      ring2.rotation.z -= 0.012;

      // Inner core pulse
      const corePulse = 1.0 + Math.sin(elapsed * 3.2) * 0.08;
      coreMesh.scale.set(corePulse, corePulse, corePulse);

      // Main pulse spring relaxation
      pulseScale += (1.0 - pulseScale) * 0.1;
      mainGroup.scale.set(pulseScale, pulseScale, pulseScale);

      // Starfield subtle slow rotation
      dustPoints.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('click', onClick);
      resizeObserver.disconnect();

      if (container.contains(dom)) {
        container.removeChild(dom);
      }

      geomList.forEach((g) => g.dispose());
      coreGeometry.dispose();
      wireframeMaterial.dispose();
      pointsMaterial.dispose();
      coreMaterial.dispose();
      dustGeom.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleNextShape = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (shapeIndex + 1) % shapes.length;
    setShapeIndex(nextIdx);
    shapeChangeRef.current(nextIdx);
  };

  return (
    <div className="hero-3d-wrapper">
      <div ref={mountRef} className="hero-3d-canvas-container" />

      {/* Floating Interactive Badge & Switcher */}
      <div className="hero-3d-controls">
        <div className="hero-3d-badge">
          <Sparkles size={13} className="sparkle-icon" />
          <span>Interactive 3D · Drag to Orbit</span>
        </div>
        <button
          onClick={handleNextShape}
          className="hero-shape-btn"
          title={`Switch Shape (Current: ${shapes[shapeIndex]})`}
          aria-label="Switch 3D Geometry"
        >
          <RefreshCw size={12} className="spin-on-hover" />
          <span>{shapes[shapeIndex]}</span>
        </button>
      </div>
    </div>
  );
};

export default Hero3DScene;
