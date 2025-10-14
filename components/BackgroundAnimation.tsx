"use client";

import { useEffect, useState } from "react";

export default function BackgroundAnimation() {
  const [shapes, setShapes] = useState<Array<{
    id: number;
    size: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const colors = [
      "bg-neon-cyan/40",
      "bg-neon-blue/35",
      "bg-neon-magenta/40",
      "bg-sky-500/30",
    ];

    const newShapes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 200 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setShapes(newShapes);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`floating-shape ${shape.color}`}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            animation: `float ${shape.duration}s ease-in-out infinite`,
            animationDelay: `${shape.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
