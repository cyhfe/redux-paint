import React, { useRef } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startDrawing = () => {};
  const endDrawing = () => {};
  const draw = () => {};
  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseOut={endDrawing}
      onMouseOver={draw}
      ref={canvasRef}
    />
  );
}

export default App;
