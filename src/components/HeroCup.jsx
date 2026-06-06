import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function HeroCup() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 2, 5.5);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(500, 500);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearAlpha(0);
    container.appendChild(renderer.domElement);

    // GROUP TO HOLD THE CUP
    const cupGroup = new THREE.Group();
    scene.add(cupGroup);

    // 1. COFFEE CUP (LatheGeometry)
    const points = [];
    // Base flare
    points.push(new THREE.Vector2(0, -0.6));
    points.push(new THREE.Vector2(0.5, -0.6));
    points.push(new THREE.Vector2(0.48, -0.5));
    // Base to body curve
    points.push(new THREE.Vector2(0.42, -0.3));
    points.push(new THREE.Vector2(0.46, 0.0));
    points.push(new THREE.Vector2(0.6, 0.5));
    points.push(new THREE.Vector2(0.72, 0.9)); // wide opening at top
    points.push(new THREE.Vector2(0.72, 0.87)); // rim thickness
    points.push(new THREE.Vector2(0.66, 0.5)); // inner wall
    points.push(new THREE.Vector2(0.4, -0.2));
    points.push(new THREE.Vector2(0, -0.4)); // seal bottom inner

    const cupGeometry = new THREE.LatheGeometry(points, 32);
    const cupMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a0e05,
      metalness: 0.3,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });
    const cupMesh = new THREE.Mesh(cupGeometry, cupMaterial);
    cupGroup.add(cupMesh);

    // Thin gold rim torus at top
    const rimGeometry = new THREE.TorusGeometry(0.72, 0.018, 12, 64);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xC9A84C,
      metalness: 0.8,
      roughness: 0.2,
    });
    const rimMesh = new THREE.Mesh(rimGeometry, goldMaterial);
    rimMesh.position.y = 0.9;
    rimMesh.rotation.x = Math.PI / 2;
    cupGroup.add(rimMesh);

    // 2. COFFEE SURFACE
    const coffeeSurfaceGeo = new THREE.CircleGeometry(0.7, 32);
    const coffeeSurfaceMat = new THREE.MeshStandardMaterial({
      color: 0x3d2008,
      roughness: 0.4,
      metalness: 0.1,
    });
    const coffeeSurface = new THREE.Mesh(coffeeSurfaceGeo, coffeeSurfaceMat);
    coffeeSurface.position.y = 0.86;
    coffeeSurface.rotation.x = -Math.PI / 2;
    cupGroup.add(coffeeSurface);

    // 3. STEAM PARTICLES
    const steamCount = 200;
    const steamGeometry = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.3; // x
      steamPositions[i * 3 + 1] = Math.random() * 2;         // y
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3; // z
    }
    steamGeometry.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
    const steamMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.3,
    });
    const steamPoints = new THREE.Points(steamGeometry, steamMaterial);
    steamPoints.position.y = 0.9; // start just above rim
    scene.add(steamPoints);

    // 4. FLOATING BEANS
    const beansGroup = new THREE.Group();
    scene.add(beansGroup);

    const beanGeometry = new THREE.SphereGeometry(0.08, 8, 6);
    beanGeometry.scale(1.4, 0.8, 0.6); // shape like a coffee bean
    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a1608,
      roughness: 0.5,
      metalness: 0.1,
    });

    const beans = [];
    const beanOrbits = [
      { r: 1.3, speed: 0.3, phase: 0, yOffset: 0.5 },
      { r: 1.5, speed: -0.2, phase: 1.2, yOffset: 0.8 },
      { r: 1.2, speed: 0.4, phase: 2.5, yOffset: 0.2 },
      { r: 1.6, speed: -0.25, phase: 3.8, yOffset: 0.6 },
      { r: 1.4, speed: 0.35, phase: 4.7, yOffset: 0.4 },
      { r: 1.35, speed: -0.3, phase: 5.5, yOffset: 0.9 },
    ];

    for (let i = 0; i < 6; i++) {
      const bean = new THREE.Mesh(beanGeometry, beanMaterial);
      beansGroup.add(bean);
      beans.push({
        mesh: bean,
        orbit: beanOrbits[i],
        rotSpeedX: Math.random() * 0.02,
        rotSpeedY: Math.random() * 0.02,
      });
    }

    // 5. GOLD SPARKLE PARTICLES
    const goldCount = 1500;
    const goldGeometry = new THREE.BufferGeometry();
    const goldPositions = new Float32Array(goldCount * 3);
    for (let i = 0; i < goldCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 4; // sphere radius 4
      goldPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      goldPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      goldPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    goldGeometry.setAttribute('position', new THREE.BufferAttribute(goldPositions, 3));
    const goldParticlesMaterial = new THREE.PointsMaterial({
      color: 0xC9A84C,
      size: 0.015,
      transparent: true,
      opacity: 0.6,
    });
    const goldPoints = new THREE.Points(goldGeometry, goldParticlesMaterial);
    scene.add(goldPoints);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xC9A84C, 2, 20);
    pointLight1.position.set(2, 3, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 20);
    pointLight2.position.set(-2, 1, 3);
    scene.add(pointLight2);

    // TIME & SCROLL TRACKING
    let time = 0;
    let scrollRotationY = 0;
    let idleRotationY = 0;

    const handleScroll = () => {
      scrollRotationY = window.scrollY * 0.003;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ANIMATE LOOP
    let animationFrameId;
    const animate = () => {
      time += 0.01;
      idleRotationY += 0.003;

      // Rotate Cup Group combining idle + scroll
      cupGroup.rotation.y = idleRotationY + scrollRotationY;

      // 1. Animated Coffee Surface displacement
      const posAttr = coffeeSurface.geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vy = posAttr.getY(i);
        const dist = Math.sqrt(vx * vx + vy * vy);
        const z = Math.sin(dist * 7 - time * 3.5) * 0.015;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;

      // 2. Animate Steam Particles upward
      const steamPos = steamPoints.geometry.attributes.position.array;
      for (let i = 0; i < steamCount; i++) {
        steamPos[i * 3 + 1] += 0.006; // move y up
        steamPos[i * 3] += Math.sin(time * 0.5 + i) * 0.0008; // slight x drift
        if (steamPos[i * 3 + 1] > 2.0) {
          steamPos[i * 3 + 1] = 0;
          steamPos[i * 3] = (Math.random() - 0.5) * 0.3;
          steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        }
      }
      steamPoints.geometry.attributes.position.needsUpdate = true;

      // 3. Orbit beans
      beans.forEach((b) => {
        const orbitAngle = time * b.orbit.speed + b.orbit.phase;
        b.mesh.position.x = Math.cos(orbitAngle) * b.orbit.r;
        b.mesh.position.z = Math.sin(orbitAngle) * b.orbit.r;
        b.mesh.position.y = b.orbit.yOffset + Math.sin(time + b.orbit.phase) * 0.1;
        b.mesh.rotation.x += b.rotSpeedX;
        b.mesh.rotation.y += b.rotSpeedY;
      });

      // 4. Slowly rotate the entire gold particles field
      goldPoints.rotation.y = time * 0.015;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      cupGeometry.dispose();
      cupMaterial.dispose();
      rimGeometry.dispose();
      goldMaterial.dispose();
      coffeeSurfaceGeo.dispose();
      coffeeSurfaceMat.dispose();
      steamGeometry.dispose();
      steamMaterial.dispose();
      beanGeometry.dispose();
      beanMaterial.dispose();
      goldGeometry.dispose();
      goldParticlesMaterial.dispose();
      renderer.dispose();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="flex items-center justify-center w-[500px] h-[500px] mx-auto overflow-hidden relative">
      <div ref={containerRef} className="w-[500px] h-[500px]" />
    </div>
  );
}
