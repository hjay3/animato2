import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, Vector3, MathUtils } from 'three';
import { animated } from '@react-spring/three';
import { useModelLoader } from '../hooks/useModelLoader';
import { useSoundEngine } from '../hooks/useSoundEngine';
import { useAnimationEngine } from '../hooks/useAnimationEngine';

export function Model() {
  const meshRef = useRef<Mesh>(null);
  const positionRef = useRef(new Vector3(0, 0, 0));
  const { camera } = useThree();
  
  const { currentModel } = useModelLoader();
  const { playRandomNote } = useSoundEngine();
  const { scale, getAnimationValues } = useAnimationEngine();

  // Initialize Tone.js on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      import('tone').then(Tone => {
        Tone.start();
        window.removeEventListener('click', handleFirstInteraction);
      });
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const { rotation, position, shouldPlayNote } = getAnimationValues(state.clock);
    
    // Always face camera but allow subtle movements
    meshRef.current.lookAt(camera.position);
    
    // Apply the wiggle movements
    meshRef.current.rotation.x = rotation.x;
    meshRef.current.rotation.y = rotation.y;
    
    // Update position with smooth interpolation
    positionRef.current.lerp(
      new Vector3(position.x, position.y, 0),
      0.02
    );
    meshRef.current.position.copy(positionRef.current);

    if (shouldPlayNote) {
      playRandomNote();
    }
  });

  return (
    <animated.mesh ref={meshRef} scale={scale}>
      <primitive
        object={currentModel}
        scale={0.15}
        rotation={[0, Math.PI, 0]}
      />
    </animated.mesh>
  );
}