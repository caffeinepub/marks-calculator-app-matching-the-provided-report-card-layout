import { useState, useRef } from 'react';
import { ReportCardLayout } from './components/ReportCard/ReportCardLayout';
import { ScholasticTable } from './components/ReportCard/ScholasticTable';
import { CoScholasticFields } from './components/ReportCard/CoScholasticFields';
import { AttendanceAndResult } from './components/ReportCard/AttendanceAndResult';
import { Button } from './components/ui/button';
import { Printer, Download, Upload, RotateCcw } from 'lucide-react';
import { defaultSubjects, defaultFields } from './lib/defaultData';
import { buildExportPayload, downloadJSON, validateAndParseImport, readFileAsText } from './lib/reportCardIO';
import type { SubjectMarks, FieldMarks, AttendanceData } from './lib/types';

function App() {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [subjectMarks, setSubjectMarks] = useState<SubjectMarks[]>(defaultSubjects);
  const [fieldMarks, setFieldMarks] = useState<FieldMarks[]>(defaultFields);
  const [attendance, setAttendance] = useState<AttendanceData>({
    totalWorkingDays: '',
    presentDays: '',
  });
  const [result, setResult] = useState('');
  const [remarks, setRemarks] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubjectUpdate = (index: number, field: keyof SubjectMarks, value: string) => {
    const updated = [...subjectMarks];
    updated[index] = { ...updated[index], [field]: value };
    setSubjectMarks(updated);
  };

  const handleFieldUpdate = (index: number, field: 'halfYearly' | 'annual', value: string) => {
    const updated = [...fieldMarks];
    updated[index] = { ...updated[index], [field]: value };
    setFieldMarks(updated);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const payload = buildExportPayload({
      studentName,
      class: studentClass,
      rollNo,
      subjects: subjectMarks,
      fields: fieldMarks,
      attendance,
      result,
      remarks,
    });
    downloadJSON(payload);
  };

  const handleImportClick = () => {
    setImportError(null);
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileContent = await readFileAsText(file);
      const parseResult = validateAndParseImport(fileContent);

      if (!parseResult.success) {
        setImportError(parseResult.error);
        return;
      }

      // Successfully parsed, update all state
      setStudentName(parseResult.data.studentName || '');
      setStudentClass(parseResult.data.class || '');
      setRollNo(parseResult.data.rollNo || '');
      setSubjectMarks(parseResult.data.subjects);
      setFieldMarks(parseResult.data.fields);
      setAttendance(parseResult.data.attendance);
      setResult(parseResult.data.result);
      setRemarks(parseResult.data.remarks);
      setImportError(null);
    } catch (error) {
      setImportError('Failed to read the selected file. Please try again.');
    }

    // Reset file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    setStudentName('');
    setStudentClass('');
    setRollNo('');
    setSubjectMarks(defaultSubjects);
    setFieldMarks(defaultFields);
    setAttendance({ totalWorkingDays: '', presentDays: '' });
    setResult('');
    setRemarks('');
    setImportError(null);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_60)] print:bg-white">
      <div className="container mx-auto py-8 print:py-0">
        <div className="mb-4 space-y-3 print:hidden">
          <div className="flex flex-wrap gap-2 justify-end">
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button onClick={handleImportClick} variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Import Data
            </Button>
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Print Report Card
            </Button>
          </div>
          
          {importError && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-md text-sm">
              <strong>Import Error:</strong> {importError}
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
        />

        <ReportCardLayout
          studentName={studentName}
          onStudentNameChange={setStudentName}
          studentClass={studentClass}
          onStudentClassChange={setStudentClass}
          rollNo={rollNo}
          onRollNoChange={setRollNo}
        >
          <div className="space-y-6 print:space-y-3">
            {/* Main Scholastic Table */}
            <ScholasticTable
              subjectMarks={subjectMarks}
              onUpdate={handleSubjectUpdate}
            />

            {/* Lower Section: Fields and Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:gap-4">
              <CoScholasticFields
                fieldMarks={fieldMarks}
                onUpdate={handleFieldUpdate}
              />

              <AttendanceAndResult
                attendance={attendance}
                onAttendanceUpdate={setAttendance}
                result={result}
                onResultUpdate={setResult}
                remarks={remarks}
                onRemarksUpdate={setRemarks}
              />
            </div>

            {/* Signature Section */}
            <div className="grid grid-cols-2 gap-8 mt-12 pt-8 print:mt-6 print:pt-4 print:gap-4 border-t border-[oklch(0.7_0_0)]">
              <div className="text-center">
                <div className="h-16 print:h-12 border-b-2 border-[oklch(0.3_0_0)] mb-2 print:mb-1"></div>
                <p className="text-sm print:text-xs font-medium text-[oklch(0.3_0_0)]">Class Teacher</p>
              </div>
              <div className="text-center">
                <div className="h-16 print:h-12 border-b-2 border-[oklch(0.3_0_0)] mb-2 print:mb-1"></div>
                <p className="text-sm print:text-xs font-medium text-[oklch(0.3_0_0)]">Principal</p>
              </div>
            </div>
          </div>
        </ReportCardLayout>
      </div>
    </div>
  );
}

export default App;
