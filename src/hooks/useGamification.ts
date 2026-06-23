import { useState, useCallback } from 'react';

export const useGamification = () => {
  const [particlesActivated, setParticlesActivated] = useState(0);
  const [mouseDistance, setMouseDistance] = useState(0);
  const lastPositionRef = useState({ x: 0, y: 0 });

  const trackParticleActivation = useCallback(() => {
    setParticlesActivated(prev => prev + 1);
  }, []);

  const trackMouseDistance = useCallback((x: number, y: number) => {
    const [lastPos] = lastPositionRef;
    const distance = Math.sqrt(
      Math.pow(x - lastPos.x, 2) + Math.pow(y - lastPos.y, 2)
    );
    setMouseDistance(prev => prev + distance);
    lastPositionRef[0] = { x, y };
  }, [lastPositionRef]);

  return {
    particlesActivated,
    mouseDistance,
    trackParticleActivation,
    trackMouseDistance,
  };
};
