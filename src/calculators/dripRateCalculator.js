// calculators/dripRateCalculator.js
import { isValidResult } from '../utils/validation';

export const calculateDripRate = ({
  volume,
  time,
  dropFactor,
  translations
}) => {
  const steps = [];
  
  steps.push(`${translations.given}: ${volume} mL, ${time} hours, ${dropFactor} drops/mL`);
  
  // Step 1: Convert time to minutes
  const timeInMinutes = time * 60;
  steps.push(`${translations.convertTime}: ${time} hours × 60 = ${timeInMinutes} minutes`);
  
  // Step 2: Calculate total drops
  const totalDrops = volume * dropFactor;
  steps.push(`${translations.totalDrops}: ${volume} mL × ${dropFactor} drops/mL = ${totalDrops} drops`);
  
  // Step 3: Calculate drip rate
  const dripsPerMinute = totalDrops / timeInMinutes;
  const roundedDripRate = Math.round(dripsPerMinute);
  
  if (!isValidResult(roundedDripRate)) {
    return { error: translations.errorInvalidResult };
  }
  
  steps.push(`${translations.dripRate}: ${totalDrops} drops ÷ ${timeInMinutes} minutes = ${dripsPerMinute.toFixed(2)} drops/min`);
  steps.push(`${translations.rounded}: ${roundedDripRate} drops/min`);
  
  // Step 4: Calculate flow rate for verification
  const flowRate = Math.round(volume / time);
  steps.push(`${translations.flowRate}: ${volume} mL ÷ ${time} hours = ${flowRate} mL/hr`);
  
  return {
    result: {
      type: "dripRate", // ADD THIS LINE
      dripsPerMinute: roundedDripRate,
      flowRate: flowRate,
      unit: "drops/min"
    },
    steps
  };
};