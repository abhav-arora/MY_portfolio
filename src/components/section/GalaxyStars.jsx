import React, { useRef, useEffect, memo } from 'react';

// Use React.memo to prevent unnecessary re-renders when the parent re-renders
const GalaxyStars = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let stars = [];
    const numStars = 250; // Performance friendly count
    let animationFrameId;

    // Set standard sizes and create stars array once
    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      generateStars();
    };

    const generateStars = () => {
      stars = [];
      const colors = ['#ffffff', '#fff9e6', '#e6f2ff', '#ffe6e6']; // Vary colors slightly for galaxy feel
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Create depth: some tiny, some slightly larger
          radius: Math.random() * Math.random() * 1.5 + 0.2, 
          // Base opacity and twinkle depth variation
          opacity: Math.random() * 0.7 + 0.1, 
          twinkleFactor: Math.random() * 0.02 + 0.005,
          twinkleDirection: Math.random() < 0.5 ? 1 : -1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        // Subtle twinkling animation math
        star.opacity += star.twinkleFactor * star.twinkleDirection;
        if (star.opacity > 0.8 || star.opacity < 0.1) {
          star.twinkleDirection *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        
        // Ensure standard alpha blending is applied correctly
        ctx.globalAlpha = star.opacity; 
        ctx.fill();
        ctx.globalAlpha = 1.0; // Reset for next loop
      });

      animationFrameId = requestAnimationFrame(drawStars);
    };

    // Initialize and bind events
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawStars();

    // Clean up to prevent performance leaks
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
});

export default GalaxyStars;