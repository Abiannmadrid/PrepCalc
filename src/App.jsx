import { useState } from "react";
/* ---------- Tooltip ---------- */
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
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setVisible((v) => !v);
      }}
      aria-haspopup="true"
      aria-expanded={visible}
    >
      <svg className="cursor-pointer text-gray-400 hover:text-indigo-400 transition w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <div
            className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 border-l border-t border-gray-600 rotate-45"
            style={{ backgroundColor: "rgba(30,30,35,0.95)" }}
          />
        </div>
      )}
    </div>
  );
}

/* ---------- Reusable Input Row ---------- */
function InputRow({ label, value, onChange, children, invalid, tooltip }) {
  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 mb-1 text-sm text-gray-300 font-medium">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="flex gap-3 items-center">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 rounded-xl p-3 bg-gray-900 text-white border ${
            invalid
              ? "border-red-600 ring-red-300"
              : "border-gray-600 focus:ring-indigo-400"
          } focus:outline-none focus:ring-2`}
          placeholder="Enter value"
        />
        {children}
      </div>
    </div>
  );
}

/* ---------- MAIN APP ---------- */
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

  /* ---------- RESET ---------- */
  const resetAll = () => {
    setVialStrength("");
    setVialUnit("mg");
    setVialVolume("");
    setDesiredStrength("");
    setDesiredUnit("mg");
    setResult(null);
    setError("");
  };

  /* ---------- CORE CALCULATION ---------- */
  const calculateVolume = () => {
    setError("");
    setResult(null);

    const vialS = Number(vialStrength);
    const vialV = Number(vialVolume);
    const desired = Number(desiredStrength);

    if (!vialS || !vialV || !desired) {
      setError("Please enter valid numeric values.");
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

    if (
      !(
        (vialIsMass && desiredIsMass) ||
        (vialIsElectro && desiredIsElectro)
      )
    ) {
      setError("Unit mismatch — mass must match mass, mmol/mEq must match mmol/mEq.");
      return;
    }

    // Normalize units
    let vialBase = vialS;
    let desiredBase = desired;

    if (vialIsMass && desiredIsMass) {
      if (vialUnit === "g") vialBase *= 1000;
      if (vialUnit === "mcg") vialBase /= 1000;

      if (desiredUnit === "g") desiredBase *= 1000;
      if (desiredUnit === "mcg") desiredBase /= 1000;
    }

    const concentration = vialBase / vialV;
    if (concentration <= 0 || !isFinite(concentration)) {
      setError("Invalid concentration — check inputs.");
      return;
    }

    const volume = desiredBase / concentration;
    if (volume <= 0 || !isFinite(volume)) {
      setError("Invalid result — please recheck values.");
      return;
    }

    if (desiredBase > vialBase) {
      setError("Desired dose exceeds total in vial.");
      return;
    }

    const rounded = Math.round(volume * 10) / 10;
    setResult({ volume: rounded, unit: "mL" });
  };

  const vialStrengthInvalid = vialStrength && isNaN(Number(vialStrength));
  const vialVolumeInvalid =
    vialVolume && (isNaN(Number(vialVolume)) || Number(vialVolume) <= 0);
  const desiredStrengthInvalid =
    desiredStrength && isNaN(Number(desiredStrength));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 p-6 text-white flex flex-col">
      <div className="max-w-6xl mx-auto flex-1">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="text-indigo-400 w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 8.5l-2-2.5-4 4-4-4-4 4-2-2v10l2 2h16l2-2v-10zm-5 7.5h-8v-2h8v2zm0-4h-8v-2h8v2z"/>
                <path d="M14 2l-1 2h-2l-1-2h-2v4h8V2h-2z"/>
              </svg>
              <h1 className="text-4xl font-extrabold text-indigo-300">PrepCalc</h1>
            </div>
            <p className="text-sm text-gray-400">IV Dosing Calculator</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* LEFT: INPUTS */}
          <section className="bg-gray-800/90 p-6 rounded-2xl border border-gray-700 shadow-lg">

            <InputRow
              label="Vial Strength"
              value={vialStrength}
              onChange={setVialStrength}
              invalid={vialStrengthInvalid}
              tooltip="Total amount of drug in the vial (e.g., 50 mg)"
            >
              <select
                value={vialUnit}
                onChange={(e) => setVialUnit(e.target.value)}
                className="p-3 rounded-xl bg-gray-900 border border-gray-600 text-white"
              >
                {unitOptions.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </InputRow>

            <InputRow
              label="Reference Volume (mL)"
              value={vialVolume}
              onChange={setVialVolume}
              invalid={vialVolumeInvalid}
              tooltip="Total volume in the vial (e.g., 10 mL)"
            />

            <InputRow
              label="Desired Dose"
              value={desiredStrength}
              onChange={setDesiredStrength}
              invalid={desiredStrengthInvalid}
              tooltip="Amount you need to prepare (e.g., 25 mg)"
            >
              <select
                value={desiredUnit}
                onChange={(e) => setDesiredUnit(e.target.value)}
                className="p-3 rounded-xl bg-gray-900 border border-gray-600 text-white"
              >
                {unitOptions.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </InputRow>

            <div className="flex gap-3 mt-6">
              <button
                onClick={calculateVolume}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-medium"
              >
                Calculate
              </button>
              <button
                onClick={resetAll}
                className="flex items-center justify-center w-14 bg-gray-700 hover:bg-gray-600 text-white rounded-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </section>

          {/* RIGHT: RESULT */}
          <aside className="bg-gray-800/95 border border-indigo-700 rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Result</h3>

            {error ? (
              <div className="bg-red-900 border border-red-600 rounded-lg p-4 w-full text-center">
                <p className="text-red-400 font-medium">{error}</p>
              </div>
            ) : result ? (
              <div
                className="w-full text-center p-6 rounded-2xl border border-indigo-600"
                style={{ background: "linear-gradient(145deg, #1f1f23, #2e2e41)" }}
              >
                <p className="text-sm text-gray-400">Volume to draw</p>
                <p className="text-3xl font-extrabold text-indigo-400 mt-2">
                  {result.volume} {result.unit}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Rounded to nearest 0.1 mL
                </p>
              </div>
            ) : (
              <p className="text-gray-400">Enter inputs and press Calculate</p>
            )}
          </aside>
        </div>
      </div>

      <footer className="mt-10 py-4 text-center text-xs text-gray-500 opacity-70">
        <p>Non-clinical demo — verify calculations before clinical use.</p>
        <p>© {new Date().getFullYear()} PrepCalc — All rights reserved.</p>
      </footer>
    </div>
  );
}


























