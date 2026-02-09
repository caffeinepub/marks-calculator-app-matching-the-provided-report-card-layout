import { Input } from '@/components/ui/input';
import {
  calculateUTTotal,
  calculateX,
  calculateY,
  calculateZ,
  calculateTotal100,
  calculateColumnTotals,
  calculatePercentage,
  formatNumber,
  parseNumber,
} from '@/lib/marks';
import { validateMarks } from '@/lib/validation';
import type { SubjectMarks } from '@/lib/types';

interface ScholasticTableProps {
  subjectMarks: SubjectMarks[];
  onUpdate: (index: number, field: keyof SubjectMarks, value: string) => void;
}

export function ScholasticTable({ subjectMarks, onUpdate }: ScholasticTableProps) {
  const totals = calculateColumnTotals(subjectMarks);
  const percentage = calculatePercentage(totals.total100);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border-2 border-[oklch(0.3_0_0)] text-sm print:text-xs">
        <thead>
          <tr className="bg-[oklch(0.88_0.02_250)]">
            <th
              rowSpan={2}
              className="border border-[oklch(0.3_0_0)] p-2 text-left font-semibold text-[oklch(0.2_0_0)]"
            >
              SUBJECTS
            </th>
            <th
              colSpan={3}
              className="border border-[oklch(0.3_0_0)] p-2 text-center font-semibold text-[oklch(0.2_0_0)]"
            >
              EXAMINATIONS
            </th>
            <th
              rowSpan={2}
              className="border border-[oklch(0.3_0_0)] p-2 text-center font-semibold text-[oklch(0.2_0_0)]"
            >
              HALF<br />YEARLY<br />100 Marks
            </th>
            <th
              rowSpan={2}
              className="border border-[oklch(0.3_0_0)] p-2 text-center font-semibold text-[oklch(0.2_0_0)]"
            >
              ANNUAL<br />EXAM<br />100 Marks
            </th>
            <th
              rowSpan={2}
              className="border border-[oklch(0.3_0_0)] p-2 text-center font-semibold text-[oklch(0.2_0_0)]"
            >
              20% of UT<br />(X)
            </th>
            <th
              rowSpan={2}
              className="border border-[oklch(0.3_0_0)] p-2 text-center font-semibold text-[oklch(0.2_0_0)]"
            >
              30% of HY<br />(Y)
            </th>
            <th
              rowSpan={2}
              className="border border-[oklch(0.3_0_0)] p-2 text-center font-semibold text-[oklch(0.2_0_0)]"
            >
              50% of AE<br />(Z)
            </th>
            <th
              rowSpan={2}
              className="border border-[oklch(0.3_0_0)] p-2 text-center font-semibold text-[oklch(0.2_0_0)]"
            >
              Total 100<br />Marks<br />(X+Y+Z)
            </th>
          </tr>
          <tr className="bg-[oklch(0.88_0.02_250)]">
            <th className="border border-[oklch(0.3_0_0)] p-2 text-center font-semibold text-[oklch(0.2_0_0)]">
              1st Unit<br />Test
            </th>
            <th className="border border-[oklch(0.3_0_0)] p-2 text-center font-semibold text-[oklch(0.2_0_0)]">
              2nd Unit<br />Test
            </th>
            <th className="border border-[oklch(0.3_0_0)] p-2 text-center font-semibold text-[oklch(0.2_0_0)]">
              Total<br />Marks
            </th>
          </tr>
        </thead>
        <tbody>
          {subjectMarks.map((subject, index) => {
            const ut1 = parseNumber(subject.ut1);
            const ut2 = parseNumber(subject.ut2);
            const hy = parseNumber(subject.halfYearly);
            const ae = parseNumber(subject.annual);

            const hyValidation = validateMarks(hy, 0, 100);
            const aeValidation = validateMarks(ae, 0, 100);

            const utTotal = calculateUTTotal(ut1, ut2);
            const x = calculateX(utTotal);
            const y = hyValidation.isValid ? calculateY(hy) : null;
            const z = aeValidation.isValid ? calculateZ(ae) : null;
            const total = calculateTotal100(x, y, z);

            return (
              <tr key={index} className="hover:bg-[oklch(0.95_0.01_250)]">
                <td className="border border-[oklch(0.3_0_0)] p-1">
                  <Input
                    type="text"
                    value={subject.name}
                    onChange={(e) => onUpdate(index, 'name', e.target.value)}
                    className="h-8 border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)] font-medium text-[oklch(0.25_0_0)] print-input-as-text"
                    placeholder="Subject name"
                  />
                </td>
                <td className="border border-[oklch(0.3_0_0)] p-1">
                  <Input
                    type="number"
                    min="0"
                    value={subject.ut1}
                    onChange={(e) => onUpdate(index, 'ut1', e.target.value)}
                    className="h-8 text-center border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)] print-input-as-text"
                    placeholder="0"
                  />
                </td>
                <td className="border border-[oklch(0.3_0_0)] p-1">
                  <Input
                    type="number"
                    min="0"
                    value={subject.ut2}
                    onChange={(e) => onUpdate(index, 'ut2', e.target.value)}
                    className="h-8 text-center border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)] print-input-as-text"
                    placeholder="0"
                  />
                </td>
                <td className="border border-[oklch(0.3_0_0)] p-2 text-center bg-[oklch(0.92_0.01_250)] font-medium text-[oklch(0.25_0_0)]">
                  {utTotal !== null ? formatNumber(utTotal) : '-'}
                </td>
                <td className="border border-[oklch(0.3_0_0)] p-1">
                  <div>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={subject.halfYearly}
                      onChange={(e) => onUpdate(index, 'halfYearly', e.target.value)}
                      className={`h-8 text-center border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)] print-input-as-text ${
                        !hyValidation.isValid && subject.halfYearly
                          ? 'border-[oklch(0.6_0.2_30)] bg-[oklch(0.95_0.05_30)]'
                          : ''
                      }`}
                      placeholder="0-100"
                    />
                    {!hyValidation.isValid && subject.halfYearly && (
                      <p className="text-xs text-[oklch(0.5_0.15_30)] mt-0.5 print:hidden">
                        {hyValidation.error}
                      </p>
                    )}
                  </div>
                </td>
                <td className="border border-[oklch(0.3_0_0)] p-1">
                  <div>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={subject.annual}
                      onChange={(e) => onUpdate(index, 'annual', e.target.value)}
                      className={`h-8 text-center border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)] print-input-as-text ${
                        !aeValidation.isValid && subject.annual
                          ? 'border-[oklch(0.6_0.2_30)] bg-[oklch(0.95_0.05_30)]'
                          : ''
                      }`}
                      placeholder="0-100"
                    />
                    {!aeValidation.isValid && subject.annual && (
                      <p className="text-xs text-[oklch(0.5_0.15_30)] mt-0.5 print:hidden">
                        {aeValidation.error}
                      </p>
                    )}
                  </div>
                </td>
                <td className="border border-[oklch(0.3_0_0)] p-2 text-center bg-[oklch(0.92_0.01_250)] font-medium text-[oklch(0.25_0_0)]">
                  {x !== null ? formatNumber(x) : '-'}
                </td>
                <td className="border border-[oklch(0.3_0_0)] p-2 text-center bg-[oklch(0.92_0.01_250)] font-medium text-[oklch(0.25_0_0)]">
                  {y !== null ? formatNumber(y) : '-'}
                </td>
                <td className="border border-[oklch(0.3_0_0)] p-2 text-center bg-[oklch(0.92_0.01_250)] font-medium text-[oklch(0.25_0_0)]">
                  {z !== null ? formatNumber(z) : '-'}
                </td>
                <td className="border border-[oklch(0.3_0_0)] p-2 text-center bg-[oklch(0.85_0.03_250)] font-bold text-[oklch(0.2_0_0)]">
                  {total !== null ? formatNumber(total) : '-'}
                </td>
              </tr>
            );
          })}

          {/* Total Row */}
          <tr className="bg-[oklch(0.82_0.03_250)] font-bold">
            <td className="border border-[oklch(0.3_0_0)] p-2 text-[oklch(0.2_0_0)]">Total</td>
            <td className="border border-[oklch(0.3_0_0)] p-2 text-center text-[oklch(0.2_0_0)]">
              {totals.ut1 !== null ? formatNumber(totals.ut1) : '-'}
            </td>
            <td className="border border-[oklch(0.3_0_0)] p-2 text-center text-[oklch(0.2_0_0)]">
              {totals.ut2 !== null ? formatNumber(totals.ut2) : '-'}
            </td>
            <td className="border border-[oklch(0.3_0_0)] p-2 text-center text-[oklch(0.2_0_0)]">
              {totals.utTotal !== null ? formatNumber(totals.utTotal) : '-'}
            </td>
            <td className="border border-[oklch(0.3_0_0)] p-2 text-center text-[oklch(0.2_0_0)]">
              {totals.halfYearly !== null ? formatNumber(totals.halfYearly) : '-'}
            </td>
            <td className="border border-[oklch(0.3_0_0)] p-2 text-center text-[oklch(0.2_0_0)]">
              {totals.annual !== null ? formatNumber(totals.annual) : '-'}
            </td>
            <td className="border border-[oklch(0.3_0_0)] p-2 text-center text-[oklch(0.2_0_0)]">
              {totals.x !== null ? formatNumber(totals.x) : '-'}
            </td>
            <td className="border border-[oklch(0.3_0_0)] p-2 text-center text-[oklch(0.2_0_0)]">
              {totals.y !== null ? formatNumber(totals.y) : '-'}
            </td>
            <td className="border border-[oklch(0.3_0_0)] p-2 text-center text-[oklch(0.2_0_0)]">
              {totals.z !== null ? formatNumber(totals.z) : '-'}
            </td>
            <td className="border border-[oklch(0.3_0_0)] p-2 text-center text-[oklch(0.2_0_0)]">
              {totals.total100 !== null ? formatNumber(totals.total100) : '-'}
            </td>
          </tr>

          {/* Percentage Row */}
          <tr className="bg-[oklch(0.78_0.04_250)] font-bold">
            <td className="border border-[oklch(0.3_0_0)] p-2 text-[oklch(0.15_0_0)]">
              Percentage
            </td>
            <td colSpan={9} className="border border-[oklch(0.3_0_0)] p-2 text-center text-[oklch(0.15_0_0)]">
              {percentage !== null ? `${formatNumber(percentage)}%` : '-'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
