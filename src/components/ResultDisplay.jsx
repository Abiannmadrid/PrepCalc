// ResultDisplay.jsx - Display calculation results (UPDATED with drip rate support)
export default function ResultDisplay({ result, error, translations }) {
    if (error) {
      return (
        <div className="bg-red-900 border border-red-600 rounded-lg p-4 w-full text-center">
          <p className="text-red-400 font-medium">{error}</p>
        </div>
      );
    }
  
    if (!result) {
      return <p className="text-gray-400">{translations.enterInputs}</p>;
    }
  
    // Handle drip rate results
    if (result.type === "dripRate") {
      return (
        <div 
          className="w-full text-center p-6 rounded-2xl border border-indigo-600" 
          style={{ background: "linear-gradient(145deg, #1f1f23, #2e2e41)" }}
        >
          <p className="text-sm text-gray-400">{translations.volumeToDraw}</p>
          <p className="text-5xl font-extrabold text-indigo-400 mt-2">
            {result.dripsPerMinute}
          </p>
          <p className="text-xl text-indigo-300 mt-1">{translations.dripsPerMin}</p>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">{translations.flowRate}</p>
            <p className="text-2xl font-bold text-cyan-400 mt-1">
              {result.flowRate} {translations.mlPerHour}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-4">{translations.rounded}</p>
        </div>
      );
    }
  
    return (
      <div 
        className="w-full text-center p-6 rounded-2xl border border-indigo-600" 
        style={{ background: "linear-gradient(145deg, #1f1f23, #2e2e41)" }}
      >
        {result.multiVial ? (
          <>
            <p className="text-sm text-gray-400 mb-2">{translations.youWillNeed}</p>
            <p className="text-4xl font-extrabold text-indigo-400">
              {result.vialsNeeded} {translations.vials}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">{translations.drawFromEach}</p>
              <p className="text-2xl font-bold text-indigo-300 mt-1">
                {result.volume} {result.unit}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-400">{translations.totalVolume}</p>
              <p className="text-xl font-semibold text-cyan-400 mt-1">
                {result.totalVolume} {result.unit}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-4">{translations.roundedText}</p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-400">
              {result.type === "dilution" 
                ? translations.totalVolumeNeeded 
                : translations.volumeToDraw
              }
            </p>
            <p className="text-3xl font-extrabold text-indigo-400 mt-2">
              {result.volume} {result.unit}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {result.type === "dilution" 
                ? translations.dilutionNote 
                : translations.roundedText
              }
            </p>
          </>
        )}
      </div>
    );
  }