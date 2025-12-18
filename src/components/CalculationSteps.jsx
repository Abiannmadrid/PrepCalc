// CalculationSteps.jsx - Display step-by-step calculation
export default function CalculationSteps({ steps, title }) {
    if (!steps || steps.length === 0) return null;
  
    return (
      <div className="w-full mt-6 pt-6 border-t border-gray-700">
        <h4 className="text-md font-semibold text-indigo-300 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          {title}
        </h4>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 text-sm">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-semibold">
                {index + 1}
              </span>
              <p className="text-gray-300 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }