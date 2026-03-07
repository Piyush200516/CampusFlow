# TC PDF Download Fix - TODO

## Task
Fix TC PDF download issue - currently downloads entire webpage instead of just the PDF file.

## Steps:
- [x] 1. Install pdfkit package in backend
- [x] 2. Update feeRoutes.js to add TC PDF generation endpoint
- [x] 3. Update TC.jsx frontend to fetch and download PDF properly

## Implementation:
- Backend: Create `/api/generate-tc-pdf` route using pdfkit
- Frontend: Fetch PDF from API and trigger file download

