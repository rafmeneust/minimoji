import React, { useState, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";

export default function DrawingCanvas({ color, tool, clearCanvas, onClearComplete, stageRef }) {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (clearCanvas) {
      setLines([]);
      onClearComplete();
    }
  }, [clearCanvas, onClearComplete]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, color, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine = { ...lastLine, points: [...lastLine.points, point.x, point.y] };
    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => setIsDrawing(false);

  return (
    <Stage
      ref={stageRef}
      width={660}
      height={400}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      style={{ background: "#fff", border: "1px solid #ccc" }}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke={line.tool === "eraser" ? "#fff" : line.color}
            strokeWidth={line.tool === "eraser" ? 20 : 3}
            tension={0.7}
            bezier
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
          />
        ))}
      </Layer>
    </Stage>
  );
}