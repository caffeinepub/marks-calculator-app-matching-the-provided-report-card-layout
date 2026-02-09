# Specification

## Summary
**Goal:** Build a marks calculator app that visually matches the uploaded report-card layout, allowing users to enter marks and see all derived totals/percentages update automatically, with a print-friendly output.

**Planned changes:**
- Recreate the report-card screen layout (headings, main marks table, lower “Fields”, “Attendance Records”, “Result/Remarks”, and signature placeholders) to closely match the uploaded image.
- Provide per-subject numeric inputs for 1st Unit Test, 2nd Unit Test, Half Yearly (0–100), and Annual Exam (0–100), with live in-row calculations.
- Implement calculations: UT Total = UT1 + UT2; X = 20% of UT Total; Y = 30% of Half Yearly; Z = 50% of Annual; Total 100 = X + Y + Z, with consistent rounding.
- Include default subject rows exactly as in the image, plus “Total” row (sums columns) and “Percentage” row (based on summed Total 100).
- Add editable lower-section inputs: “Fields” (Half Yearly/Annual), Attendance (working/present days), Result, and Remarks.
- Add validation with inline feedback: HY/Annual must be 0–100 (invalid excluded from calculations until corrected); Unit Tests must be non-negative.
- Add a Print action that opens the browser print dialog and preserves borders/headings/spacing for A4/Letter printing.
- Apply a paper report-card visual theme and use a generated static background form image with aligned overlays for inputs/values.

**User-visible outcome:** Users can fill in marks and related report-card fields on a screen that matches the provided form, see totals/percentages computed instantly, and print the completed report in a form-like layout.
