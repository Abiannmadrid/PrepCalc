import { useState, useEffect } from "react";

const translations = {
  en: {
    appName: "PrepCalc",
    appSubtitle: "IV Dosing Calculator",
    modeDose: "Calculate Dose",
    modeDilution: "Calculate Dilution",
    dilutionInfoTitle: "How to Use Dilution Calculator",
    dilutionInfoText: "This calculates the total volume needed to achieve your target concentration. For example, if you have 125 mg of drug and want a final concentration of 5 mg/mL, the calculator will tell you the total volume to dilute to (25 mL). Subtract any volume the drug already occupies to determine how much diluent (sterile water, saline, etc.) to add.",
    vialStrength: "Vial Strength",
    referenceVolume: "Reference Volume (mL)",
    desiredDose: "Desired Dose",
    drugAmount: "Drug Amount",
    targetConcentration: "Target Concentration (per mL)",
    tooltipVialStrength: "Total amount of drug in the vial (e.g., 50 mg)",
    tooltipReferenceVolume: "Total volume in the vial (e.g., 10 mL)",
    tooltipDesiredDose: "Amount you need to prepare (e.g., 25 mg)",
    tooltipDrugAmount: "Total amount of drug you have (e.g., 125 mg)",
    tooltipTargetConc: "Desired final concentration per mL (e.g., 5 mcg/mL)",
    calculate: "Calculate",
    result: "Result",
    volumeToDraw: "Volume to draw",
    totalVolumeNeeded: "Total volume needed",
    youWillNeed: "You will need:",
    vials: "vials",
    drawFromEach: "Draw from each vial:",
    totalVolume: "Total volume:",
    roundedText: "Rounded to nearest 0.01 mL",
    dilutionNote: "Add diluent to reach this total volume",
    enterInputs: "Enter inputs and press Calculate",
    errorNumeric: "Please enter valid numeric values.",
    errorVolume: "Reference volume must be greater than zero.",
    errorDose: "Desired dose must be greater than zero.",
    errorDrugAmount: "Drug amount must be greater than zero.",
    errorTargetConc: "Target concentration must be greater than zero.",
    errorUnitMismatch: "Unit mismatch — mass must match mass, mmol/mEq must match mmol/mEq.",
    errorConcentration: "Invalid concentration — check inputs.",
    errorInvalidResult: "Invalid result — please recheck values.",
    footerDisclaimer: "Non-clinical demo — verify calculations before clinical use.",
    footerCopyright: "Pahtia Labs — All rights reserved.",
    placeholder: "Enter value"
  },
  es: {
    appName: "PrepCalc",
    appSubtitle: "Calculadora de Dosificación IV",
    modeDose: "Calcular Dosis",
    modeDilution: "Calcular Dilución",
    dilutionInfoTitle: "Cómo Usar la Calculadora de Dilución",
    dilutionInfoText: "Esto calcula el volumen total necesario para lograr su concentración objetivo. Por ejemplo, si tiene 125 mg de medicamento y desea una concentración final de 5 mg/mL, la calculadora le indicará el volumen total al que debe diluir (25 mL). Reste cualquier volumen que el medicamento ya ocupe para determinar cuánto diluyente (agua estéril, solución salina, etc.) agregar.",
    vialStrength: "Concentración del Vial",
    referenceVolume: "Volumen de Referencia (mL)",
    desiredDose: "Dosis Deseada",
    drugAmount: "Cantidad de Medicamento",
    targetConcentration: "Concentración Objetivo (por mL)",
    tooltipVialStrength: "Cantidad total de medicamento en el vial (ej., 50 mg)",
    tooltipReferenceVolume: "Volumen total en el vial (ej., 10 mL)",
    tooltipDesiredDose: "Cantidad que necesita preparar (ej., 25 mg)",
    tooltipDrugAmount: "Cantidad total de medicamento que tiene (ej., 125 mg)",
    tooltipTargetConc: "Concentración final deseada por mL (ej., 5 mcg/mL)",
    calculate: "Calcular",
    result: "Resultado",
    volumeToDraw: "Volumen a extraer",
    totalVolumeNeeded: "Volumen total necesario",
    youWillNeed: "Necesitará:",
    vials: "viales",
    drawFromEach: "Extraer de cada vial:",
    totalVolume: "Volumen total:",
    roundedText: "Redondeado al 0.01 mL más cercano",
    dilutionNote: "Agregue diluyente para alcanzar este volumen total",
    enterInputs: "Ingrese los valores y presione Calcular",
    errorNumeric: "Por favor ingrese valores numéricos válidos.",
    errorVolume: "El volumen de referencia debe ser mayor que cero.",
    errorDose: "La dosis deseada debe ser mayor que cero.",
    errorDrugAmount: "La cantidad de medicamento debe ser mayor que cero.",
    errorTargetConc: "La concentración objetivo debe ser mayor que cero.",
    errorUnitMismatch: "Discrepancia de unidades — masa debe coincidir con masa, mmol/mEq debe coincidir con mmol/mEq.",
    errorConcentration: "Concentración inválida — verifique los valores.",
    errorInvalidResult: "Resultado inválido — por favor revise los valores.",
    footerDisclaimer: "Demo no clínica — verifique los cálculos antes del uso clínico.",
    footerCopyright: "Pahtia Labs — Todos los derechos reservados.",
    placeholder: "Ingresar valor"
  },
  fr: {
    appName: "PrepCalc",
    appSubtitle: "Calculateur de Dosage IV",
    modeDose: "Calculer la Dose",
    modeDilution: "Calculer la Dilution",
    dilutionInfoTitle: "Comment Utiliser le Calculateur de Dilution",
    dilutionInfoText: "Ceci calcule le volume total nécessaire pour atteindre votre concentration cible. Par exemple, si vous avez 125 mg de médicament et souhaitez une concentration finale de 5 mg/mL, le calculateur vous indiquera le volume total à diluer (25 mL). Soustrayez tout volume que le médicament occupe déjà pour déterminer la quantité de diluant (eau stérile, solution saline, etc.) à ajouter.",
    vialStrength: "Concentration du Flacon",
    referenceVolume: "Volume de Référence (mL)",
    desiredDose: "Dose Souhaitée",
    drugAmount: "Quantité de Médicament",
    targetConcentration: "Concentration Cible (par mL)",
    tooltipVialStrength: "Quantité totale de médicament dans le flacon (ex., 50 mg)",
    tooltipReferenceVolume: "Volume total dans le flacon (ex., 10 mL)",
    tooltipDesiredDose: "Quantité que vous devez préparer (ex., 25 mg)",
    tooltipDrugAmount: "Quantité totale de médicament que vous avez (ex., 125 mg)",
    tooltipTargetConc: "Concentration finale souhaitée par mL (ex., 5 mcg/mL)",
    calculate: "Calculer",
    result: "Résultat",
    volumeToDraw: "Volume à prélever",
    totalVolumeNeeded: "Volume total nécessaire",
    youWillNeed: "Vous aurez besoin de:",
    vials: "flacons",
    drawFromEach: "Prélever de chaque flacon:",
    totalVolume: "Volume total:",
    roundedText: "Arrondi au 0,01 mL le plus proche",
    dilutionNote: "Ajouter du diluant pour atteindre ce volume total",
    enterInputs: "Entrez les valeurs et appuyez sur Calculer",
    errorNumeric: "Veuillez entrer des valeurs numériques valides.",
    errorVolume: "Le volume de référence doit être supérieur à zéro.",
    errorDose: "La dose souhaitée doit être supérieure à zéro.",
    errorDrugAmount: "La quantité de médicament doit être supérieure à zéro.",
    errorTargetConc: "La concentration cible doit être supérieure à zéro.",
    errorUnitMismatch: "Incompatibilité d'unités — la masse doit correspondre à la masse, mmol/mEq doit correspondre à mmol/mEq.",
    errorConcentration: "Concentration invalide — vérifiez les valeurs.",
    errorInvalidResult: "Résultat invalide — veuillez revérifier les valeurs.",
    footerDisclaimer: "Démo non clinique — vérifiez les calculs avant utilisation clinique.",
    footerCopyright: "Pahtia Labs — Tous droits réservés.",
    placeholder: "Entrer une valeur"
  },
  pt: {
    appName: "PrepCalc",
    appSubtitle: "Calculadora de Dosagem IV",
    modeDose: "Calcular Dose",
    modeDilution: "Calcular Diluição",
    dilutionInfoTitle: "Como Usar a Calculadora de Diluição",
    dilutionInfoText: "Isto calcula o volume total necessário para atingir sua concentração alvo. Por exemplo, se você tem 125 mg de medicamento e deseja uma concentração final de 5 mg/mL, a calculadora indicará o volume total para diluir (25 mL). Subtraia qualquer volume que o medicamento já ocupa para determinar quanto diluente (água estéril, solução salina, etc.) adicionar.",
    vialStrength: "Concentração do Frasco",
    referenceVolume: "Volume de Referência (mL)",
    desiredDose: "Dose Desejada",
    drugAmount: "Quantidade de Medicamento",
    targetConcentration: "Concentração Alvo (por mL)",
    tooltipVialStrength: "Quantidade total de medicamento no frasco (ex., 50 mg)",
    tooltipReferenceVolume: "Volume total no frasco (ex., 10 mL)",
    tooltipDesiredDose: "Quantidade que você precisa preparar (ex., 25 mg)",
    tooltipDrugAmount: "Quantidade total de medicamento que você tem (ex., 125 mg)",
    tooltipTargetConc: "Concentração final desejada por mL (ex., 5 mcg/mL)",
    calculate: "Calcular",
    result: "Resultado",
    volumeToDraw: "Volume a aspirar",
    totalVolumeNeeded: "Volume total necessário",
    youWillNeed: "Você precisará de:",
    vials: "frascos",
    drawFromEach: "Aspirar de cada frasco:",
    totalVolume: "Volume total:",
    roundedText: "Arredondado para o 0,01 mL mais próximo",
    dilutionNote: "Adicione diluente para atingir este volume total",
    enterInputs: "Insira os valores e pressione Calcular",
    errorNumeric: "Por favor, insira valores numéricos válidos.",
    errorVolume: "O volume de referência deve ser maior que zero.",
    errorDose: "A dose desejada deve ser maior que zero.",
    errorDrugAmount: "A quantidade de medicamento deve ser maior que zero.",
    errorTargetConc: "A concentração alvo deve ser maior que zero.",
    errorUnitMismatch: "Incompatibilidade de unidades — massa deve corresponder a massa, mmol/mEq deve corresponder a mmol/mEq.",
    errorConcentration: "Concentração inválida — verifique os valores.",
    errorInvalidResult: "Resultado inválido — por favor, verifique os valores.",
    footerDisclaimer: "Demo não clínica — verifique os cálculos antes do uso clínico.",
    footerCopyright: "Pahtia Labs — Todos os direitos reservados.",
    placeholder: "Inserir valor"
  }
};

function PahtiaLogo({ size = "md" }) {
  const sizes = { sm: { hex: 20, text: 16 }, md: { hex: 30, text: 24 }, lg: { hex: 40, text: 32 } };
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
        <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" fill="none" stroke="url(#hexGrad)" strokeWidth="3"/>
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
        <span style={{fontSize: s.text}} className="font-light text-indigo-200 tracking-wide">Pahtia</span>
        <span style={{fontSize: s.text * 0.75}} className="font-semibold text-indigo-400 tracking-widest">LABS</span>
      </div>
    </div>
  );
}

function LanguageSelector({ language, setLanguage }) {
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-800 border border-gray-600 text-white px-3 py-1.5 rounded-lg text-sm">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
      <option value="pt">Português</option>
    </select>
  );
}

function Tooltip({ text }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <svg className="cursor-pointer text-gray-400 hover:text-indigo-400 transition w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
        <path strokeWidth="2" d="M12 16v-4m0-4h.01"/>
      </svg>
      {visible && (
        <div className="absolute z-[9999] top-full left-1/2 transform -translate-x-1/2 mt-3">
          <div className="text-white text-sm font-medium rounded-xl shadow-2xl border border-gray-600 px-6 py-4 text-center max-w-xs" style={{ backgroundColor: "rgba(30,30,35,0.95)" }}>
            {text}
          </div>
        </div>
      )}
    </div>
  );
}

function InputRow({ label, value, onChange, children, invalid, tooltip, placeholder }) {
  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 mb-1 text-sm text-gray-300 font-medium">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="flex gap-3 items-center">
        <input value={value} onChange={(e) => onChange(e.target.value)} className={`flex-1 rounded-xl p-3 bg-gray-900 text-white border ${invalid ? "border-red-600" : "border-gray-600 focus:ring-indigo-400"} focus:outline-none focus:ring-2`} placeholder={placeholder} />
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState("en");
  const [mode, setMode] = useState("dose");
  const [vialStrength, setVialStrength] = useState("");
  const [vialUnit, setVialUnit] = useState("mg");
  const [vialVolume, setVialVolume] = useState("");
  const [desiredStrength, setDesiredStrength] = useState("");
  const [desiredUnit, setDesiredUnit] = useState("mg");
  const [drugAmount, setDrugAmount] = useState("");
  const [drugUnit, setDrugUnit] = useState("mg");
  const [targetConcentration, setTargetConcentration] = useState("");
  const [targetConcUnit, setTargetConcUnit] = useState("mg");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const t = translations[language];
  const unitOptions = ["mg", "mcg", "g", "mmol", "meq", "mL"];
  const massUnits = new Set(["mg", "g", "mcg"]);
  const electrolyteUnits = new Set(["mmol", "meq"]);

  useEffect(() => {
    const saved = localStorage.getItem("prepcalc-language");
    if (saved && translations[saved]) setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("prepcalc-language", language);
  }, [language]);

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
    setResult(null);
    setError("");
  };

  const calculateVolume = () => {
    setError("");
    setResult(null);
    const vialS = Number(vialStrength);
    const vialV = Number(vialVolume);
    const desired = Number(desiredStrength);

    if (!vialS || !vialV || !desired) { setError(t.errorNumeric); return; }
    if (vialV <= 0) { setError(t.errorVolume); return; }
    if (desired <= 0) { setError(t.errorDose); return; }

    const vialIsMass = massUnits.has(vialUnit);
    const desiredIsMass = massUnits.has(desiredUnit);
    const vialIsElectro = electrolyteUnits.has(vialUnit);
    const desiredIsElectro = electrolyteUnits.has(desiredUnit);

    if (!((vialIsMass && desiredIsMass) || (vialIsElectro && desiredIsElectro))) {
      setError(t.errorUnitMismatch);
      return;
    }

    let vialBase = vialS;
    let desiredBase = desired;

    if (vialIsMass && desiredIsMass) {
      if (vialUnit === "g") vialBase *= 1000;
      if (vialUnit === "mcg") vialBase /= 1000;
      if (desiredUnit === "g") desiredBase *= 1000;
      if (desiredUnit === "mcg") desiredBase /= 1000;
    }

    const concentration = vialBase / vialV;
    if (concentration <= 0 || !isFinite(concentration)) { setError(t.errorConcentration); return; }

    const volumeNeeded = desiredBase / concentration;
    if (volumeNeeded <= 0 || !isFinite(volumeNeeded)) { setError(t.errorInvalidResult); return; }

    if (desiredBase > vialBase) {
      const vialsNeeded = Math.ceil(desiredBase / vialBase);
      const volumePerVial = Math.round(vialV * 100) / 100;
      const totalVolume = Math.round(volumePerVial * vialsNeeded * 100) / 100;
      setResult({ volume: volumePerVial, totalVolume, vialsNeeded, unit: "mL", multiVial: true });
    } else {
      setResult({ volume: Math.round(volumeNeeded * 100) / 100, unit: "mL", multiVial: false });
    }
  };

  const calculateDilution = () => {
    setError("");
    setResult(null);
    const drug = Number(drugAmount);
    const targetConc = Number(targetConcentration);

    if (!drug || !targetConc) { setError(t.errorNumeric); return; }
    if (drug <= 0) { setError(t.errorDrugAmount); return; }
    if (targetConc <= 0) { setError(t.errorTargetConc); return; }

    const drugIsMass = massUnits.has(drugUnit);
    const targetIsMass = massUnits.has(targetConcUnit);
    const drugIsElectro = electrolyteUnits.has(drugUnit);
    const targetIsElectro = electrolyteUnits.has(targetConcUnit);

    if (!((drugIsMass && targetIsMass) || (drugIsElectro && targetIsElectro))) {
      setError(t.errorUnitMismatch);
      return;
    }

    let drugBase = drug;
    let targetBase = targetConc;

    if (drugIsMass && targetIsMass) {
      if (drugUnit === "g") drugBase *= 1000;
      if (drugUnit === "mcg") drugBase /= 1000;
      if (targetConcUnit === "g") targetBase *= 1000;
      if (targetConcUnit === "mcg") targetBase /= 1000;
    }

    const volumeNeeded = drugBase / targetBase;
    if (volumeNeeded <= 0 || !isFinite(volumeNeeded)) { setError(t.errorInvalidResult); return; }

    setResult({ volume: Math.round(volumeNeeded * 100) / 100, unit: "mL", type: "dilution" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 p-6 text-white flex flex-col">
      <div className="max-w-6xl mx-auto flex-1">
        <header className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <a href="https://pathialabs.com" className="hover:opacity-80 transition">
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

        <div className="mb-6 flex justify-center">
          <div className="bg-gray-800/90 p-1 rounded-xl inline-flex gap-1">
            <button onClick={() => { setMode("dose"); resetAll(); }} className={`px-6 py-2 rounded-lg font-medium transition ${mode === "dose" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-gray-200"}`}>{t.modeDose}</button>
            <button onClick={() => { setMode("dilution"); resetAll(); }} className={`px-6 py-2 rounded-lg font-medium transition ${mode === "dilution" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-gray-200"}`}>{t.modeDilution}</button>
          </div>
        </div>

        {mode === "dilution" && (
          <div className="mb-6 bg-indigo-900/30 border border-indigo-600/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-indigo-300 font-semibold mb-1">{t.dilutionInfoTitle}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{t.dilutionInfoText}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <section className="bg-gray-800/90 p-6 rounded-2xl border border-gray-700 shadow-lg">
            {mode === "dose" ? (
              <>
                <InputRow label={t.vialStrength} value={vialStrength} onChange={setVialStrength} invalid={vialStrength && isNaN(Number(vialStrength))} tooltip={t.tooltipVialStrength} placeholder={t.placeholder}>
                  <select value={vialUnit} onChange={(e) => setVialUnit(e.target.value)} className="p-3 rounded-xl bg-gray-900 border border-gray-600 text-white">
                    {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </InputRow>
                <InputRow label={t.referenceVolume} value={vialVolume} onChange={setVialVolume} invalid={vialVolume && (isNaN(Number(vialVolume)) || Number(vialVolume) <= 0)} tooltip={t.tooltipReferenceVolume} placeholder={t.placeholder} />
                <InputRow label={t.desiredDose} value={desiredStrength} onChange={setDesiredStrength} invalid={desiredStrength && isNaN(Number(desiredStrength))} tooltip={t.tooltipDesiredDose} placeholder={t.placeholder}>
                  <select value={desiredUnit} onChange={(e) => setDesiredUnit(e.target.value)} className="p-3 rounded-xl bg-gray-900 border border-gray-600 text-white">
                    {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </InputRow>
                <div className="flex gap-3 mt-6">
                  <button onClick={calculateVolume} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-medium">{t.calculate}</button>
                  <button onClick={resetAll} className="flex items-center justify-center w-14 bg-gray-700 hover:bg-gray-600 text-white rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                <InputRow label={t.drugAmount} value={drugAmount} onChange={setDrugAmount} invalid={drugAmount && isNaN(Number(drugAmount))} tooltip={t.tooltipDrugAmount} placeholder={t.placeholder}>
                  <select value={drugUnit} onChange={(e) => setDrugUnit(e.target.value)} className="p-3 rounded-xl bg-gray-900 border border-gray-600 text-white">
                    {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </InputRow>
                <InputRow label={t.targetConcentration} value={targetConcentration} onChange={setTargetConcentration} invalid={targetConcentration && isNaN(Number(targetConcentration))} tooltip={t.tooltipTargetConc} placeholder={t.placeholder}>
                  <select value={targetConcUnit} onChange={(e) => setTargetConcUnit(e.target.value)} className="p-3 rounded-xl bg-gray-900 border border-gray-600 text-white">
                    {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </InputRow>
                <div className="flex gap-3 mt-6">
                  <button onClick={calculateDilution} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-medium">{t.calculate}</button>
                  <button onClick={resetAll} className="flex items-center justify-center w-14 bg-gray-700 hover:bg-gray-600 text-white rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </section>

          <aside className="bg-gray-800/95 border border-indigo-700 rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">{t.result}</h3>
            {error ? (
              <div className="bg-red-900 border border-red-600 rounded-lg p-4 w-full text-center">
                <p className="text-red-400 font-medium">{error}</p>
              </div>
            ) : result ? (
              <div className="w-full text-center p-6 rounded-2xl border border-indigo-600" style={{ background: "linear-gradient(145deg, #1f1f23, #2e2e41)" }}>
                {result.multiVial ? (
                  <>
                    <p className="text-sm text-gray-400 mb-2">{t.youWillNeed}</p>
                    <p className="text-4xl font-extrabold text-indigo-400">{result.vialsNeeded} {t.vials}</p>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-sm text-gray-400">{t.drawFromEach}</p>
                      <p className="text-2xl font-bold text-indigo-300 mt-1">{result.volume} {result.unit}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-400">{t.totalVolume}</p>
                      <p className="text-xl font-semibold text-cyan-400 mt-1">{result.totalVolume} {result.unit}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">{t.roundedText}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-400">{result.type === "dilution" ? t.totalVolumeNeeded : t.volumeToDraw}</p>
                    <p className="text-3xl font-extrabold text-indigo-400 mt-2">{result.volume} {result.unit}</p>
                    <p className="text-xs text-gray-500 mt-2">{result.type === "dilution" ? t.dilutionNote : t.roundedText}</p>
                  </>
                )}
              </div>
            ) : (
              <p className="text-gray-400">{t.enterInputs}</p>
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




















































