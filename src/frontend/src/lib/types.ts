export interface SubjectMarks {
  name: string;
  ut1: string;
  ut2: string;
  halfYearly: string;
  annual: string;
}

export interface FieldMarks {
  name: string;
  halfYearly: string;
  annual: string;
}

export interface AttendanceData {
  totalWorkingDays: string;
  presentDays: string;
}

export interface ColumnTotals {
  ut1: number | null;
  ut2: number | null;
  utTotal: number | null;
  halfYearly: number | null;
  annual: number | null;
  x: number | null;
  y: number | null;
  z: number | null;
  total100: number | null;
}
