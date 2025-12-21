// components/DripRateCalculatorForm.jsx
import InputRow from './InputRow';
import { isValidNumber } from '../utils/validation';

export default function DripRateCalculatorForm({
  volume,
  setVolume,
  time,
  setTime,
  dropFactor,
  setDropFactor,
  onCalculate,
  onReset,
  translations
}) {
  const commonDropFactors = [
    { value: '10', label: '10 drops/mL (Blood)' },
    { value: '15', label: '15 drops/mL (Macro)' },
    { value: '20', label: '20 drops/mL (Macro)' },
    { value: '60', label: '60 drops/mL (Micro)' }
  ];

  return (
    <>
      <InputRow
        label={translations.volume}
        value={volume}
        onChange={setVolume}
        invalid={volume && !isValidNumber(volume)}
        tooltip={translations.tooltipVolume}
        placeholder="1000"
      >
        <span className="px-3 text-gray-400">mL</span>
      </InputRow>

      <InputRow
        label={translations.time}
        value={time}
        onChange={setTime}
        invalid={time && !isValidNumber(time)}
        tooltip={translations.tooltipTime}
        placeholder="8"
      >
        <span className="px-3 text-gray-400">hours</span>
      </InputRow>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-200 mb-3">
          {translations.dropFactor}
        </label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {commonDropFactors.map((factor) => (
            <button
              key={factor.value}
              type="button"
              onClick={() => setDropFactor(factor.value)}
              className={`p-3 border-2 rounded-xl text-left transition-all text-sm ${
                dropFactor === factor.value
                  ? 'border-indigo-500 bg-indigo-500/20 shadow-lg'
                  : 'border-gray-600 bg-gray-900/30 hover:border-indigo-500/50'
              }`}
            >
              <div className="font-bold text-white">{factor.value}</div>
              <div className="text-xs text-gray-400">{factor.label}</div>
            </button>
          ))}
        </div>
        <input
          type="number"
          value={dropFactor}
          onChange={(e) => setDropFactor(e.target.value)}
          className={`w-full p-3 rounded-xl bg-gray-900 border transition ${
            dropFactor && !isValidNumber(dropFactor)
              ? 'border-red-500'
              : 'border-gray-600 focus:border-indigo-500'
          } text-white outline-none`}
          placeholder={translations.customDropFactor}
        />
      </div>

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </>
  );
}