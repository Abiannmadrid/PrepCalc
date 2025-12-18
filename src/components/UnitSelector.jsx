// UnitSelector.jsx - Unit selection dropdown
import { unitOptions } from '../constants/units';

export default function UnitSelector({ value, onChange }) {
  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className="p-3 rounded-xl bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      {unitOptions.map(unit => (
        <option key={unit} value={unit}>
          {unit}
        </option>
      ))}
    </select>
  );
}