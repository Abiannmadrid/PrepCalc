// doseCalculator.js - Core logic for dose calculation
import { isValidUnitPair } from '../constants/units';
import { convertToBaseUnit, getBaseUnit, getConversionDescription } from '../utils/unitConversions';
import { isValidResult } from '../utils/validation';

/**
 * Calculate the volume to draw for a desired dose
 * @param {Object} params - Calculation parameters
 * @param {number} params.vialStrength - Amount of drug in vial
 * @param {string} params.vialUnit - Unit of vial strength
 * @param {number} params.vialVolume - Volume of vial in mL
 * @param {number} params.desiredStrength - Desired dose amount
 * @param {string} params.desiredUnit - Unit of desired dose
 * @param {Object} translations - Translation object for step descriptions
 * @param {string} language - Current language code
 * @returns {Object} - Result object with volume, steps, and error if any
 */
export const calculateDose = ({
  vialStrength,
  vialUnit,
  vialVolume,
  desiredStrength,
  desiredUnit,
  translations,
  language
}) => {
  const steps = [];
  
  // Validate unit compatibility
  if (!isValidUnitPair(vialUnit, desiredUnit)) {
    return { error: translations.errorUnitMismatch };
  }

  // Add initial values to steps
  const vialWord = language === 'en' ? 'in' : 
                   language === 'es' ? 'en' : 
                   language === 'fr' ? 'dans' : 
                   language === 'pt' ? 'em' : 
                   language === 'de' ? 'in' : 
                   language === 'ja' ? 'で' : 
                   language === 'it' ? 'in' : 
                   language === 'zh' ? '在' : 
                   language === 'ko' ? '에' : 'w';
  
  steps.push(`${translations.given}: ${translations.vialContains} ${vialStrength} ${vialUnit} ${vialWord} ${vialVolume} mL`);
  steps.push(`${translations.desiredDoseLabel}: ${desiredStrength} ${desiredUnit}`);

  // Convert to base units
  const vialBase = convertToBaseUnit(vialStrength, vialUnit);
  const desiredBase = convertToBaseUnit(desiredStrength, desiredUnit);
  const baseUnit = getBaseUnit(vialUnit);

  // Add conversion steps if needed
  const vialConversion = getConversionDescription(vialStrength, vialUnit, vialBase, baseUnit);
  if (vialConversion) {
    steps.push(`${translations.convertVial}: ${vialConversion}`);
  }

  const desiredConversion = getConversionDescription(desiredStrength, desiredUnit, desiredBase, baseUnit);
  if (desiredConversion) {
    steps.push(`${translations.convertDesired}: ${desiredConversion}`);
  }

  // Calculate concentration
  const concentration = vialBase / vialVolume;
  if (!isValidResult(concentration)) {
    return { error: translations.errorConcentration };
  }

  steps.push(`${translations.calcConcentration}: ${vialBase} ${baseUnit} ÷ ${vialVolume} mL = ${concentration.toFixed(2)} ${baseUnit}/mL`);

  // Calculate volume needed
  const volumeNeeded = desiredBase / concentration;
  if (!isValidResult(volumeNeeded)) {
    return { error: translations.errorInvalidResult };
  }

  steps.push(`${translations.calcVolume}: ${desiredBase} ${baseUnit} ÷ ${concentration.toFixed(2)} ${baseUnit}/mL = ${volumeNeeded.toFixed(2)} mL`);

  // Check if multiple vials needed
  if (desiredBase > vialBase) {
    const vialsNeeded = Math.ceil(desiredBase / vialBase);
    const volumePerVial = Math.round(vialVolume * 100) / 100;
    const totalVolume = Math.round(volumePerVial * vialsNeeded * 100) / 100;

    const vialUnitWord = language === 'en' ? 'vial' : 
                         language === 'es' ? 'vial' : 
                         language === 'fr' ? 'flacon' : 
                         language === 'pt' ? 'frasco' : 
                         language === 'de' ? 'Durchstechflasche' : 
                         language === 'ja' ? 'バイアル' : 
                         language === 'it' ? 'fiala' : 
                         language === 'zh' ? '药瓶' : 
                         language === 'ko' ? '바이알' : 'fiolka';

    steps.push(translations.exceedsSingle.replace('{desired}', `${desiredBase} ${baseUnit}`).replace('{vial}', `${vialBase} ${baseUnit}`));
    steps.push(`${translations.vialsNeeded}: ${desiredBase} ${baseUnit} ÷ ${vialBase} ${baseUnit}/${vialUnitWord} = ${(desiredBase/vialBase).toFixed(2)} → ${vialsNeeded} ${translations.vials} (${translations.roundedUp})`);
    steps.push(`${translations.drawFromEach}: ${volumePerVial} mL`);
    steps.push(`${translations.totalVolumeCalc}: ${volumePerVial} mL × ${vialsNeeded} ${translations.vials} = ${totalVolume} mL`);

    return {
      result: {
        volume: volumePerVial,
        totalVolume,
        vialsNeeded,
        unit: "mL",
        multiVial: true
      },
      steps
    };
  } else {
    const rounded = Math.round(volumeNeeded * 100) / 100;
    steps.push(`${translations.roundNearest}: ${rounded} mL`);

    return {
      result: {
        volume: rounded,
        unit: "mL",
        multiVial: false
      },
      steps
    };
  }
};