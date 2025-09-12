'use client';

import gsap from 'gsap';
import { LenisRef, ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

/**
 * Props for the Lenis component.
 * @interface LenisProps
 */
interface LenisProps {
  /**
   * The children to be rendered within the Lenis scroll container.
   * @type {React.ReactNode}
   */
  children: React.ReactNode;
}

/**
 * Lenis component for smooth scrolling integration with GSAP.
 * It initializes Lenis and ties its `raf` (request animation frame) updates to GSAP's ticker.
 *
 * @param {LenisProps} { children } - The props for the component.
 * @returns {JSX.Element} The ReactLenis component wrapping its children.
 */
function Lenis({ children }: LenisProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    /**
     * Updates the Lenis instance on each GSAP ticker frame.
     * @param {number} time - The current time provided by GSAP's ticker.
     * @returns {void}
     */
    function update(time: number): void {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{ autoRaf: false, anchors: true, wheelMultiplier: 0.5, touchMultiplier: 0.5 }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}

export default Lenis;
