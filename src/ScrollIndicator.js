import React, { useCallback } from 'react';

const ScrollIndicator = () => {
  const handleClick = useCallback(() => {
    console.log('Button clicked'); // Add this line for debugging

    // Use requestAnimationFrame for smoother scrolling
    const scrollToParallax = () => {
      const targetPosition = window.innerHeight;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // ms
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);
    };

    scrollToParallax();
  }, []);

  // Easing function
  const easeInOutCubic = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite',
        opacity: 0.7,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        zIndex: 100, // Add this to ensure the button is clickable
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
    </button>
  );
};

export default ScrollIndicator;