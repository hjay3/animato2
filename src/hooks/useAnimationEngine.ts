import { useSpring } from '@react-spring/three';
import { Clock, Vector3, Euler } from 'three';

export function useAnimationEngine() {
  const { scale } = useSpring({
    from: { scale: 1.8 },
    to: [{ scale: 2.2 }, { scale: 1.8 }],
    config: { mass: 2.5, tension: 180, friction: 12 },
    loop: true,
  });

  const getAnimationValues = (clock: Clock) => {
    const time = clock.getElapsedTime();
    const wiggleSpeed = 0.3;
    const wiggleAmount = 0.02;
    
    return {
      rotation: new Euler(
        Math.sin(time * wiggleSpeed) * wiggleAmount,      // Subtle nod
        Math.cos(time * wiggleSpeed * 1.3) * wiggleAmount, // Gentle side-to-side
        0                                                  // Keep z rotation minimal
      ),
      position: new Vector3(
        Math.sin(time * 0.4) * 0.1,    // Wider x movement
        Math.sin(time * 0.5) * 0.08,   // Gentle y float
        0                              // Locked z position
      ),
      shouldPlayNote: Math.sin(time * 2) > 0.95  // Trigger sound occasionally
    };
  };

  return {
    scale,
    getAnimationValues
  };
}