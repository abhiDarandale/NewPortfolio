const fs = require('fs');
const path = require('path');

// Create a simple PDF-like binary content (using a basic PDF structure)
// This is a minimal valid PDF that can be viewed in most PDF readers

const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 1500 >>
stream
BT
/F1 24 Tf
50 750 Td
(ABHISHEK DARANDALE) Tj
0 -40 Td
/F1 14 Tf
(Full Stack Developer) Tj
0 -30 Td
/F1 12 Tf
(Email: abhishek@example.com | Phone: +91-8788303325) Tj
0 -40 Td
/F1 14 Tf
(PROFESSIONAL SUMMARY) Tj
0 -20 Td
/F1 11 Tf
(Full Stack Developer with expertise in MERN stack, Node.js, MySQL, and modern web technologies.) Tj
0 -30 Td
/F1 14 Tf
(SKILLS) Tj
0 -20 Td
/F1 11 Tf
(Frontend: HTML5, CSS3, Bootstrap, JavaScript, jQuery) Tj
0 -15 Td
(Backend: Node.js, Express.js, MySQL) Tj
0 -15 Td
(Tools: Git, GitHub, VS Code) Tj
0 -30 Td
/F1 14 Tf
(EDUCATION) Tj
0 -20 Td
/F1 11 Tf
(Bachelor of Business Administration in Computer Application) Tj
0 -15 Td
(New Arts, Commerce & Science College, Ahmednagar | 2023-2026) Tj
0 -15 Td
(CGPA: 8.36) Tj
0 -30 Td
/F1 14 Tf
(EXPERIENCE) Tj
0 -20 Td
/F1 11 Tf
(Full Stack Developer Intern - A2Z IT Hub Pvt. Ltd.) Tj
0 -15 Td
(January 2026 - Present) Tj
0 -15 Td
(Developed and maintained client projects using Node.js, MySQL, JavaScript, and Bootstrap) Tj
0 -15 Td
(Worked on full project lifecycle: planning, development, testing, and debugging) Tj
0 -30 Td
/F1 14 Tf
(CERTIFICATIONS) Tj
0 -20 Td
/F1 11 Tf
(HTML5 Certification - A2Z IT Hub | January 2025) Tj
0 -15 Td
(CSS3 Certification - A2Z IT Hub | February 2025) Tj
0 -15 Td
(Bootstrap Certification - A2Z IT Hub | March 2025) Tj
0 -15 Td
(JavaScript Certification - A2Z IT Hub | April 2025) Tj
0 -15 Td
(jQuery Certification - A2Z IT Hub | May 2025) Tj
0 -15 Td
(Node.js Certification - A2Z IT Hub | October 2025) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000001796 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1875
%%EOF`;

const outputPath = path.join(__dirname, 'public', 'resume.pdf');

fs.writeFileSync(outputPath, pdfContent, 'utf8');
console.log('Resume PDF created successfully at:', outputPath);
