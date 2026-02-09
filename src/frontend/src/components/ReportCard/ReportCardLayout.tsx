import { type ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ReportCardLayoutProps {
  children: ReactNode;
  studentName: string;
  onStudentNameChange: (value: string) => void;
  studentClass: string;
  onStudentClassChange: (value: string) => void;
  rollNo: string;
  onRollNoChange: (value: string) => void;
}

export function ReportCardLayout({ 
  children, 
  studentName, 
  onStudentNameChange,
  studentClass,
  onStudentClassChange,
  rollNo,
  onRollNoChange
}: ReportCardLayoutProps) {
  return (
    <div className="report-card-wrapper relative w-full max-w-[1600px] mx-auto print:max-w-full">
      {/* Background form image */}
      <div className="absolute inset-0 pointer-events-none opacity-10 print:opacity-5">
        <img
          src="/assets/generated/report-card-form.dim_1600x1100.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content overlay */}
      <div className="report-card-content relative bg-white/95 print:bg-white shadow-lg print:shadow-none rounded-lg print:rounded-none p-8 print:p-3">
        {/* Header */}
        <div className="text-center mb-8 print:mb-2">
          {/* School Name - Always visible, bold, above Academic Performance */}
          <h1 className="text-4xl print:text-3xl font-bold text-[oklch(0.2_0.05_250)] mb-4 print:mb-1">
            VARDHMAN PUBLIC SCHOOL
          </h1>
          
          <h2 className="text-3xl print:text-2xl font-bold text-[oklch(0.25_0.05_250)] mb-2 print:mb-1">
            ACADEMIC PERFORMANCE
          </h2>
          <h3 className="text-xl print:text-lg font-semibold text-[oklch(0.35_0.05_250)]">
            SCHOLASTIC AREAS
          </h3>
        </div>

        {/* Student Information Fields */}
        <div className="mb-6 print:mb-2 space-y-4 print:space-y-2 border-2 border-[oklch(0.7_0_0)] rounded-md p-4 print:border print:p-1">
          {/* Student Name */}
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 items-center">
            <Label 
              htmlFor="student-name" 
              className="font-semibold text-[oklch(0.25_0_0)] print:text-xs"
            >
              Student Name:
            </Label>
            <div>
              <Input
                id="student-name"
                type="text"
                value={studentName}
                onChange={(e) => onStudentNameChange(e.target.value)}
                placeholder="Enter student name"
                className="border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)] print:hidden"
              />
              <div className="hidden print:block text-[oklch(0.25_0_0)] font-medium print:text-xs">
                {studentName || '___________________________'}
              </div>
            </div>
          </div>

          {/* Class and Roll No */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
            {/* Class */}
            <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
              <Label 
                htmlFor="student-class" 
                className="font-semibold text-[oklch(0.25_0_0)] print:text-xs"
              >
                Class:
              </Label>
              <div>
                <Input
                  id="student-class"
                  type="text"
                  value={studentClass}
                  onChange={(e) => onStudentClassChange(e.target.value)}
                  placeholder="Enter class"
                  className="border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)] print:hidden"
                />
                <div className="hidden print:block text-[oklch(0.25_0_0)] font-medium print:text-xs">
                  {studentClass || '______________'}
                </div>
              </div>
            </div>

            {/* Roll No */}
            <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
              <Label 
                htmlFor="roll-no" 
                className="font-semibold text-[oklch(0.25_0_0)] print:text-xs"
              >
                Roll No:
              </Label>
              <div>
                <Input
                  id="roll-no"
                  type="text"
                  value={rollNo}
                  onChange={(e) => onRollNoChange(e.target.value)}
                  placeholder="Enter roll number"
                  className="border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)] print:hidden"
                />
                <div className="hidden print:block text-[oklch(0.25_0_0)] font-medium print:text-xs">
                  {rollNo || '______________'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        {children}
      </div>
    </div>
  );
}
