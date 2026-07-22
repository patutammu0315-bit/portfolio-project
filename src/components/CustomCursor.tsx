import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports touch
    const checkTouch = () => {
      const mobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };
    checkTouch();

    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    // Track if hovering over buttons, links, clickable cards
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable") ||
        target.closest(".clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile]);

  // Handle smooth trailing physics for the outer glow ring
  useEffect(() => {
    if (isMobile) return;

    let animFrameId: number;
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Adjust the speed/delay factor here (e.g. 0.15 for smooth drag lag)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animFrameId = requestAnimationFrame(updateTrail);
    };

    animFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animFrameId);
  }, [position, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Halo ring */}
      <div
        className="custom-cursor pointer-events-none"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: isHovered ? "44px" : "24px",
          height: isHovered ? "44px" : "24px",
          borderColor: isHovered ? "#06b6d4" : "#3b82f6",
          backgroundColor: isHovered ? "rgba(6, 182, 212, 0.1)" : "transparent",
        }}
      />
      {/* Inner Dot pointer */}
      <div
        className="custom-cursor-dot pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
