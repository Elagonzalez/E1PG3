import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useGamification } from '../hooks/useGamification';

interface MouseTrailProps {
  interactionMode: 'repulsion' | 'attraction';
  particleCount: number;
  speed: number;
  interactionRadius: number;
  gravityEnabled: boolean;
  onParticlesActivated?: (count: number) => void;
}

const MouseTrail: React.FC<MouseTrailProps> = ({
  interactionMode,
  particleCount,
  speed,
  interactionRadius,
  gravityEnabled,
  onParticlesActivated,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const { trackParticleActivation, trackMouseDistance, particlesActivated, mouseDistance } = useGamification();

  useEffect(() => {
    // Aquí inicializo el canvas y su contexto para poder dibujar en 2D
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Esta clase es mi "molde" para crear cada partícula. 
    // Cada una tiene su posición, velocidad y tamaño único.
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      isInteraction: boolean;
      density: number;
      life?: number;
      maxLife?: number;
      isExplosion?: boolean;

      constructor(x: number, y: number, isInteraction = false, isExplosion = false) {
        this.x = x;
        this.y = y;
        this.density = (Math.random() * 20) + 1;
        this.isExplosion = isExplosion;
        
        if (isInteraction) {
          this.vx = 0;
          this.vy = 0;
          this.size = 3;
          this.color = 'rgba(255, 255, 255, 0.9)';
        } else if (isExplosion) {
          const angle = Math.random() * Math.PI * 2;
          const explosionSpeed = Math.random() * 5 + 2;
          this.vx = Math.cos(angle) * explosionSpeed;
          this.vy = Math.sin(angle) * explosionSpeed;
          this.size = Math.random() * 3 + 2;
          this.life = 1;
          this.maxLife = 60 + Math.random() * 30;
          this.color = 'rgba(0, 210, 255, 0.8)';
        } else {
          this.vx = (Math.random() - 0.5) * 0.4;
          this.vy = (Math.random() - 0.5) * 0.4;
          this.size = Math.random() * 2 + 1;
          this.color = 'rgba(255, 255, 255, 0.6)';
        }
        this.isInteraction = isInteraction;
      }

      update(canvasWidth: number, canvasHeight: number, mouseX: number, mouseY: number, hasInteraction: boolean, mode: 'repulsion' | 'attraction', radius: number, gravity: boolean, speedMultiplier: number) {
        if (this.isInteraction) return;

        if (this.isExplosion && this.life !== undefined) {
          this.life--;
          this.x += this.vx * speedMultiplier;
          this.y += this.vy * speedMultiplier;
          this.vy += 0.1; // Gravedad en explosiones
          return this.life > 0;
        }

        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;

        if (gravity) {
          this.vy += 0.02 * speedMultiplier;
        }

        if (hasInteraction) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < radius) {
            const force = (radius - distance) / radius;
            const push = force * force * 8;
            
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            if (mode === 'repulsion') {
              this.x += directionX * push;
              this.y += directionY * push;
            } else {
              this.x -= directionX * push;
              this.y -= directionY * push;
            }
          }
        }

        if (this.x <= 0 || this.x >= canvasWidth) this.vx = -this.vx;
        if (this.y <= 0 || this.y >= canvasHeight) {
          this.vy = -this.vy * 0.8;
          if (gravity) this.vy *= 0.6;
        }
        
        if (this.x < 0) this.x = 0;
        if (this.x > canvasWidth) this.x = canvasWidth;
        if (this.y < 0) this.y = 0;
        if (this.y > canvasHeight) this.y = canvasHeight;

        return true;
      }

      draw(ctx: CanvasRenderingContext2D, theme: 'dark' | 'light') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (this.isExplosion && this.life !== undefined && this.maxLife !== undefined) {
          const opacity = this.life / this.maxLife;
          ctx.fillStyle = `rgba(0, 210, 255, ${opacity})`;
        } else if (theme === 'light') {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        } else {
          ctx.fillStyle = this.color;
        }
        ctx.fill();
      }
    }

    let animationFrameId: number;
    let particles: Particle[] = [];
    let explosionParticles: Particle[] = [];
    const interactionParticle = new Particle(0, 0, true);
    let hasInteraction = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      interactionParticle.x = e.clientX;
      interactionParticle.y = e.clientY;
      trackMouseDistance(e.clientX, e.clientY);
      if (!hasInteraction) hasInteraction = true;
    };

    const handleMouseLeave = () => {
      hasInteraction = false;
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 15; i++) {
        explosionParticles.push(new Particle(e.clientX, e.clientY, false, true));
      }
      trackParticleActivation();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => p.update(
        canvas.width, 
        canvas.height, 
        interactionParticle.x, 
        interactionParticle.y, 
        hasInteraction,
        interactionMode,
        interactionRadius,
        gravityEnabled,
        speed
      ));

      explosionParticles = explosionParticles.filter(p => p.update(
        canvas.width,
        canvas.height,
        0, 0,
        false,
        'repulsion',
        0,
        false,
        speed
      ));

      const allParticles = [...particles, ...explosionParticles];
      if (hasInteraction) allParticles.push(interactionParticle);

      const maxDistance = 180;
      ctx.lineWidth = 0.6;
      
      for (let i = 0; i < allParticles.length; i++) {
        for (let j = i + 1; j < allParticles.length; j++) {
          const p1 = allParticles[i];
          const p2 = allParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const lineOpacity = (1 - distance / maxDistance) * 0.4;
            ctx.globalAlpha = lineOpacity;
            ctx.strokeStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      particles.forEach(p => p.draw(ctx, theme));
      explosionParticles.forEach(p => p.draw(ctx, theme));

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactionMode, particleCount, speed, interactionRadius, gravityEnabled, theme, trackMouseDistance, trackParticleActivation]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', pointerEvents: 'none', top: 0, left: 0, zIndex: 9999 }}
      />
    </>
  );
};

export default MouseTrail;