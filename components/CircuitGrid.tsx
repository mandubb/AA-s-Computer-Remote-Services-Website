"use client";

import { useEffect, useRef } from "react";

interface CircuitLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
  speed: number;
  color: string;
  horizontal: boolean;
}

export default function CircuitGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const linesRef = useRef<CircuitLine[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize circuit lines
    const lineCount = 15;
    const lines: CircuitLine[] = [];
    const colors = [
      "rgba(25, 249, 255, 0.6)",
      "rgba(77, 124, 254, 0.5)",
      "rgba(255, 91, 255, 0.4)",
    ];

    for (let i = 0; i < lineCount; i++) {
      const horizontal = Math.random() > 0.5;
      
      if (horizontal) {
        const y = Math.random() * canvas.height;
        lines.push({
          x1: 0,
          y1: y,
          x2: canvas.width,
          y2: y,
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.002,
          color: colors[Math.floor(Math.random() * colors.length)],
          horizontal: true,
        });
      } else {
        const x = Math.random() * canvas.width;
        lines.push({
          x1: x,
          y1: 0,
          x2: x,
          y2: canvas.height,
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.002,
          color: colors[Math.floor(Math.random() * colors.length)],
          horizontal: false,
        });
      }
    }
    linesRef.current = lines;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        // Update progress
        line.progress += line.speed;
        if (line.progress > 1) line.progress = 0;

        // Calculate current position based on progress
        const currentX = line.x1 + (line.x2 - line.x1) * line.progress;
        const currentY = line.y1 + (line.y2 - line.y1) * line.progress;

        // Draw the static line (dimmed)
        ctx.strokeStyle = line.color.replace(/[\d.]+\)$/, "0.1)");
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();

        // Draw the animated segment
        const segmentLength = line.horizontal 
          ? (line.x2 - line.x1) * 0.15 
          : (line.y2 - line.y1) * 0.15;

        const startX = line.horizontal 
          ? Math.max(line.x1, currentX - segmentLength)
          : currentX;
        const startY = line.horizontal 
          ? currentY
          : Math.max(line.y1, currentY - segmentLength);

        // Gradient for the moving segment
        const gradient = line.horizontal
          ? ctx.createLinearGradient(startX, startY, currentX, currentY)
          : ctx.createLinearGradient(startX, startY, currentX, currentY);

        gradient.addColorStop(0, line.color.replace(/[\d.]+\)$/, "0)"));
        gradient.addColorStop(0.5, line.color);
        gradient.addColorStop(1, line.color.replace(/[\d.]+\)$/, "1)"));

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = line.color;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw glowing dot at current position
        const dotGradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          8
        );
        dotGradient.addColorStop(0, line.color.replace(/[\d.]+\)$/, "1)"));
        dotGradient.addColorStop(0.5, line.color.replace(/[\d.]+\)$/, "0.6)"));
        dotGradient.addColorStop(1, line.color.replace(/[\d.]+\)$/, "0)"));

        ctx.fillStyle = dotGradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw connection nodes at intervals
        const nodeCount = 5;
        for (let i = 0; i <= nodeCount; i++) {
          const t = i / nodeCount;
          const nodeX = line.x1 + (line.x2 - line.x1) * t;
          const nodeY = line.y1 + (line.y2 - line.y1) * t;

          ctx.fillStyle = line.color.replace(/[\d.]+\)$/, "0.3)");
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2);
          ctx.fill();

          // Pulse effect when the moving dot is near
          const distX = currentX - nodeX;
          const distY = currentY - nodeY;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < 50) {
            const pulseOpacity = (1 - dist / 50) * 0.8;
            const pulseGradient = ctx.createRadialGradient(
              nodeX,
              nodeY,
              0,
              nodeX,
              nodeY,
              15
            );
            pulseGradient.addColorStop(0, line.color.replace(/[\d.]+\)$/, `${pulseOpacity})`));
            pulseGradient.addColorStop(1, line.color.replace(/[\d.]+\)$/, "0)"));

            ctx.fillStyle = pulseGradient;
            ctx.beginPath();
            ctx.arc(nodeX, nodeY, 15, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity: 0.4 }}
    />
  );
}
