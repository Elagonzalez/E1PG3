import React, { useEffect, useRef } from 'react';

const MouseTrail: React.FC = () => {
  // Uso una referencia para acceder al elemento canvas directamente en el DOM
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      constructor(x: number, y: number, isInteraction = false) {
        this.x = x;
        this.y = y;
        // La densidad me ayuda a variar qué tanto se mueven
        this.density = (Math.random() * 20) + 1;
        
        if (isInteraction) {
          // Esta es la partícula invisible que sigue al mouse
          this.vx = 0;
          this.vy = 0;
          this.size = 3;
          this.color = 'rgba(255, 255, 255, 0.9)';
        } else {
          // A las partículas normales les doy una velocidad aleatoria para que floten
          this.vx = (Math.random() - 0.5) * 0.4;
          this.vy = (Math.random() - 0.5) * 0.4;
          this.size = Math.random() * 2 + 1;
          this.color = 'rgba(255, 255, 255, 0.6)';
        }
        this.isInteraction = isInteraction;
      }

      // Esta función actualiza la posición de la partícula en cada frame
      update(canvasWidth: number, canvasHeight: number, mouseX: number, mouseY: number, hasInteraction: boolean) {
        if (this.isInteraction) return;

        // Movimiento básico: sumamos la velocidad a la posición
        this.x += this.vx;
        this.y += this.vy;

        // Aquí es donde sucede la magia: la interacción con el mouse
        if (hasInteraction) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 200; // Si el mouse está a menos de 200px, reaccionan

          if (distance < forceRadius) {
            // Uso una fórmula matemática para que el empuje sea más fuerte mientras más cerca esté
            const force = (forceRadius - distance) / forceRadius;
            const push = force * force * 8; 
            
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            // Empujo la partícula lejos del cursor
            this.x += directionX * push;
            this.y += directionY * push;
          }
        }

        // Si la partícula choca con una pared, invierto su velocidad para que rebote
        if (this.x <= 0 || this.x >= canvasWidth) this.vx = -this.vx;
        if (this.y <= 0 || this.y >= canvasHeight) this.vy = -this.vy;
        
        // Me aseguro de que no se queden atrapadas fuera de la pantalla por el empuje
        if (this.x < 0) this.x = 0;
        if (this.x > canvasWidth) this.x = canvasWidth;
        if (this.y < 0) this.y = 0;
        if (this.y > canvasHeight) this.y = canvasHeight;
      }

      // Simplemente dibujo un círculo blanco con los datos de la partícula
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    let animationFrameId: number;
    let particles: Particle[] = [];
    // Esta partícula me sirve para representar la posición del mouse en mis cálculos
    const interactionParticle = new Particle(0, 0, true);
    let hasInteraction = false;

    // Ajusto el canvas al tamaño de la ventana y reinicio las partículas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      
      // Calculo cuántas partículas crear basándome en el tamaño de la pantalla
      // para que no se ponga lento en monitores muy grandes
      const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 12000), 120);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }
    };

    // Actualizo las coordenadas de mi "partícula de interacción" cuando muevo el mouse
    const handleMouseMove = (e: MouseEvent) => {
      interactionParticle.x = e.clientX;
      interactionParticle.y = e.clientY;
      if (!hasInteraction) hasInteraction = true;
    };

    const handleMouseLeave = () => {
      hasInteraction = false;
    };

    // Este es el bucle principal de la animación
    const animate = () => {
      // Limpio el canvas antes de dibujar el siguiente cuadro
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizo todas las partículas normales
      particles.forEach(p => p.update(
        canvas.width, 
        canvas.height, 
        interactionParticle.x, 
        interactionParticle.y, 
        hasInteraction
      ));

      // Creo una lista con todas las partículas para calcular las líneas (constelación)
      const allParticles = [...particles];
      if (hasInteraction) allParticles.push(interactionParticle);

      const maxDistance = 180; 
      ctx.lineWidth = 0.6;
      
      // Reviso la distancia entre CADA PAR de partículas para ver si dibujo una línea
      for (let i = 0; i < allParticles.length; i++) {
        for (let j = i + 1; j < allParticles.length; j++) {
          const p1 = allParticles[i];
          const p2 = allParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Si están lo suficientemente cerca, dibujo una línea tenue entre ellas
          if (distance < maxDistance) {
            const lineOpacity = (1 - distance / maxDistance) * 0.4;
            ctx.globalAlpha = lineOpacity;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Finalmente dibujo los puntitos (partículas)
      ctx.globalAlpha = 1;
      particles.forEach(p => p.draw());

      // Pido al navegador que ejecute esta función de nuevo lo más rápido posible
      animationFrameId = requestAnimationFrame(animate);
    };

    // Registro los eventos para que el sistema responda al usuario
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    handleResize();
    animate();

    // Limpieza al desmontar el componente para evitar fugas de memoria
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', pointerEvents: 'none', top: 0, left: 0, zIndex: 9999 }}
    />
  );
};

export default MouseTrail;