import { useState } from "react";
import { FiInfo, FiDroplet, FiTrash2 } from "react-icons/fi";

/* ---------- Tooltip component (solid white box, hover/click) ---------- */
function Tooltip({ text }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => setVisible(!visible)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setVisible(v => !v); }}
      aria-haspopup="true"
      aria-expanded={visible}
    >
      <FiInfo
        className="cursor-pointer text-gray-400 hover:text-blue-600 transition"
        aria-label="More info"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setVisible((v) => !v);
        }}
      />

      {visible && (
        <div
          className="absolute z-[9999] top-full left-1/2 transform -translate-x-1/2 mt-3"
          style={{ pointerEvents: "auto" }}
        >
          {/* solid white tooltip box */}
          <div
            className="text-black text-base font-medium rounded-xl shadow-2xl border border-gray-300 px-5 py-4 text-center max-w-xs sm:max-w-sm md:max-w-md break-words"
            style={{
              backgroundColor: "#ffffff", // solid white
              opacity: 1,
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
              color: "#000000", // ensure black text
            }}
          >
            {text}
          </div>

          {/* small triangle pointer */}
          <div
            className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 border-l border-t border-gray-300 rotate-45"
            style={{ backgroundColor: "#ffffff" }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [vialStrength, setVialStrength] = useState("");
  const [vialUnit, setVialUnit] = useState("mg");
  const [vialVolume, setVialVolume] = useState("");
  const [desiredStrength, setDesiredStrength] = useState("");
  const [desiredUnit, setDesiredUnit] = useState("mg");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const unitOptions = ["mg", "mcg", "g", "mmol", "meq", "mL"];
  const massUnits = new Set(["mg", "g", "mcg"]);
  const electrolyteUnits = new Set(["mmol", "meq"]);

  const resetAll = () => {
    setVialStrength("");
    setVialUnit("mg");
    setVialVolume("");
    setDesiredStrength("");
    setDesiredUnit("mg");
    setResult(null);
    setError("");
  };

  const calculateVolume = () => {
    setError("");
    setResult(null);

    const vialS = parseFloat(vialStrength);
    const vialV = parseFloat(vialVolume);
    const desired = parseFloat(desiredStrength);

    if (!isFinite(vialS) || !isFinite(vialV) || !isFinite(desired)) {
      setError("Please enter valid numeric values for strength and reference volume.");
      return;
    }
    if (vialV <= 0) {
      setError("Reference volume must be greater than zero.");
      return;
    }
    if (desired <= 0) {
      setError("Desired dose must be greater than zero.");
      return;
    }

    // Ensure units are compatible
    const vialIsMass = massUnits.has(vialUnit);
    const desiredIsMass = massUnits.has(desiredUnit);
    const vialIsElectro = electrolyteUnits.has(vialUnit);
    const desiredIsElectro = electrolyteUnits.has(desiredUnit);

    if (!( (vialIsMass && desiredIsMass) || (vialIsElectro && desiredIsElectro) )) {
      setError("Unit mismatch — use mass units with mass (mg/g/mcg) or mmol/mEq with mmol/mEq.");
      return;
    }

    // Convert to base units for calculation
    let vialInBase = vialS;
    let desiredInBase = desired;
    let baseLabel = desiredUnit;

    if (vialIsMass && desiredIsMass) {
      if (vialUnit === "g") vialInBase *= 1000;
      if (vialUnit === "mcg") vialInBase /= 1000;
      if (desiredUnit === "g") desiredInBase *= 1000;
      if (desiredUnit === "mcg") desiredInBase /= 1000;
      baseLabel = "mg";
    } else {
      baseLabel = desiredUnit; // mmol or meq
    }

    const concentration = vialInBase / vialV; // base units per mL
    if (!isFinite(concentration) || concentration <= 0) {
      setError("Calculated concentration is invalid — check vial strength and reference volume.");
      return;
    }

    const volumeToDraw = desiredInBase / concentration;
    if (!isFinite(volumeToDraw) || volumeToDraw <= 0) {
      setError("Invalid calculation — please check your entries.");
      return;
    }

    const totalInVial = vialInBase;
    if (desiredInBase > totalInVial) {
      setError(
        `Impossible with a single vial: desired ${desiredInBase} ${baseLabel} > vial contains ${totalInVial} ${baseLabel}.`
      );
      return;
    }

    // round to nearest tenth
    const rounded = Math.round(volumeToDraw * 10) / 10;
    setResult({ volume: rounded, unit: "mL" });
  };

  // input invalid flags
  const vialStrengthInvalid = vialStrength !== "" && isNaN(Number(vialStrength));
  const vialVolumeInvalid = vialVolume !== "" && (isNaN(Number(vialVolume)) || Number(vialVolume) <= 0);
  const desiredStrengthInvalid = desiredStrength !== "" && isNaN(Number(desiredStrength));

  const inputClass = (invalid) =>
    `w-full rounded-xl p-3 transition focus:outline-none focus:ring-2 ${
      invalid ? "border-red-400 ring-red-200" : "border-gray-200 ring-indigo-200"
    } border`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-indigo-100 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-indigo-700 flex items-center gap-3">
                <span className="inline-block w-10 h-10 bg-gradient-to-br from-indigo-300 to-indigo-500 rounded-xl shadow-md flex items-center justify-center text-white">
                  💧
                </span>
                PrepCalc
              </h1>
              <p className="text-sm text-gray-600 mt-1">dosing calculator</p>
            </div>
          </div>
        </header>

        {/* Two-column responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* LEFT: Inputs card */}
          <section className="bg-white/90 backdrop-blur-sm border border-indigo-50 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Inputs</h2>

            {/* Vial strength */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                <FiDroplet className="text-indigo-500" />
                <span>Vial Strength</span>
                <Tooltip text="Strength listed on the vial (the amount of active in the reference volume), e.g. 125 mg" />
              </label>
              <div className="flex gap-3 mt-2">
                <input
                  className={inputClass(vialStrengthInvalid)}
                  type="number"
                  step="any"
                  placeholder="e.g. 125"
                  value={vialStrength}
                  onChange={(e) => setVialStrength(e.target.value)}
                  aria-invalid={vialStrengthInvalid}
                />
                <select
                  className="rounded-xl p-3 border border-gray-200 focus:outline-none"
                  value={vialUnit}
                  onChange={(e) => setVialUnit(e.target.value)}
                >
                  {unitOptions.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
              {vialStrengthInvalid && <p className="text-red-600 text-sm mt-2">Enter a valid number.</p>}
            </div>

            {/* Vial reference volume */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                Vial Reference Volume (mL per)
                <Tooltip text="How many mL the vial strength applies to, e.g. 2 for '125 mg / 2 mL'." />
              </label>
              <input
                className={inputClass(vialVolumeInvalid)}
                type="number"
                step="any"
                placeholder="e.g. 2"
                value={vialVolume}
                onChange={(e) => setVialVolume(e.target.value)}
                aria-invalid={vialVolumeInvalid}
              />
              {vialVolumeInvalid && <p className="text-red-600 text-sm mt-2">Enter a positive number.</p>}
            </div>

            {/* Desired dose */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                Desired Dose
                <Tooltip text="Total amount you want in the bag (e.g. 50 mg or 6 mmol)." />
              </label>
              <div className="flex gap-3 mt-2">
                <input
                  className={inputClass(desiredStrengthInvalid)}
                  type="number"
                  step="any"
                  placeholder="e.g. 50"
                  value={desiredStrength}
                  onChange={(e) => setDesiredStrength(e.target.value)}
                  aria-invalid={desiredStrengthInvalid}
                />
                <select
                  className="rounded-xl p-3 border border-gray-200 focus:outline-none"
                  value={desiredUnit}
                  onChange={(e) => setDesiredUnit(e.target.value)}
                >
                  {unitOptions.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
              {desiredStrengthInvalid && <p className="text-red-600 text-sm mt-2">Enter a valid number.</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={calculateVolume}
                className="flex-1 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:from-indigo-600 hover:to-indigo-700 transition"
                aria-label="Calculate volume"
              >
                Calculate
              </button>

              <button
                onClick={resetAll}
                className="flex-none bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 flex items-center gap-2"
                aria-label="Reset form"
                title="Reset all fields"
              >
                <FiTrash2 /> Reset
              </button>
            </div>
          </section>

          {/* RIGHT: Result card */}
          <aside className="bg-white/95 border border-indigo-50 rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Result</h3>

            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full text-center">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            ) : result ? (
              <div className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-lg p-6 w-full text-center">
                <p className="text-sm text-gray-600">Volume to draw</p>
                <p className="text-3xl font-extrabold text-indigo-700 mt-2">
                  {result.volume} {result.unit}
                </p>
                <p className="text-xs text-gray-500 mt-2">Rounded to nearest 0.1 mL</p>
              </div>
            ) : (
              <div className="text-center text-gray-500">Enter inputs and press Calculate</div>
            )}
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-xs text-gray-500 text-center">
          Non-clinical demo — verify calculations before clinical use.
        </footer>
      </div>
    </div>
  );
}


























