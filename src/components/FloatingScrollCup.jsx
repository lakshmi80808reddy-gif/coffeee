import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FloatingScrollCup() {
  const containerRef = useRef(null);
  const cupWrapperRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);

  // References for individual drink renders inside the cup wrapper
  const latteRef = useRef(null);
  const espressoRef = useRef(null);
  const coldbrewRef = useRef(null);

  // References for floating beans
  const bean1Ref = useRef(null);
  const bean2Ref = useRef(null);
  const bean3Ref = useRef(null);
  const bean4Ref = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const cup = cupWrapperRef.current;
    if (!container || !cup) return;

    // Detect screen width to disable on mobile
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // 1. Initial State (Hero)
      gsap.set(cup, {
        left: '68vw',
        top: '45vh',
        xPercent: -50,
        yPercent: -50,
        scale: 1.15,
        rotationX: 12,
        rotationY: -15,
        rotationZ: 5,
        opacity: 1,
        force3D: true,
      });

      // Set initial state for layers
      gsap.set(latteRef.current, { opacity: 1 });
      gsap.set(espressoRef.current, { opacity: 0 });
      gsap.set(coldbrewRef.current, { opacity: 0 });

      // Set initial positions for floating beans (scattered around hero)
      gsap.set(bean1Ref.current, { x: 50, y: -80, scale: 0.8, rotation: 15, opacity: 0.6 });
      gsap.set(bean2Ref.current, { x: -120, y: 150, scale: 0.9, rotation: -45, opacity: 0.5 });
      gsap.set(bean3Ref.current, { x: 180, y: 120, scale: 0.7, rotation: 120, opacity: 0.4 });
      gsap.set(bean4Ref.current, { x: -80, y: -180, scale: 0.6, rotation: -70, opacity: 0.3 });

      // Create a master scroll-linked timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          endTrigger: '#brew-lab',
          end: 'top center',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // ── STEP 1: Scroll from Hero to Difference (0% to 20% of timeline) ──
      // Cup moves to center card of Difference Section
      tl.to(cup, {
        left: '50vw',
        top: '55vh',
        scale: 0.9,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        duration: 2,
        ease: 'power1.inOut',
      }, 0);

      // Parallax move beans
      tl.to(bean1Ref.current, { x: -120, y: -250, rotation: 180, opacity: 0.2, duration: 2 }, 0);
      tl.to(bean2Ref.current, { x: 150, y: -300, rotation: -180, opacity: 0.2, duration: 2 }, 0);

      // ── STEP 2: Difference split (20% to 40% of timeline) ──
      // Pinned difference split. Cup pops out in 3D scale and spins!
      tl.to(cup, {
        top: '48vh',
        scale: 1.35,
        rotationX: -12,
        rotationY: 180, // half turn
        rotationZ: -5,
        duration: 2,
        ease: 'power2.inOut',
      }, 2);

      // Bring beans closer in 3D depth
      tl.to(bean3Ref.current, { x: -50, y: -120, scale: 1.1, rotation: 240, opacity: 0.7, duration: 2 }, 2);
      tl.to(bean4Ref.current, { x: 90, y: 100, scale: 1.0, rotation: -150, opacity: 0.7, duration: 2 }, 2);

      // ── STEP 3: Move to Cinematic Slide 1 (40% to 55% of timeline) ──
      // Cup moves left into Slide 1 image block (Harvest/Soil backdrop)
      tl.to(cup, {
        left: '24vw',
        top: '50vh',
        scale: 1.05,
        rotationX: 10,
        rotationY: 360, // full spin
        rotationZ: 0,
        duration: 2,
        ease: 'power2.inOut',
      }, 4);

      // ── STEP 4: Cinematic Slide 1 to Slide 2 (55% to 70% of timeline) ──
      // Slide 2 represents Extraction. Morph cup to Espresso and move right.
      tl.to(cup, {
        left: '74vw',
        top: '50vh',
        scale: 1.0,
        rotationX: 15,
        rotationY: 540, // spin and land backwards
        rotationZ: -10,
        duration: 2,
        ease: 'power2.inOut',
      }, 6);

      // Morph images: Latte fades out, Espresso fades in
      tl.to(latteRef.current, { opacity: 0, duration: 0.8 }, 6);
      tl.to(espressoRef.current, { opacity: 1, duration: 0.8 }, 6.2);

      // Scattered beans drift
      tl.to(bean1Ref.current, { x: 220, y: 150, scale: 0.8, opacity: 0.5, duration: 2 }, 6);
      tl.to(bean2Ref.current, { x: -250, y: -80, scale: 0.9, opacity: 0.6, duration: 2 }, 6);

      // ── STEP 5: Cinematic Slide 2 to Slide 3 (70% to 85% of timeline) ──
      // Slide 3 represents Latte Served. Morph back to Latte cup and move left.
      tl.to(cup, {
        left: '24vw',
        top: '50vh',
        scale: 1.15,
        rotationX: -8,
        rotationY: 720, // spin
        rotationZ: 6,
        duration: 2,
        ease: 'power2.inOut',
      }, 8);

      // Morph images: Espresso fades out, Latte fades back in
      tl.to(espressoRef.current, { opacity: 0, duration: 0.8 }, 8);
      tl.to(latteRef.current, { opacity: 1, duration: 0.8 }, 8.2);

      // ── STEP 6: Fly into BrewLab container (85% to 100% of timeline) ──
      // As scroll approaches BrewLab, cup flies to right side (where BrewLab InteractiveCup sits)
      // and fades out so the local InteractiveCup can take over.
      tl.to(cup, {
        left: '68vw',
        top: '50vh',
        scale: 0.8,
        rotationX: 0,
        rotationY: 900,
        rotationZ: 0,
        opacity: 0,
        duration: 2.5,
        ease: 'power1.in',
      }, 10);

      // All beans scatter away
      tl.to([bean1Ref.current, bean2Ref.current, bean3Ref.current, bean4Ref.current], {
        opacity: 0,
        y: '+=200',
        scale: 0.3,
        duration: 2,
      }, 10.2);

      // Idle floating mouse tracking within viewport limits
      const handleMouseMove = (e) => {
        // Only tilt when scroll is near hero or difference
        if (window.scrollY < window.innerHeight * 2.5) {
          const cx = (e.clientX / window.innerWidth - 0.5) * 20;
          const cy = (e.clientY / window.innerHeight - 0.5) * 20;
          gsap.to(cup, {
            x: cx,
            y: cy,
            rotationY: `+= ${cx * 0.05}`,
            rotationX: `+= ${-cy * 0.05}`,
            duration: 0.8,
            ease: 'power2.out',
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-30 hidden md:block"
      style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
    >
      {/* ── MAIN 3D FLOATING CUP CONTAINER ── */}
      <div
        ref={cupWrapperRef}
        className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow behind the cup */}
        <div
          className="absolute inset-[15%] rounded-full opacity-35 filter blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.65) 0%, transparent 70%)',
          }}
        />

        {/* Outer Orbit Ring */}
        <div
          ref={ring1Ref}
          className="absolute inset-[-10px] rounded-full border border-[#C9A84C]/25 float-3d"
          style={{ transform: 'rotateX(75deg)' }}
        />
        <div
          ref={ring2Ref}
          className="absolute inset-[-25px] rounded-full border border-dashed border-[#C9A84C]/15 float-3d-reverse"
          style={{ transform: 'rotateX(75deg) rotateY(10deg)' }}
        />

        {/* ── COFFEE IMAGES (layered for opacity-based morph transitions) ── */}
        <div className="relative w-[82%] h-[82%] flex items-center justify-center float-3d-slow" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Latte Render */}
          <img
            ref={latteRef}
            src="/img/latte_render.png"
            alt="Obsidian Latte 3D"
            className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
          />

          {/* Espresso Render */}
          <img
            ref={espressoRef}
            src="/img/espresso_render.png"
            alt="Volcanic Espresso 3D"
            className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
          />

          {/* Cold Brew Render (Reserved if needed for custom section) */}
          <img
            ref={coldbrewRef}
            src="/img/coldbrew_render.png"
            alt="Volcanic Cold Brew 3D"
            className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
          />

          {/* Watermark Blocker Cover (bottom-right edge of active render) */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: '5%',
              right: '4%',
              width: '24%',
              height: '14%',
              background: 'linear-gradient(135deg, transparent 0%, rgba(6,4,12,0.98) 55%, rgba(6,4,12,1) 100%)',
            }}
          />
        </div>
      </div>

      {/* ── 3D PARALLAX FLOATING COFFEE BEANS ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Bean 1 */}
        <div ref={bean1Ref} className="absolute left-[65vw] top-[40vh] w-9 h-6 pointer-events-none">
          <img
            src="/img/flatwhite_render.png"
            className="w-full h-full object-contain filter blur-[1px] opacity-40 brightness-50"
            style={{ transform: 'scale(0.12)' }}
            alt="bean"
          />
        </div>

        {/* Bean 2 */}
        <div ref={bean2Ref} className="absolute left-[58vw] top-[65vh] w-10 h-7 pointer-events-none">
          <img
            src="/img/flatwhite_render.png"
            className="w-full h-full object-contain filter blur-[0.5px] opacity-45 brightness-[0.4]"
            style={{ transform: 'scale(0.15)' }}
            alt="bean"
          />
        </div>

        {/* Bean 3 */}
        <div ref={bean3Ref} className="absolute left-[40vw] top-[50vh] w-8 h-5 pointer-events-none">
          <img
            src="/img/flatwhite_render.png"
            className="w-full h-full object-contain filter blur-[1.5px] opacity-30 brightness-[0.3]"
            style={{ transform: 'scale(0.1)' }}
            alt="bean"
          />
        </div>

        {/* Bean 4 */}
        <div ref={bean4Ref} className="absolute left-[75vw] top-[55vh] w-11 h-8 pointer-events-none">
          <img
            src="/img/flatwhite_render.png"
            className="w-full h-full object-contain filter blur-[2px] opacity-25 brightness-[0.25]"
            style={{ transform: 'scale(0.08)' }}
            alt="bean"
          />
        </div>

      </div>
    </div>
  );
}
