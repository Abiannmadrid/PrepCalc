// calculators/dripRateCalculator.js - UPDATED with time units and no rounding
import { isValidResult } from '../utils/validation';

export const calculateDripRate = ({
  volume,
  time,
  timeUnit,
  dropFactor,
  translations
}) => {
  const steps = [];
  
  // Convert time to minutes if needed
  let timeInMinutes;
  if (timeUnit === 'hours') {
    timeInMinutes = time * 60;
    steps.push(`${translations.given}: ${volume} mL, ${time} hours, ${dropFactor} drops/mL`);
    steps.push(`${translations.convertTime}: ${time} hours × 60 = ${timeInMinutes} minutes`);
  } else {
    timeInMinutes = time;
    steps.push(`${translations.given}: ${volume} mL, ${time} minutes, ${dropFactor} drops/mL`);
  }
  
  // Calculate total drops
  const totalDrops = volume * dropFactor;
  steps.push(`${translations.totalDrops}: ${volume} mL × ${dropFactor} drops/mL = ${totalDrops} drops`);
  
  // Calculate drip rate (NO ROUNDING)
  const dripsPerMinute = totalDrops / timeInMinutes;
  
  if (!isValidResult(dripsPerMinute)) {
    return { error: translations.errorInvalidResult };
  }
  
  steps.push(`${translations.dripRate}: ${totalDrops} drops ÷ ${timeInMinutes} minutes = ${dripsPerMinute.toFixed(2)} drops/min`);
  
  // Calculate flow rate for verification
  const timeInHours = timeUnit === 'hours' ? time : time / 60;
  const flowRate = volume / timeInHours;
  steps.push(`${translations.flowRate}: ${volume} mL ÷ ${timeInHours.toFixed(2)} hours = ${flowRate.toFixed(2)} mL/hr`);
  
  return {
    result: {
      type: "dripRate",
      dripsPerMinute: dripsPerMinute.toFixed(2), // Keep 2 decimal places but don't round to whole number
      flowRate: flowRate.toFixed(2),
      unit: "drops/min"
    },
    steps
  };
};