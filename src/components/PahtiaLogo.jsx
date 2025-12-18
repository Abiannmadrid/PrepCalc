// PahtiaLogo.jsx - Reusable logo component
export default function PahtiaLogo({ size = "md" }) {
    const sizes = { 
      sm: { hex: 20, text: 16 }, 
      md: { hex: 30, text: 24 }, 
      lg: { hex: 40, text: 32 } 
    };
    const s = sizes[size];
    
    return (
      <div className="flex items-center gap-3">
        <svg width={s.hex} height={s.hex} viewBox="0 0 100 100" className="flex-shrink-0">
          <defs>
            <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:"#818cf8"}} />
              <stop offset="100%" style={{stopColor:"#a78bfa"}} />
            </linearGradient>
          </defs>
          <polygon 
            points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" 
            fill="none" 
            stroke="url(#hexGrad)" 
            strokeWidth="3"
          />
          <circle cx="50" cy="50" r="12" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.7"/>
          <circle cx="50" cy="50" r="3" fill="#3b82f6"/>
          <circle cx="50" cy="15" r="3" fill="#c4b5fd"/>
          <circle cx="80" cy="32.5" r="3" fill="#c4b5fd"/>
          <circle cx="80" cy="67.5" r="3" fill="#c4b5fd"/>
          <circle cx="50" cy="85" r="3" fill="#c4b5fd"/>
          <circle cx="20" cy="67.5" r="3" fill="#c4b5fd"/>
          <circle cx="20" cy="32.5" r="3" fill="#c4b5fd"/>
        </svg>
        <div className="flex items-baseline gap-2">
          <span 
            style={{fontSize: s.text}} 
            className="font-light text-indigo-200 tracking-wide"
          >
            Pahtia
          </span>
          <span 
            style={{fontSize: s.text * 0.75}} 
            className="font-semibold text-indigo-400 tracking-widest"
          >
            LABS
          </span>
        </div>
      </div>
    );
  }