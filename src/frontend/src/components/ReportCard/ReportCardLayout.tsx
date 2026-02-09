import { type ReactNode } from 'react';

interface ReportCardLayoutProps {
  children: ReactNode;
}

export function ReportCardLayout({ children }: ReportCardLayoutProps) {
  return (
    <div className="relative w-full max-w-[1600px] mx-auto">
      {/* Background form image */}
      <div className="absolute inset-0 pointer-events-none opacity-10 print:opacity-5">
        <img
          src="/assets/generated/report-card-form.dim_1600x1100.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content overlay */}
      <div className="relative bg-white/95 print:bg-white shadow-lg print:shadow-none rounded-lg print:rounded-none p-8 print:p-6">
        {/* Header */}
        <div className="text-center mb-8 print:mb-6">
          <h1 className="text-3xl print:text-2xl font-bold text-[oklch(0.25_0.05_250)] mb-2">
            ACADEMIC PERFORMANCE
          </h1>
          <h2 className="text-xl print:text-lg font-semibold text-[oklch(0.35_0.05_250)]">
            SCHOLASTIC AREAS
          </h2>
        </div>

        {/* Main content */}
        {children}
      </div>
    </div>
  );
}
