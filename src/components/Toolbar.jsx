import React from "react";
import ColorPicker from "./ColorPicker";

export default function Toolbar({ color, setColor, tool, setTool, onClear }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      <ColorPicker color={color} setColor={setColor} />
      <button
        onClick={() => setTool("pen")}
        className={`px-4 py-2 rounded-full font-semibold transition ${
          tool === "pen" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        }`}
      >
        ✏️ Crayon
      </button>
      <button
        onClick={() => setTool("eraser")}
        className={`px-4 py-2 rounded-full font-semibold transition ${
          tool === "eraser" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        }`}
      >
        🧽 Gomme
      </button>
      <button
        onClick={onClear}
        className="px-4 py-2 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition"
      >
        Effacer tout
      </button>
    </div>
  );
}