// App.jsx - Main application component (refactored)
import { useState } from "react";
import { translations } from './constants/translations';
import { calculateDose } from './calculators/doseCalculator';
import { calculateDilution } from './calculators/dilutionCalculator';
import { isValidNumber, isValidPositiveNumber } from './utils/validation';
import { useLocalStorage } from './utils/useLocalStorage';
import { calculateDripRate } from './calculators/dripRateCalculator';
import DripRateCalculatorForm from './components/DripRateCalculatorForm';

// Components
import PahtiaLogo from './components/PahtiaLogo';
import LanguageSelector from './components/LanguageSelector';
import InfoBanner from './components/InfoBanner';
import DoseCalculatorForm from './components/DoseCalculatorForm';
import DilutionCalculatorForm from './components/DilutionCalculatorForm';
import ResultDisplay from './components/ResultDisplay';
import CalculationSteps from './components/CalculationSteps';

export default function App() {
  // Language and UI preferences (persisted)
  const [language, setLanguage] = useLocalStorage("prepcalc-language", "en");
  const [showSteps, setShowSteps] = useLocalStorage("prepcalc-showSteps", false);
  const [volume, setVolume] = useState("");
  const [time, setTime] = useState("");
  const [dropFactor, setDropFactor] = useState("20");
  const [timeUnit, setTimeUnit] = useState("hours");

  // Mode selection
  const [mode, setMode] = useState("dose");

  // Dose calculator state
  const [vialStrength, setVialStrength] = useState("");
  const [vialUnit, setVialUnit] = useState("mg");
  const [vialVolume, setVialVolume] = useState("");
  const [desiredStrength, setDesiredStrength] = useState("");
  const [desiredUnit, setDesiredUnit] = useState("mg");

  // Dilution calculator state
  const [drugAmount, setDrugAmount] = useState("");
  const [drugUnit, setDrugUnit] = useState("mg");
  const [targetConcentration, setTargetConcentration] = useState("");
  const [targetConcUnit, setTargetConcUnit] = useState("mg");

  // Results state
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [calculationSteps, setCalculationSteps] = useState([]);

  const t = translations[language];

  // Reset all form fields
  const resetAll = () => {
    setVialStrength("");
    setVialUnit("mg");
    setVialVolume("");
    setDesiredStrength("");
    setDesiredUnit("mg");
    setDrugAmount("");
    setDrugUnit("mg");
    setTargetConcentration("");
    setTargetConcUnit("mg");
    setVolume("");
    setTime("");
    setDropFactor("20");
    setTimeUnit("hours");
    setResult(null);
    setError("");
    setCalculationSteps([]);
  };

  // Handle dose calculation
  const handleDoseCalculation = () => {
    setError("");
    setResult(null);
    setCalculationSteps([]);

    const vialS = Number(vialStrength);
    const vialV = Number(vialVolume);
    const desired = Number(desiredStrength);

    // Validation
    if (!isValidNumber(vialStrength) || !isValidNumber(vialVolume) || !isValidNumber(desiredStrength)) {
      setError(t.errorNumeric);
      return;
    }
    if (!isValidPositiveNumber(vialVolume)) {
      setError(t.errorVolume);
      return;
    }
    if (!isValidPositiveNumber(desiredStrength)) {
      setError(t.errorDose);
      return;
    }

    // Perform calculation
    const calculationResult = calculateDose({
      vialStrength: vialS,
      vialUnit,
      vialVolume: vialV,
      desiredStrength: desired,
      desiredUnit,
      translations: t,
      language
    });

    if (calculationResult.error) {
      setError(calculationResult.error);
    } else {
      setResult(calculationResult.result);
      setCalculationSteps(calculationResult.steps);
    }
  };

  // Handle dilution calculation
  const handleDilutionCalculation = () => {
    setError("");
    setResult(null);
    setCalculationSteps([]);

    const drug = Number(drugAmount);
    const targetConc = Number(targetConcentration);

    // Validation
    if (!isValidNumber(drugAmount) || !isValidNumber(targetConcentration)) {
      setError(t.errorNumeric);
      return;
    }
    if (!isValidPositiveNumber(drugAmount)) {
      setError(t.errorDrugAmount);
      return;
    }
    if (!isValidPositiveNumber(targetConcentration)) {
      setError(t.errorTargetConc);
      return;
    }

    // Perform calculation
    const calculationResult = calculateDilution({
      drugAmount: drug,
      drugUnit,
      targetConcentration: targetConc,
      targetConcUnit,
      translations: t,
      language
    });

    if (calculationResult.error) {
      setError(calculationResult.error);
    } else {
      setResult(calculationResult.result);
      setCalculationSteps(calculationResult.steps);
    }
  };

  // Handle drip rate calculation
  const handleDripRateCalculation = () => {
    setError("");
    setResult(null);
    setCalculationSteps([]);

    const vol = Number(volume);
    const timeValue = Number(time);
    const dropF = Number(dropFactor);

    // Validation
    if (!isValidNumber(volume) || !isValidNumber(time) || !isValidNumber(dropFactor)) {
      setError(t.errorNumeric);
      return;
    }
    if (!isValidPositiveNumber(volume)) {
      setError(t.errorVolume);
      return;
    }
    if (!isValidPositiveNumber(time)) {
      setError(t.errorInvalidResult);
      return;
    }
    if (!isValidPositiveNumber(dropFactor)) {
      setError(t.errorInvalidResult);
      return;
    }

    // Perform calculation
    const calculationResult = calculateDripRate({
      volume: vol,
      time: timeValue,
      timeUnit: timeUnit,
      dropFactor: dropF,
      translations: t
    });

    if (calculationResult.error) {
      setError(calculationResult.error);
    } else {
      setResult(calculationResult.result);
      setCalculationSteps(calculationResult.steps);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 p-6 text-white flex flex-col">
      <div className="max-w-6xl mx-auto flex-1">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <a href="https://www.pahtialabs.com" className="hover:opacity-80 transition">
              <PahtiaLogo size="lg" />
            </a>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xl font-light text-indigo-300">{t.appName}</p>
                <p className="text-sm text-gray-400">{t.appSubtitle}</p>
              </div>
              <LanguageSelector language={language} setLanguage={setLanguage} />
            </div>
          </div>
        </header>

        {/* Mode Selection */}
        <div className="mb-6 flex justify-center">
          <div className="bg-gray-800/90 p-1 rounded-xl inline-flex gap-1">
            <button
              onClick={() => { setMode("dose"); resetAll(); }}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                mode === "dose" 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {t.modeDose}
            </button>
            <button
              onClick={() => { setMode("dilution"); resetAll(); }}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                mode === "dilution" 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {t.modeDilution}
            </button>
            <button
              onClick={() => { setMode("dripRate"); resetAll(); }}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                mode === "dripRate" 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {t.modeDripRate}
            </button>
          </div>
        </div>

        {/* Info Banner for Dilution Mode */}
        {mode === "dilution" && (
          <InfoBanner 
            title={t.dilutionInfoTitle} 
            text={t.dilutionInfoText} 
          />
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <section className="bg-gray-800/90 p-6 rounded-2xl border border-gray-700 shadow-lg">
            {mode === "dose" && (
              <DoseCalculatorForm
                vialStrength={vialStrength}
                setVialStrength={setVialStrength}
                vialUnit={vialUnit}
                setVialUnit={setVialUnit}
                vialVolume={vialVolume}
                setVialVolume={setVialVolume}
                desiredStrength={desiredStrength}
                setDesiredStrength={setDesiredStrength}
                desiredUnit={desiredUnit}
                setDesiredUnit={setDesiredUnit}
                onCalculate={handleDoseCalculation}
                onReset={resetAll}
                translations={t}
              />
            )}

            {mode === "dilution" && (
              <DilutionCalculatorForm
                drugAmount={drugAmount}
                setDrugAmount={setDrugAmount}
                drugUnit={drugUnit}
                setDrugUnit={setDrugUnit}
                targetConcentration={targetConcentration}
                setTargetConcentration={setTargetConcentration}
                targetConcUnit={targetConcUnit}
                setTargetConcUnit={setTargetConcUnit}
                onCalculate={handleDilutionCalculation}
                onReset={resetAll}
                translations={t}
              />
            )}

            {mode === "dripRate" && (
              <DripRateCalculatorForm
                volume={volume}
                setVolume={setVolume}
                time={time}
                setTime={setTime}
                timeUnit={timeUnit}
                setTimeUnit={setTimeUnit}
                dropFactor={dropFactor}
                setDropFactor={setDropFactor}
                onCalculate={handleDripRateCalculation}
                onReset={resetAll}
                translations={t}
              />
            )}
          </section>

          <aside className="bg-gray-800/95 border border-indigo-700 rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center">
            <div className="w-full flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-200">{t.result}</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSteps}
                  onChange={(e) => setShowSteps(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-300">{t.showSteps}</span>
              </label>
            </div>

            <ResultDisplay
              result={result}
              error={error}
              translations={t}
            />

            {showSteps && (
              <CalculationSteps
                steps={calculationSteps}
                title={t.stepByStep}
              />
            )}
          </aside>
        </div>
      </div>

      <footer className="mt-10 py-4 text-center text-xs text-gray-500 opacity-70">
        <p>{t.footerDisclaimer}</p>
        <p>© {new Date().getFullYear()} {t.footerCopyright}</p>
      </footer>
    </div>
  );
}

