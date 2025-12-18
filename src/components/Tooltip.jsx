// Tooltip.jsx - Reusable tooltip component
import { useState } from "react";

export default function Tooltip({ text }) {
  const [visible, setVisible] = useState(false);
  
  return (
    <div 
      className="relative inline-block" 
      onMouseEnter={() => setVisible(true)} 
      onMouseLeave={() => setVisible(false)}
    >
      <svg 
        className="cursor-pointer text-gray-400 hover:text-indigo-400 transition w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
        <path strokeWidth="2" d="M12 16v-4m0-4h.01"/>
      </svg>
      {visible && (
        <div className="absolute z-[9999] top-full left-1/2 transform -translate-x-1/2 mt-3">
          <div 
            className="text-white text-sm font-medium rounded-xl shadow-2xl border border-gray-600 px-6 py-4 text-center max-w-xs" 
            style={{ backgroundColor: "rgba(30,30,35,0.95)" }}
          >
            {text}
          </div>
        </div>
      )}
    </div>
  );
}