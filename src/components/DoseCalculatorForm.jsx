// DoseCalculatorForm.jsx - Form for dose calculation mode
import InputRow from './InputRow';
import UnitSelector from './UnitSelector';
import { isValidNumber, isValidPositiveNumber } from '../utils/validation';

export default function DoseCalculatorForm({
  vialStrength,
  setVialStrength,
  vialUnit,
  setVialUnit,
  vialVolume,
  setVialVolume,
  desiredStrength,
  setDesiredStrength,
  desiredUnit,
  setDesiredUnit,
  onCalculate,
  onReset,
  translations
}) {
  return (
    <>
      <InputRow
        label={translations.vialStrength}
        value={vialStrength}
        onChange={setVialStrength}
        invalid={vialStrength && !isValidNumber(vialStrength)}
        tooltip={translations.tooltipVialStrength}
        placeholder={translations.placeholder}
      >
        <UnitSelector value={vialUnit} onChange={setVialUnit} />
      </InputRow>

      <InputRow
        label={translations.referenceVolume}
        value={vialVolume}
        onChange={setVialVolume}
        invalid={vialVolume && !isValidPositiveNumber(vialVolume)}
        tooltip={translations.tooltipReferenceVolume}
        placeholder={translations.placeholder}
      />

      <InputRow
        label={translations.desiredDose}
        value={desiredStrength}
        onChange={setDesiredStrength}
        invalid={desiredStrength && !isValidNumber(desiredStrength)}
        tooltip={translations.tooltipDesiredDose}
        placeholder={translations.placeholder}
      >
        <UnitSelector value={desiredUnit} onChange={setDesiredUnit} />
      </InputRow>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onCalculate}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-medium transition"
        >
          {translations.calculate}
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center w-14 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </>
  );
}