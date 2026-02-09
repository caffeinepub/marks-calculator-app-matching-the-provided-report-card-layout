# Specification

## Summary
**Goal:** Ensure the report card prints on exactly one A4 landscape page by reducing print-only font sizes and tightening print spacing as needed, without changing the table structure or any calculations.

**Planned changes:**
- Update print-specific CSS (e.g., `@media print`) to reduce typography sizes for the report card sections where necessary.
- Tighten print-only vertical spacing (margins/padding/line-height) to prevent overflow onto a second page while keeping the layout readable and consistent.
- Verify print output in the browser print dialog for A4 landscape so no content is clipped and all sections remain visible on one page.

**User-visible outcome:** When printing the report card from the browser in A4 landscape, it fits on a single page with all sections visible, using smaller print-only fonts and spacing while keeping the on-screen layout unchanged.
