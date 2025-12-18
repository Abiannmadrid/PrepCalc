// InputRow.jsx - Reusable input row with label and optional unit selector
import Tooltip from './Tooltip';

export default function InputRow({ 
  label, 
  value, 
  onChange, 
  children, 
  invalid, 
  tooltip, 
  placeholder 
}) {
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
              ? "border-red-600" 
              : "border-gray-600 focus:ring-indigo-400"
          } focus:outline-none focus:ring-2`} 
          placeholder={placeholder} 
        />
        {children}
      </div>
    </div>
  );
}