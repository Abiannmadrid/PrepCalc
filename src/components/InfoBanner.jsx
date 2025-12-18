// InfoBanner.jsx - Information banner component
export default function InfoBanner({ title, text }) {
    return (
      <div className="mb-6 bg-indigo-900/30 border border-indigo-600/50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg 
            className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <div>
            <h3 className="text-indigo-300 font-semibold mb-1">{title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
          </div>
        </div>
      </div>
    );
  }