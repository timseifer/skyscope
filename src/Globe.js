import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Globe = React.memo(() => {
  const earthRef = useRef();
  const satelliteGroupRef = useRef();
  const pyramidRef = useRef();

  // Load Earth texture
  const earthTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load(`${process.env.PUBLIC_URL}/Assets/earth_skyscope.jpg`);
  }, []);

  // Load satellite model
  const { scene } = useGLTF(`${process.env.PUBLIC_URL}/Assets/FabConvert.com_aura_27.glb`, true);

  // Create pyramid geometry
  const pyramidGeometry = useMemo(() => {
    const geometry = new THREE.ConeGeometry(0.5, 2, 4);
    geometry.rotateX(-Math.PI / 2);  // Flip the pyramid to point outward
    geometry.translate(0, 0, 1);  // Move the pyramid outward
    return geometry;
  }, []);

  // Pre-compute values for position updates
  const orbitRadius = 1.5;

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * 0.1;  // Slow down overall animation

    if (earthRef.current) {
      earthRef.current.rotation.y = -elapsedTime * 0.5;  // Reverse Earth rotation
    }

    if (satelliteGroupRef.current) {
      satelliteGroupRef.current.rotation.y = -elapsedTime;  // Reverse satellite orbit
    }
  });

  const earthMaterial = useMemo(() => (
    <meshStandardMaterial
      map={earthTexture}
      emissive={new THREE.Color(0x333333)}
      emissiveIntensity={0.2}
    />
  ), [earthTexture]);

  const pyramidMaterial = useMemo(() => (
    <meshBasicMaterial
      color="cyan"
      transparent
      opacity={0.3}
      side={THREE.DoubleSide}
    />
  ), []);

  return (
    <group rotation={[0, Math.PI, 0]}>  {/* Rotate entire scene 180 degrees */}
      <Sphere ref={earthRef} args={[1, 24, 24]}>
        {earthMaterial}
      </Sphere>

      <group ref={satelliteGroupRef}>
        <group position={[orbitRadius, 0, 0]} rotation={[-Math.PI/2, 30, -Math.PI/2]}> {/* Add 90 degree rotation here */}
          <primitive
            object={scene}
            scale={[0.01, 0.01, 0.01]}
          />
          <mesh ref={pyramidRef} geometry={pyramidGeometry}>
            {pyramidMaterial}
          </mesh>
        </group>
      </group>
    </group>
  );
});

export default Globe;