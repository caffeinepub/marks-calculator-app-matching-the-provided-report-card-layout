import { Input } from '@/components/ui/input';
import type { FieldMarks } from '@/lib/types';

interface CoScholasticFieldsProps {
  fieldMarks: FieldMarks[];
  onUpdate: (index: number, field: 'halfYearly' | 'annual', value: string) => void;
}

export function CoScholasticFields({ fieldMarks, onUpdate }: CoScholasticFieldsProps) {
  return (
    <div>
      <h3 className="text-lg print:text-base font-semibold text-[oklch(0.25_0.05_250)] mb-3 print:mb-2">Fields</h3>
      <table className="w-full border-collapse border-2 border-[oklch(0.3_0_0)] text-sm print:text-xs">
        <thead>
          <tr className="bg-[oklch(0.88_0.02_250)]">
            <th className="border border-[oklch(0.3_0_0)] p-2 print:p-1 text-left font-semibold text-[oklch(0.2_0_0)]">
              Fields
            </th>
            <th className="border border-[oklch(0.3_0_0)] p-2 print:p-1 text-center font-semibold text-[oklch(0.2_0_0)]">
              Half Yearly
            </th>
            <th className="border border-[oklch(0.3_0_0)] p-2 print:p-1 text-center font-semibold text-[oklch(0.2_0_0)]">
              Annual
            </th>
          </tr>
        </thead>
        <tbody>
          {fieldMarks.map((field, index) => (
            <tr key={field.name} className="hover:bg-[oklch(0.96_0.01_250)]">
              <td className="border border-[oklch(0.3_0_0)] p-2 print:p-1 text-[oklch(0.25_0_0)]">
                {field.name}
              </td>
              <td className="border border-[oklch(0.3_0_0)] p-1">
                <Input
                  type="text"
                  value={field.halfYearly}
                  onChange={(e) => onUpdate(index, 'halfYearly', e.target.value)}
                  className="h-8 text-center border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)]"
                  placeholder="Grade"
                />
              </td>
              <td className="border border-[oklch(0.3_0_0)] p-1">
                <Input
                  type="text"
                  value={field.annual}
                  onChange={(e) => onUpdate(index, 'annual', e.target.value)}
                  className="h-8 text-center border-[oklch(0.7_0_0)] focus:border-[oklch(0.4_0.1_250)]"
                  placeholder="Grade"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
