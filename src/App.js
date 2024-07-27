import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe from './Globe';
import ParallaxSection from './ParallaxSection';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const zoomProgress = Math.min(scrollY / window.innerHeight, 1);

  return (
    <div style={{ backgroundColor: 'black' }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        opacity: 1 - zoomProgress,
        pointerEvents: zoomProgress >= 1 ? 'none' : 'auto',
      }}>
        <Canvas style={{ background: 'transparent' }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Globe />
          <OrbitControls
            minDistance={5}
            maxDistance={5}
            enableZoom={false}
          />
        </Canvas>
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          zIndex: 10,
        }}>
          <h1 style={{
            fontSize: '36px',
            margin: 0,
            fontWeight: 600
          }}>
            SkyScope
          </h1>
          <p style={{
            fontSize: '16px',
            margin: '5px 0 0 0',
            fontWeight: 300
          }}>
            A first of its kind satellite tracking app
          </p>
        </div>
        <ScrollIndicator />
      </div>
      <div style={{ height: '400vh' }}>
        <ParallaxSection scrollY={scrollY} />
      </div>
    </div>
  );
}

const ScrollIndicator = () => (
  <div
    style={{
      position: 'absolute',
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      animation: 'bounce 2s infinite',
      opacity: 0.7,
    }}
  >
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 12L12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <style jsx>{`
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0) translateX(-50%);
        }
        40% {
          transform: translateY(-30px) translateX(-50%);
        }
        60% {
          transform: translateY(-15px) translateX(-50%);
        }
      }
    `}</style>
  </div>
);

export default App;