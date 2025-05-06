import React from 'react';

const SimplifiedSection = () => {
  const sections = [
    { title: 'Rich FPV View', image: `${process.env.PUBLIC_URL}/Assets/skyscope_tracking.png`, description: 'first person view of skyscope' },
    { title: 'Track From Above', image: `${process.env.PUBLIC_URL}/Assets/globe_view.png`, description: 'track satellites from overhead' },
    { title: 'Ground Target LOS', image: `${process.env.PUBLIC_URL}/Assets/select_multiple_sats.png`, description: 'select thousands of satellites' },
  ];

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
      }}>
        {sections.map((section, index) => (
          <div key={index} style={{ width: '30%', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '10px', color: 'white' }}>{section.title}</h2>
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
            <p style={{ fontSize: '16px', marginTop: '10px', color: 'white' }}>{section.description}</p>
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
      }}>
        <div style={{
          backgroundColor: 'yellow',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px',
        }}>
          <a href="https://apps.apple.com/us/app/skyscope/id6503178877?platform=iphone" target="_blank" rel="noopener noreferrer">
            <img
              src={`${process.env.PUBLIC_URL}/Assets/gif.gif`}
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
          color: 'white',  // Changed this to white as well
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          Download SkyScope Today
        </p>
      </div>
    </div>
  );
};

export default SimplifiedSection;