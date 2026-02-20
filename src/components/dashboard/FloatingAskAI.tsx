"use client";

import { useEffect, useRef, useState } from "react";
import AskFairmAIButton from "./AskFairmAIButton";

type Position = {
  x: number;
  y: number;
};

export default function FloatingAskAI() {
  /* ---------------------------------------------
     SAFE DEFAULT (SSR FRIENDLY)
  ---------------------------------------------- */
  const [position, setPosition] = useState<Position>({
    x: 24,
    y: 120,
  });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  /* ---------------------------------------------
     CLIENT-ONLY RANDOM POSITION (NO HYDRATION BUG)
  ---------------------------------------------- */
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const padding = 24;
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 120;

    setTimeout(() => {
      setPosition({
        x: padding + Math.random() * Math.max(0, maxX),
        y: padding + Math.random() * Math.max(0, maxY),
      });
    }, 0);
  }, []);

  /* ---------------------------------------------
     DRAG LOGIC (EVENT-DRIVEN, NO WARNINGS)
  ---------------------------------------------- */
  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;

    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="fixed z-[9999] cursor-move"
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
    >
      <AskFairmAIButton />
    </div>
  );
}
