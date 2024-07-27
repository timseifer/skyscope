import React from 'react';

const ParallaxSection = ({ scrollY }) => {
  const sections = [
    { title: 'Rich FPV View', image: '/Assets/skyscope_tracking.png', description: 'first person view of skyscope' },
    { title: 'Track From Above', image: '/Assets/globe_view.png', description: 'track satellites from overhead' },
    { title: 'Ground Target LOS', image: '/Assets/select_multiple_sats.png', description: 'select thousands of satellites' },
  ];

  const getStyles = (index, progress, featureProgress) => {
    const baseStyle = {
      position: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: progress * (1 - featureProgress),
      transition: 'opacity 0.3s, transform 0.3s',
      width: '33.33%',
      height: '100vh',
    };

    return {
      ...baseStyle,
      left: `${33.33 * index}%`,
      transform: `translateY(${100 - progress * 100}%) scale(${1 + progress * 0.2})`,
    };
  };

  const progress = Math.max(0, Math.min(1, (scrollY - window.innerHeight) / window.innerHeight));
  const featureProgress = Math.max(0, Math.min(1, (scrollY - 2 * window.innerHeight) / window.innerHeight));
  const downloadProgress = Math.max(0, Math.min(1, (scrollY - 2.5 * window.innerHeight) / (0.5 * window.innerHeight)));

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        {sections.map((section, index) => (
          <div
            key={index}
            style={getStyles(index, progress, featureProgress)}
          >
            <div style={{ textAlign: 'center', color: 'white', padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{section.title}</h2>
              <div style={{ position: 'relative', maxHeight: '50vh' }}>
                <img 
                  src={section.image} 
                  alt={section.title} 
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto', 
                    maxHeight: '50vh', 
                    objectFit: 'contain' 
                  }} 
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'black',
                  opacity: featureProgress,
                  transition: 'opacity 0.3s',
                }}></div>
              </div>
              <p style={{ fontSize: '16px', marginTop: '10px' }}>{section.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${0.5 + downloadProgress * 0.5})`,
        opacity: downloadProgress,
        transition: 'opacity 0.8s, transform 0.6s',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          backgroundColor: 'yellow',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px',
        }}>
          <a href="https://apps.apple.com/your-app-link" target="_blank" rel="noopener noreferrer">
            <img 
              src="/Assets/gif.gif"
              alt="Download on the App Store"
              style={{ 
                maxWidth: '200px', 
                height: 'auto',
                display: 'block',
              }}
            />
          </a>
        </div>
        <p style={{
          margin: 0,
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}>
          Download SkyScope Today
        </p>
      </div>
    </>
  );
};

export default ParallaxSection;