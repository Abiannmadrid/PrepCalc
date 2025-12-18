// unitConversions.js - Unit conversion utilities
import { massUnits } from '../constants/units';

/**
 * Convert a value to base unit (mg for mass, keep original for electrolytes)
 * @param {number} value - The value to convert
 * @param {string} unit - The unit of the value
 * @returns {number} - Converted value in base unit
 */
export const convertToBaseUnit = (value, unit) => {
  if (unit === "g") return value * 1000;
  if (unit === "mcg") return value / 1000;
  return value;
};

/**
 * Get the base unit name for display
 * @param {string} unit - The unit
 * @returns {string} - Base unit name
 */
export const getBaseUnit = (unit) => {
  if (massUnits.has(unit)) return 'mg';
  if (unit === 'mmol') return 'mmol';
  return 'mEq';
};

/**
 * Get conversion description for step-by-step display
 * @param {number} original - Original value
 * @param {string} fromUnit - Original unit
 * @param {number} converted - Converted value
 * @param {string} toUnit - Target unit
 * @returns {string|null} - Description or null if no conversion needed
 */
export const getConversionDescription = (original, fromUnit, converted, toUnit) => {
  if (fromUnit === toUnit) return null;
  
  if (fromUnit === "g") {
    return `${original} g × 1000 = ${converted} ${toUnit}`;
  }
  if (fromUnit === "mcg") {
    return `${original} mcg ÷ 1000 = ${converted} ${toUnit}`;
  }
  return null;
};