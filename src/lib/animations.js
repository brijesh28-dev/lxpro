import { useRef, useState, useEffect } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";

// Luxury Easing Curves & Springs
export const LUXURY_EASE = [0.16, 1, 0.3, 1]; // Ease-out expo (Hermès / Apple standard)
export const LUXURY_SPRING = { type: "spring", stiffness: 220, damping: 28 };
export const MAGNETIC_SPRING = { type: "spring", stiffness: 320, damping: 22, mass: 0.8 };
export const LIQUID_SPRING = { type: "spring", stiffness: 480, damping: 32 };

/**
 * useMagneticHover: Creates a tactile magnetic pull toward cursor for buttons & CTAs
 * @param {number} pullStrength - Max pixels to offset (default: 8px)
 * @param {number} innerPullStrength - Extra displacement for nested icons (default: 12px)
 */
export function useMagneticHover(pullStrength = 8, innerPullStrength = 12) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, MAGNETIC_SPRING);
  const springY = useSpring(y, MAGNETIC_SPRING);

  const innerX = useTransform(springX, (latest) => (latest / pullStrength) * innerPullStrength);
  const innerY = useTransform(springY, (latest) => (latest / pullStrength) * innerPullStrength);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(Math.max(-pullStrength, Math.min(pullStrength, distanceX * 0.25)));
    y.set(Math.max(-pullStrength, Math.min(pullStrength, distanceY * 0.25)));
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    x: springX,
    y: springY,
    innerX,
    innerY,
    isHovered,
    bind: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}

/**
 * useTilt3D: Implements an interactive 3D physics tilt with specular light reflection
 * @param {number} maxTilt - Maximum rotation degrees (default: 7)
 */
export function useTilt3D(maxTilt = 7) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 280, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 280, damping: 25 });
  const springGlareOpacity = useSpring(glareOpacity, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;

    // Calculate 3D rotation angles
    rotateX.set((0.5 - yPos) * (maxTilt * 2));
    rotateY.set((xPos - 0.5) * (maxTilt * 2));

    // Calculate specular light reflection position
    glareX.set(xPos * 100);
    glareY.set(yPos * 100);
    glareOpacity.set(0.4);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  return {
    cardRef,
    rotateX: springRotateX,
    rotateY: springRotateY,
    glareX,
    glareY,
    glareOpacity: springGlareOpacity,
    bind: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}

/**
 * Animated Counter Hook: Smoothly counts up from 0 to target value with cubic ease-out
 */
export function useAnimatedCounter(targetValue, duration = 1.4, trigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime;
    let animationFrame;

    const parseValue = parseInt(targetValue.toString().replace(/[^0-9]/g, ""), 10) || 0;
    if (parseValue === 0) {
      setCount(0);
      return;
    }

    // Adaptive duration for natural pace
    const effectiveDuration = parseValue <= 10 ? 0.8 : parseValue <= 50 ? 1.1 : duration;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / effectiveDuration, 1);
      
      // Silky smooth cubic ease-out (1 - (1 - progress)^3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easeProgress * parseValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(parseValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue, duration, trigger]);

  return count;
}

