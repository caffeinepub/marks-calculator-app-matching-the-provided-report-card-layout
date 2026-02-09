import type { SubjectMarks, ColumnTotals } from './types';
import { validateMarks } from './validation';

export function parseNumber(value: string): number | null {
  if (!value || value.trim() === '') return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

export function formatNumber(value: number): string {
  return value.toFixed(2);
}

export function calculateUTTotal(ut1: number | null, ut2: number | null): number | null {
  if (ut1 === null && ut2 === null) return null;
  return (ut1 || 0) + (ut2 || 0);
}

export function calculateX(utTotal: number | null): number | null {
  if (utTotal === null) return null;
  return utTotal * 0.2;
}

export function calculateY(halfYearly: number | null): number | null {
  if (halfYearly === null) return null;
  return halfYearly * 0.3;
}

export function calculateZ(annual: number | null): number | null {
  if (annual === null) return null;
  return annual * 0.5;
}

export function calculateTotal100(
  x: number | null,
  y: number | null,
  z: number | null
): number | null {
  if (x === null && y === null && z === null) return null;
  return (x || 0) + (y || 0) + (z || 0);
}

export function calculateColumnTotals(subjects: SubjectMarks[]): ColumnTotals {
  let ut1Sum = 0;
  let ut2Sum = 0;
  let utTotalSum = 0;
  let hySum = 0;
  let aeSum = 0;
  let xSum = 0;
  let ySum = 0;
  let zSum = 0;
  let total100Sum = 0;

  let hasAnyUt1 = false;
  let hasAnyUt2 = false;
  let hasAnyHy = false;
  let hasAnyAe = false;
  let hasAnyTotal = false;

  subjects.forEach((subject) => {
    const ut1 = parseNumber(subject.ut1);
    const ut2 = parseNumber(subject.ut2);
    const hy = parseNumber(subject.halfYearly);
    const ae = parseNumber(subject.annual);

    const hyValidation = validateMarks(hy, 0, 100);
    const aeValidation = validateMarks(ae, 0, 100);

    if (ut1 !== null) {
      ut1Sum += ut1;
      hasAnyUt1 = true;
    }
    if (ut2 !== null) {
      ut2Sum += ut2;
      hasAnyUt2 = true;
    }

    const utTotal = calculateUTTotal(ut1, ut2);
    if (utTotal !== null) {
      utTotalSum += utTotal;
    }

    if (hyValidation.isValid && hy !== null) {
      hySum += hy;
      hasAnyHy = true;
    }

    if (aeValidation.isValid && ae !== null) {
      aeSum += ae;
      hasAnyAe = true;
    }

    const x = calculateX(utTotal);
    const y = hyValidation.isValid ? calculateY(hy) : null;
    const z = aeValidation.isValid ? calculateZ(ae) : null;

    if (x !== null) xSum += x;
    if (y !== null) ySum += y;
    if (z !== null) zSum += z;

    const total = calculateTotal100(x, y, z);
    if (total !== null) {
      total100Sum += total;
      hasAnyTotal = true;
    }
  });

  return {
    ut1: hasAnyUt1 ? ut1Sum : null,
    ut2: hasAnyUt2 ? ut2Sum : null,
    utTotal: hasAnyUt1 || hasAnyUt2 ? utTotalSum : null,
    halfYearly: hasAnyHy ? hySum : null,
    annual: hasAnyAe ? aeSum : null,
    x: hasAnyUt1 || hasAnyUt2 ? xSum : null,
    y: hasAnyHy ? ySum : null,
    z: hasAnyAe ? zSum : null,
    total100: hasAnyTotal ? total100Sum : null,
  };
}

export function calculatePercentage(total100: number | null): number | null {
  if (total100 === null) return null;
  // Percentage = (Total marks obtained / Total possible marks) * 100
  // Total possible marks = 13 subjects * 100 = 1300
  const totalPossible = 13 * 100;
  return (total100 / totalPossible) * 100;
}
