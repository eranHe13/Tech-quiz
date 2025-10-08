import { useState, useEffect } from 'react';

// Rainbow colors array
const RAINBOW_COLORS = [
  'linear-gradient(135deg, #ff0000 0%, #ff4500 100%)', // Red
  'linear-gradient(135deg, #ff6b00 0%, #ffa500 100%)', // Orange
  'linear-gradient(135deg, #ffd700 0%, #ffff00 100%)', // Yellow
  'linear-gradient(135deg, #00ff00 0%, #32cd32 100%)', // Green
  'linear-gradient(135deg, #00bfff 0%, #1e90ff 100%)', // Blue
  'linear-gradient(135deg, #4b0082 0%, #8a2be2 100%)', // Indigo
  'linear-gradient(135deg, #9400d3 0%, #ff00ff 100%)', // Violet
  'linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)', // Pink
];

let nextId = 0;

const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const [particles, setParticles] = useState([]);
  
  // Initialize bubbles on mount
  useEffect(() => {
    const initialBubbles = Array.from({ length: 15 }, () => createBubble());
    setBubbles(initialBubbles);
  }, []);
  
  // Create a new bubble with random properties
  const createBubble = (x = null, y = null) => {
    return {
      id: nextId++,
      x: x !== null ? x : Math.random() * 100,
      y: y !== null ? y : Math.random() * 100,
      size: Math.random() * 80 + 40, // 40-120px
      color: RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)],
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    };
  };
  
  // Create explosion particles
  const createExplosion = (bubble) => {
    const particleCount = 12;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      newParticles.push({
        id: nextId++,
        x: bubble.x,
        y: bubble.y,
        size: Math.random() * 20 + 10,
        color: bubble.color,
        angle: angle,
        velocity: Math.random() * 3 + 2,
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };
  
  // Handle bubble click
  const handleBubbleClick = (bubble) => {
    // Create explosion effect
    createExplosion(bubble);
    
    // Remove clicked bubble and create 2 new ones
    setBubbles(prev => {
      const filtered = prev.filter(b => b.id !== bubble.id);
      const newBubble1 = createBubble(bubble.x, bubble.y);
      const newBubble2 = createBubble(bubble.x, bubble.y);
      return [...filtered, newBubble1, newBubble2];
    });
  };
  
  // Animate bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => prev.map(bubble => {
        let newX = bubble.x + bubble.speedX;
        let newY = bubble.y + bubble.speedY;
        let newSpeedX = bubble.speedX;
        let newSpeedY = bubble.speedY;
        
        // Bounce off edges
        if (newX <= 0 || newX >= 100) {
          newSpeedX = -bubble.speedX;
          newX = newX <= 0 ? 0 : 100;
        }
        if (newY <= 0 || newY >= 100) {
          newSpeedY = -bubble.speedY;
          newY = newY <= 0 ? 0 : 100;
        }
        
        return {
          ...bubble,
          x: newX,
          y: newY,
          speedX: newSpeedX,
          speedY: newSpeedY,
        };
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bubbles-container">
      {/* Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: bubble.color,
          }}
          onClick={() => handleBubbleClick(bubble)}
        />
      ))}
      
      {/* Explosion Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            '--angle': `${particle.angle}rad`,
            '--velocity': particle.velocity,
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;

