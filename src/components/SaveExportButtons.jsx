import React from "react";
import { motion } from "framer-motion";

export default function SaveExportButtons({ stageRef }) {
  const handleExport = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = "dessin-minimoji.png";
    link.href = uri;
    link.click();
  };

  return (
    <div className="mt-8 text-center">
      <motion.button
        onClick={handleExport}
        className="inline-block px-6 py-4 bg-[#FB923C] hover:bg-orange-600 text-white rounded-full font-semibold transition"
        whileHover={{ scale: 1.05 }}
      >
        Exporter en PNG
      </motion.button>
    </div>
  );
}