// validation.js - Input validation utilities

/**
 * Validate numeric input
 * @param {string} value - Input value
 * @returns {boolean} - True if valid number
 */
export const isValidNumber = (value) => {
    return value && !isNaN(Number(value));
  };
  
  /**
   * Validate positive numeric input
   * @param {string} value - Input value
   * @returns {boolean} - True if valid positive number
   */
  export const isValidPositiveNumber = (value) => {
    return isValidNumber(value) && Number(value) > 0;
  };
  
  /**
   * Check if result is valid (positive and finite)
   * @param {number} value - Value to check
   * @returns {boolean} - True if valid
   */
  export const isValidResult = (value) => {
    return value > 0 && isFinite(value);
  };