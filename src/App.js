import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe from './Globe';
import SimplifiedSection from './SimplifiedSection';
import ScrollIndicator from './ScrollIndicator';

function App() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
        // Some browsers require user interaction before playing videos
      });
    }
  }, []);
  
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };
  
  return (
    <div style={{ backgroundColor: 'black' }}>
      {/* Hero section with video background */}
      <div style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Video Background with full width and height */}
                 <div style={{
          position: 'absolute',
          width: '100vw', // Full viewport width
          height: '100vh', // Full viewport height
          top: 0,
          left: 0,
          zIndex: 1,
        }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleVideoLoaded}
            style={{
              width: '100vw', 
              height: '100%',
              objectFit: 'fill',
              opacity: 0.3,
              filter: 'brightness(0.4)',
            }}
          >
            <source src={`${process.env.PUBLIC_URL}/Assets/skyscope_small.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* 3D Canvas */}
        <Canvas
          style={{
            background: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Globe />
          <OrbitControls
            minDistance={5}
            maxDistance={5}
            enableZoom={false}
            enableRotate={false}
            enablePan={false}
          />
        </Canvas>
        
        {/* Content overlays */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          zIndex: 20,
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
        
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
        }}>
          <ScrollIndicator />
        </div>
      </div>
      
      <SimplifiedSection />
    </div>
  );
}

export default App;