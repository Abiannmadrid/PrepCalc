// units.js - Unit definitions and options
export const unitOptions = ["mg", "mcg", "g", "mmol", "meq", "mL"];

export const massUnits = new Set(["mg", "g", "mcg"]);
export const electrolyteUnits = new Set(["mmol", "meq"]);

export const isValidUnitPair = (unit1, unit2) => {
  const unit1IsMass = massUnits.has(unit1);
  const unit2IsMass = massUnits.has(unit2);
  const unit1IsElectro = electrolyteUnits.has(unit1);
  const unit2IsElectro = electrolyteUnits.has(unit2);
  
  return (unit1IsMass && unit2IsMass) || (unit1IsElectro && unit2IsElectro);
};