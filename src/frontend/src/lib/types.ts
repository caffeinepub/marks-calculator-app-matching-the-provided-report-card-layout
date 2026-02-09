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

export interface ReportCardState {
  studentName?: string;
  class?: string;
  rollNo?: string;
  subjects: SubjectMarks[];
  fields: FieldMarks[];
  attendance: AttendanceData;
  result: string;
  remarks: string;
}

export interface ReportCardExportPayload {
  version: string;
  studentName?: string;
  class?: string;
  rollNo?: string;
  subjects: SubjectMarks[];
  fields: FieldMarks[];
  attendance: AttendanceData;
  result: string;
  remarks: string;
}
