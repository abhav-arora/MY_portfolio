import React, { useRef, useEffect, memo } from 'react';

const FerroMagneticBg = memo(() => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 }); // Start off-screen

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const spacing = 35; // Grid spacing

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          
          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const maxDistance = 250;

          if (distance < maxDistance) {
            // --- MAGNETIC NEEDLE STATE ---
            const angle = Math.atan2(dy, dx);
            const intensity = 1 - (distance / maxDistance);
            const opacity = 0.15 + (intensity * 0.85); // Brightens up!
            const color = '56, 189, 248'; // Bright Cyan (#38bdf8)
            const needleLength = 16; // Shrinks to a needle

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            
            ctx.beginPath();
            ctx.moveTo(-needleLength / 2, 0);
            ctx.lineTo(needleLength / 2, 0);
            
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.stroke();
            
            ctx.restore();
          } else {
            // --- IDLE JOINED GRID STATE ---
            ctx.save();
            ctx.translate(x, y);
            
            ctx.beginPath();
            // Draw horizontal connection
            ctx.moveTo(-spacing / 2, 0);
            ctx.lineTo(spacing / 2, 0);
            // Draw vertical connection
            ctx.moveTo(0, -spacing / 2);
            ctx.lineTo(0, spacing / 2);
            
            ctx.strokeStyle = `rgba(100, 116, 139, 0.1)`; // Dim Slate grid
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Changed to window so elements don't block the hover effect!
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      // Pointer-events-none so it sits invisibly in the back
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
});

export default FerroMagneticBg;