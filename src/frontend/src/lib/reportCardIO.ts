import type { ReportCardExportPayload, ReportCardState, SubjectMarks, FieldMarks, AttendanceData } from './types';

const EXPORT_VERSION = '1.0';

export function buildExportPayload(state: ReportCardState): ReportCardExportPayload {
  return {
    version: EXPORT_VERSION,
    studentName: state.studentName,
    class: state.class,
    rollNo: state.rollNo,
    subjects: state.subjects,
    fields: state.fields,
    attendance: state.attendance,
    result: state.result,
    remarks: state.remarks,
  };
}

export function downloadJSON(payload: ReportCardExportPayload, filename: string = 'report-card-data.json'): void {
  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function isValidSubjectMarks(obj: any): obj is SubjectMarks {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.name === 'string' &&
    typeof obj.ut1 === 'string' &&
    typeof obj.ut2 === 'string' &&
    typeof obj.halfYearly === 'string' &&
    typeof obj.annual === 'string'
  );
}

function isValidFieldMarks(obj: any): obj is FieldMarks {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.name === 'string' &&
    typeof obj.halfYearly === 'string' &&
    typeof obj.annual === 'string'
  );
}

function isValidAttendanceData(obj: any): obj is AttendanceData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.totalWorkingDays === 'string' &&
    typeof obj.presentDays === 'string'
  );
}

export function validateAndParseImport(jsonString: string): { success: true; data: ReportCardState } | { success: false; error: string } {
  let parsed: any;
  
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    return { success: false, error: 'Invalid JSON file. Please select a valid report card export file.' };
  }

  if (typeof parsed !== 'object' || parsed === null) {
    return { success: false, error: 'Invalid file format. The file does not contain valid report card data.' };
  }

  if (!parsed.version || typeof parsed.version !== 'string') {
    return { success: false, error: 'Invalid file format. Missing version information.' };
  }

  // Validate studentName, class, and rollNo if present (backward compatible)
  if (parsed.studentName !== undefined && typeof parsed.studentName !== 'string') {
    return { success: false, error: 'Invalid file format. Student name must be a string.' };
  }

  if (parsed.class !== undefined && typeof parsed.class !== 'string') {
    return { success: false, error: 'Invalid file format. Class must be a string.' };
  }

  if (parsed.rollNo !== undefined && typeof parsed.rollNo !== 'string') {
    return { success: false, error: 'Invalid file format. Roll number must be a string.' };
  }

  if (!Array.isArray(parsed.subjects) || parsed.subjects.length === 0) {
    return { success: false, error: 'Invalid file format. Missing or empty subjects array.' };
  }

  if (!parsed.subjects.every(isValidSubjectMarks)) {
    return { success: false, error: 'Invalid file format. One or more subjects have invalid data structure.' };
  }

  if (!Array.isArray(parsed.fields) || parsed.fields.length === 0) {
    return { success: false, error: 'Invalid file format. Missing or empty co-scholastic fields array.' };
  }

  if (!parsed.fields.every(isValidFieldMarks)) {
    return { success: false, error: 'Invalid file format. One or more co-scholastic fields have invalid data structure.' };
  }

  if (!isValidAttendanceData(parsed.attendance)) {
    return { success: false, error: 'Invalid file format. Attendance data is missing or invalid.' };
  }

  if (typeof parsed.result !== 'string') {
    return { success: false, error: 'Invalid file format. Result field is missing or invalid.' };
  }

  if (typeof parsed.remarks !== 'string') {
    return { success: false, error: 'Invalid file format. Remarks field is missing or invalid.' };
  }

  return {
    success: true,
    data: {
      studentName: parsed.studentName || '',
      class: parsed.class || '',
      rollNo: parsed.rollNo || '',
      subjects: parsed.subjects,
      fields: parsed.fields,
      attendance: parsed.attendance,
      result: parsed.result,
      remarks: parsed.remarks,
    },
  };
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        resolve(e.target.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
