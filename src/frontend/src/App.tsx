import { useState } from 'react';
import { ReportCardLayout } from './components/ReportCard/ReportCardLayout';
import { ScholasticTable } from './components/ReportCard/ScholasticTable';
import { CoScholasticFields } from './components/ReportCard/CoScholasticFields';
import { AttendanceAndResult } from './components/ReportCard/AttendanceAndResult';
import { Button } from './components/ui/button';
import { Printer } from 'lucide-react';
import { defaultSubjects, defaultFields } from './lib/defaultData';
import type { SubjectMarks, FieldMarks, AttendanceData } from './lib/types';

function App() {
  const [subjectMarks, setSubjectMarks] = useState<SubjectMarks[]>(defaultSubjects);
  const [fieldMarks, setFieldMarks] = useState<FieldMarks[]>(defaultFields);
  const [attendance, setAttendance] = useState<AttendanceData>({
    totalWorkingDays: '',
    presentDays: '',
  });
  const [result, setResult] = useState('');
  const [remarks, setRemarks] = useState('');

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

  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_60)] print:bg-white">
      <div className="container mx-auto py-8 print:py-0">
        <div className="mb-4 flex justify-end print:hidden">
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print Report Card
          </Button>
        </div>

        <ReportCardLayout>
          <div className="space-y-6">
            {/* Main Scholastic Table */}
            <ScholasticTable
              subjectMarks={subjectMarks}
              onUpdate={handleSubjectUpdate}
            />

            {/* Lower Section: Fields and Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-[oklch(0.7_0_0)]">
              <div className="text-center">
                <div className="h-16 border-b-2 border-[oklch(0.3_0_0)] mb-2"></div>
                <p className="text-sm font-medium text-[oklch(0.3_0_0)]">Class Teacher</p>
              </div>
              <div className="text-center">
                <div className="h-16 border-b-2 border-[oklch(0.3_0_0)] mb-2"></div>
                <p className="text-sm font-medium text-[oklch(0.3_0_0)]">Principal</p>
              </div>
            </div>
          </div>
        </ReportCardLayout>
      </div>
    </div>
  );
}

export default App;
