// dilutionCalculator.js - Core logic for dilution calculation
import { isValidUnitPair } from '../constants/units';
import { convertToBaseUnit, getBaseUnit, getConversionDescription } from '../utils/unitConversions';
import { isValidResult } from '../utils/validation';

/**
 * Calculate the total volume needed for dilution
 * @param {Object} params - Calculation parameters
 * @param {number} params.drugAmount - Total amount of drug
 * @param {string} params.drugUnit - Unit of drug amount
 * @param {number} params.targetConcentration - Desired concentration
 * @param {string} params.targetConcUnit - Unit of target concentration
 * @param {Object} translations - Translation object for step descriptions
 * @returns {Object} - Result object with volume, steps, and error if any
 */
export const calculateDilution = ({
  drugAmount,
  drugUnit,
  targetConcentration,
  targetConcUnit,
  translations
}) => {
  const steps = [];

  // Validate unit compatibility
  if (!isValidUnitPair(drugUnit, targetConcUnit)) {
    return { error: translations.errorUnitMismatch };
  }

  // Add initial values to steps
  steps.push(`${translations.givenDrug} = ${drugAmount} ${drugUnit}`);
  steps.push(`${translations.targetConc} = ${targetConcentration} ${targetConcUnit}/mL`);

  // Convert to base units
  const drugBase = convertToBaseUnit(drugAmount, drugUnit);
  const targetBase = convertToBaseUnit(targetConcentration, targetConcUnit);
  const baseUnit = getBaseUnit(drugUnit);

  // Add conversion steps if needed
  const drugConversion = getConversionDescription(drugAmount, drugUnit, drugBase, baseUnit);
  if (drugConversion) {
    steps.push(`${translations.convertDrug}: ${drugConversion}`);
  }

  const targetConversion = getConversionDescription(targetConcentration, targetConcUnit, targetBase, baseUnit);
  if (targetConversion) {
    steps.push(`${translations.convertTarget}: ${targetConversion}`);
  }

  // Add formula
  steps.push(`${translations.formula}`);

  // Calculate volume
  const volumeNeeded = drugBase / targetBase;
  if (!isValidResult(volumeNeeded)) {
    return { error: translations.errorInvalidResult };
  }

  steps.push(`${translations.calculate}: ${drugBase} ${baseUnit} ÷ ${targetBase} ${baseUnit}/mL = ${volumeNeeded.toFixed(2)} mL`);

  const rounded = Math.round(volumeNeeded * 100) / 100;
  steps.push(`${translations.roundNearest}: ${rounded} mL`);
  steps.push(`${translations.addDiluent} ${rounded} mL`);

  return {
    result: {
      volume: rounded,
      unit: "mL",
      type: "dilution"
    },
    steps
  };
};