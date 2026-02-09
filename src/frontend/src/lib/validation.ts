export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateMarks(
  value: number | null,
  min: number,
  max: number
): ValidationResult {
  if (value === null) {
    return { isValid: true };
  }

  if (value < min || value > max) {
    return {
      isValid: false,
      error: `Must be between ${min} and ${max}`,
    };
  }

  return { isValid: true };
}

export function validateNonNegative(value: number | null): ValidationResult {
  if (value === null) {
    return { isValid: true };
  }

  if (value < 0) {
    return {
      isValid: false,
      error: 'Cannot be negative',
    };
  }

  return { isValid: true };
}
