import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * A component that renders a triangular grid background with colorful light beams
 */
function TriangularGridBackground({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Set correct canvas dimensions based on device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Draw dark background
    ctx.fillStyle = "#090617";
    ctx.fillRect(0, 0, width, height);

    // Draw triangular grid
    const gridSize = 40; // Size of triangles
    const triangleHeight = (Math.sqrt(3) * gridSize) / 2;

    ctx.strokeStyle = "rgba(50, 50, 50, 0.5)";
    ctx.lineWidth = 1;

    // Draw horizontal lines
    for (let y = 0; y <= height; y += triangleHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw diagonal lines
    for (let x = -height; x <= width + height; x += gridSize) {
      // Positive slope diagonals (/)
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();

      // Negative slope diagonals (\\)
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x - height, height);
      ctx.stroke();
    }

    // Draw colorful light beams
    const colors = [
      "#1dff80", // Green
      "#fbff2a", // Yellow
      "#ff3434", // Red
      "#d31dff", // Purple
      "#2a7fff", // Blue
    ];

    // Function to draw a light beam
    const drawLightBeam = (y, color, length = width) => {
      const startX = Math.random() * width * 0.3;
      const lineY = y;

      ctx.beginPath();
      ctx.moveTo(startX, lineY);
      ctx.lineTo(startX + length, lineY);

      // Create gradient for light beam
      const gradient = ctx.createLinearGradient(
        startX,
        lineY,
        startX + length,
        lineY
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.2, `${color}88`);
      gradient.addColorStop(0.5, color);
      gradient.addColorStop(0.8, `${color}88`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add glow effect
      ctx.beginPath();
      ctx.moveTo(startX, lineY);
      ctx.lineTo(startX + length, lineY);
      ctx.strokeStyle = `${color}33`;
      ctx.lineWidth = 5;
      ctx.stroke();
    };

    // Draw light beams at different positions
    const beamPositions = [
      { y: height * 0.15, color: colors[0] }, // Green - top
      { y: height * 0.25, color: colors[1] }, // Yellow - upper middle
      { y: height * 0.5, color: colors[2] }, // Red - middle
      { y: height * 0.65, color: colors[3] }, // Purple - lower middle
      { y: height * 0.85, color: colors[4] }, // Blue - bottom
    ];

    beamPositions.forEach((beam) => {
      drawLightBeam(beam.y, beam.color);
    });
  }, []);

  return (
    <motion.div
      className={`absolute inset-0 overflow-hidden z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </motion.div>
  );
}

export default TriangularGridBackground;
