import { useState } from "react";

export default function App() {
  const [drugName, setDrugName] = useState("");
  const [vialStrength, setVialStrength] = useState("");
  const [vialUnit, setVialUnit] = useState("mg");
  const [desiredConcentration, setDesiredConcentration] = useState("");
  const [desiredUnit, setDesiredUnit] = useState("mg");
  const [bagVolume, setBagVolume] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    let vial = parseFloat(vialStrength);
    if (vialUnit === "g") vial *= 1000;
    if (vialUnit === "mcg") vial /= 1000;

    const desired = parseFloat(desiredConcentration);
    const bag = parseFloat(bagVolume);

    if (!vial || !desired || !bag) {
      setError("Please enter valid numeric values in all fields.");
      return;
    }

    if (desired * bag > vial) {
      setError("Impossible scenario: not enough drug in the vial to reach that concentration.");
      return;
    }

    const mgNeeded = desired * bag;
    const vialsNeeded = mgNeeded / vial;
    const mlToAdd = mgNeeded / (vial / 1);

    setResult({
      mgNeeded,
      vialsNeeded,
      mlToAdd,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Centered card wrapper */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            PrepCalc 💧
          </h1>

          {/* FORM */}
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Drug Name</label>
              <input
                type="text"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Cefepime"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Vial Strength
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="any"
                  value={vialStrength}
                  onChange={(e) => setVialStrength(e.target.value)}
                  className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter value"
                />
                <select
                  value={vialUnit}
                  onChange={(e) => setVialUnit(e.target.value)}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="mcg">mcg</option>
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Desired Concentration
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="any"
                  value={desiredConcentration}
                  onChange={(e) => setDesiredConcentration(e.target.value)}
                  className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter value"
                />
                <select
                  value={desiredUnit}
                  onChange={(e) => setDesiredUnit(e.target.value)}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="mcg">mcg</option>
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                </select>
                <span className="self-center text-gray-600">/mL</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Bag Volume (mL)
              </label>
              <input
                type="number"
                step="any"
                value={bagVolume}
                onChange={(e) => setBagVolume(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Calculate
            </button>
          </form>

          {/* ERROR */}
          {error && (
            <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg text-center">
              ⚠️ {error}
            </div>
          )}

          {/* RESULTS */}
          {result && (
            <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-lg space-y-2">
              <p className="font-medium">
                💊 Add <strong>{result.mlToAdd.toFixed(2)} mL</strong>
                {drugName ? ` of ${drugName}` : ""} ({vialStrength}{vialUnit}/mL)
                to the bag to provide <strong>{result.mgNeeded.toFixed(2)} {vialUnit}</strong> total.
              </p>
              <p className="text-sm text-gray-700">
                Vials required: {result.vialsNeeded.toFixed(2)}
              </p>
            </div>
          )}

        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-4 text-center text-xs text-gray-500 opacity-70">
        © {new Date().getFullYear()} PrepCalc — All rights reserved.
      </footer>

    </div>
  );
}











