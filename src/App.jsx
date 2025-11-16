import { useState } from "react";
import { FiInfo, FiDroplet, FiTrash2 } from "react-icons/fi";
import { FaSyringe } from "react-icons/fa";

/* ---------- Tooltip component (hybrid dark mode) ---------- */
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
        className="cursor-pointer text-gray-400 hover:text-indigo-400 transition"
        aria-label="More info"
      />

      {visible && (
        <div className="absolute z-[9999] top-full left-1/2 transform -translate-x-1/2 mt-3 pointer-events-auto">
          {/* hybrid tooltip box */}
          <div
            className="text-white text-sm font-medium rounded-xl shadow-2xl border border-gray-600 px-6 py-4 text-center max-w-xs break-words"
            style={{
              backgroundColor: "rgba(30, 30, 35, 0.95)", // dark semi-transparent
              color: "#ffffff",
            }}
          >
            {text}
          </div>

          {/* small triangle pointer */}
          <div
            className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 border-l border-t border-gray-600 rotate-45"
            style={{ backgroundColor: "rgba(30, 30, 35, 0.95)" }}
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

    const vialIsMass = massUnits.has(vialUnit);
    const desiredIsMass = massUnits.has(desiredUnit);
    const vialIsElectro = electrolyteUnits.has(vialUnit);
    const desiredIsElectro = electrolyteUnits.has(desiredUnit);

    if (!( (vialIsMass && desiredIsMass) || (vialIsElectro && desiredIsElectro) )) {
      setError("Unit mismatch — use mass units with mass or mmol/mEq with mmol/mEq.");
      return;
    }

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
      baseLabel = desiredUnit;
    }

    const concentration = vialInBase / vialV;
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

    const rounded = Math.round(volumeToDraw * 10) / 10;
    setResult({ volume: rounded, unit: "mL" });
  };

  const vialStrengthInvalid = vialStrength !== "" && isNaN(Number(vialStrength));
  const vialVolumeInvalid = vialVolume !== "" && (isNaN(Number(vialVolume)) || Number(vialVolume) <= 0);
  const desiredStrengthInvalid = desiredStrength !== "" && isNaN(Number(desiredStrength));

  const inputClass = (invalid) =>
    `w-full rounded-xl p-3 transition focus:outline-none focus:ring-2 ${
      invalid ? "border-red-600 ring-red-300" : "border-gray-600 ring-indigo-400"
    } border bg-gray-900 text-white`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 p-6 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FaSyringe className="text-indigo-400 w-10 h-10" />
              <h1 className="text-4xl font-extrabold text-indigo-300">PrepCalc</h1>
            </div>
            <p className="text-sm text-gray-400 mt-1">Dosing calculator</p>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Inputs */}
          <section className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Inputs</h2>

            <div className="mb-4">
              <label className="flex items-center gap-2 text-gray-200 font-medium mb-1">
                <FiDroplet className="text-indigo-400" /> Vial Strength
                <Tooltip text="Strength listed on the vial (e.g., 125 mg)" />
              </label>
              <div className="flex gap-3 mt-2">
                <input
                  className={inputClass(vialStrengthInvalid)}
                  type="number"
                  step="any"
                  placeholder="e.g. 125"
                  value={vialStrength}
                  onChange={(e) => setVialStrength(e.target.value)}
                />
                <select
                  className="rounded-xl p-3 border border-gray-600 bg-gray-900 text-white focus:outline-none"
                  value={vialUnit}
                  onChange={(e) => setVialUnit(e.target.value)}
                >
                  {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              {vialStrengthInvalid && <p className="text-red-500 text-sm mt-2">Enter a valid number.</p>}
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 text-gray-200 font-medium mb-1">
                Vial Reference Volume (mL per)
                <Tooltip text="How many mL the vial strength applies to, e.g. 2 for 125 mg / 2 mL" />
              </label>
              <input
                className={inputClass(vialVolumeInvalid)}
                type="number"
                step="any"
                placeholder="e.g. 2"
                value={vialVolume}
                onChange={(e) => setVialVolume(e.target.value)}
              />
              {vialVolumeInvalid && <p className="text-red-500 text-sm mt-2">Enter a positive number.</p>}
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 text-gray-200 font-medium mb-1">
                Desired Dose
                <Tooltip text="Total amount you want in the bag (e.g. 50 mg or 6 mmol)" />
              </label>
              <div className="flex gap-3 mt-2">
                <input
                  className={inputClass(desiredStrengthInvalid)}
                  type="number"
                  step="any"
                  placeholder="e.g. 50"
                  value={desiredStrength}
                  onChange={(e) => setDesiredStrength(e.target.value)}
                />
                <select
                  className="rounded-xl p-3 border border-gray-600 bg-gray-900 text-white focus:outline-none"
                  value={desiredUnit}
                  onChange={(e) => setDesiredUnit(e.target.value)}
                >
                  {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              {desiredStrengthInvalid && <p className="text-red-500 text-sm mt-2">Enter a valid number.</p>}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={calculateVolume}
                className="flex-1 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition"
              >
                Calculate
              </button>
              <button
                onClick={resetAll}
                className="flex-none bg-gray-900 border border-gray-600 text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-800 flex items-center gap-2"
              >
                <FiTrash2 /> Reset
              </button>
            </div>
          </section>

          {/* Result */}
          <aside className="bg-gray-800/95 border border-indigo-700 rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Result</h3>

            {error ? (
              <div className="bg-red-900 border border-red-600 rounded-lg p-4 w-full text-center">
                <p className="text-red-400 font-medium">{error}</p>
              </div>
            ) : result ? (
              <div className="w-full text-center p-6 rounded-2xl border border-indigo-600"
              style={{ background: "linear-gradient(145deg, #1f1f23, #2e2e41)" }}>
                <p className="text-sm text-gray-400">Volume to draw</p>
                <p className="text-3xl font-extrabold text-indigo-400 mt-2">
                  {result.volume} {result.unit}
                </p>
                <p className="text-xs text-gray-500 mt-2">Rounded to nearest 0.1 mL</p>
              </div>
            ) : (
              <div className="text-center text-gray-400">Enter inputs and press Calculate</div>
            )}
          </aside>
        </div>

        <footer className="mt-6 text-xs text-gray-500 text-center">
          Non-clinical demo — verify calculations before clinical use.
        </footer>
      </div>
    </div>
  );
}



























