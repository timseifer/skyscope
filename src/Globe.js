import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, useGLTF, Line } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const earthRef = useRef();
  const satelliteRef = useRef();
  const lineRef = useRef();
  const pyramidRef = useRef();

  // Load Earth texture
  const earthTexture = useLoader(THREE.TextureLoader, '/Assets/earth_skyscope.jpg');

  // Load satellite model
  const { scene } = useGLTF('/Assets/FabConvert.com_aura_27.glb');

  // Create points for the trailing line
  const points = useMemo(() => new Array(100).fill().map(() => new THREE.Vector3(3, 0, 0)), []);

  // Create pyramid geometry
  const pyramidGeometry = useMemo(() => {
    const geometry = new THREE.ConeGeometry(0.5, 2, 4);
    geometry.rotateX(-Math.PI / 2);  // Rotate to point downwards
    geometry.translate(0, 0, 1);     // Move base of cone to origin
    return geometry;
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (earthRef.current) {
      earthRef.current.rotation.y = elapsedTime / 10;
    }

    if (satelliteRef.current && pyramidRef.current) {
      const x = Math.cos(elapsedTime) * 3;
      const z = Math.sin(elapsedTime) * 3;
      satelliteRef.current.position.set(x, 0, z);
      satelliteRef.current.rotation.y = elapsedTime;

      // Position the pyramid
      pyramidRef.current.position.set(x, 0, z);
      // Rotate the pyramid to point towards the earth
      pyramidRef.current.lookAt(0, 0, 0);

      // Update trailing line
      points.push(new THREE.Vector3(x, 0, z));
      points.shift();
      lineRef.current.geometry.setFromPoints(points);
    }
  });

  return (
    <>
      <Sphere ref={earthRef} args={[1, 32, 32]}>
        <meshStandardMaterial map={earthTexture} />
      </Sphere>

      <primitive
        object={scene}
        ref={satelliteRef}
        position={[3, 0, 0]}
        scale={[0.01, 0.01, 0.01]}
      />

      <mesh ref={pyramidRef} geometry={pyramidGeometry}>
        <meshPhongMaterial
          color="cyan"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Line
        ref={lineRef}
        points={points}
        color="red"
        lineWidth={2}
      />
    </>
  );
};

export default Globe;