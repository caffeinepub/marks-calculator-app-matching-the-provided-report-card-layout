import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AttendanceData } from '@/lib/types';

interface AttendanceAndResultProps {
  attendance: AttendanceData;
  onAttendanceUpdate: (data: AttendanceData) => void;
  result: string;
  onResultUpdate: (value: string) => void;
  remarks: string;
  onRemarksUpdate: (value: string) => void;
}

export function AttendanceAndResult({
  attendance,
  onAttendanceUpdate,
  result,
  onResultUpdate,
  remarks,
  onRemarksUpdate,
}: AttendanceAndResultProps) {
  return (
    <div className="space-y-4 print:space-y-2">
      {/* Attendance Records */}
      <div>
        <h3 className="text-lg print:text-base font-semibold text-[oklch(0.25_0.05_250)] mb-3 print:mb-2">
          Attendance Records
        </h3>
        <div className="border-2 border-[oklch(0.3_0_0)] rounded-md p-4 print:p-2 space-y-3 print:space-y-2 bg-[oklch(0.98_0.005_250)]">
          <div className="flex items-center gap-3 print:gap-2">
            <label className="text-sm print:text-xs font-medium text-[oklch(0.25_0_0)] min-w-[180px] print:min-w-[140px]">
              Total No. of Working Days:
            </label>
            <Input
              type="number"
              min="0"
              value={attendance.totalWorkingDays}
              onChange={(e) =>
                onAttendanceUpdate({ ...attendance, totalWorkingDays: e.target.value })
              }
              className="h-9 print:h-8 border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)]"
              placeholder="0"
            />
          </div>
          <div className="flex items-center gap-3 print:gap-2">
            <label className="text-sm print:text-xs font-medium text-[oklch(0.25_0_0)] min-w-[180px] print:min-w-[140px]">
              No. of Present Days:
            </label>
            <Input
              type="number"
              min="0"
              value={attendance.presentDays}
              onChange={(e) =>
                onAttendanceUpdate({ ...attendance, presentDays: e.target.value })
              }
              className="h-9 print:h-8 border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)]"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Result */}
      <div>
        <label className="text-sm print:text-xs font-medium text-[oklch(0.25_0_0)] mb-2 print:mb-1 block">
          Result:
        </label>
        <Input
          type="text"
          value={result}
          onChange={(e) => onResultUpdate(e.target.value)}
          className="border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)]"
          placeholder="Pass/Fail"
        />
      </div>

      {/* Remarks */}
      <div>
        <label className="text-sm print:text-xs font-medium text-[oklch(0.25_0_0)] mb-2 print:mb-1 block">
          Remarks:
        </label>
        <Textarea
          value={remarks}
          onChange={(e) => onRemarksUpdate(e.target.value)}
          className="min-h-[80px] print:min-h-[60px] border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)]"
          placeholder="Enter remarks..."
        />
      </div>
    </div>
  );
}
