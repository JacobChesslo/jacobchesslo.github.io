import puppeteer from 'puppeteer';
import { marked } from 'marked';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function generatePdf() {
  console.log('Reading CV markdown...');

  const cvPath = path.join(rootDir, 'src/content/cv.md');
  const cvContent = fs.readFileSync(cvPath, 'utf-8');
  const cvHtml = await marked(cvContent);

  // Create a styled HTML document for PDF
  const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Outfit', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #1a1a2e;
      padding: 0.5in;
      font-size: 10pt;
    }

    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 22pt;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 3px solid #e94560;
      padding-bottom: 8px;
    }

    h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 14pt;
      font-weight: 600;
      color: #e94560;
      margin-top: 18px;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1.5px solid #f8b500;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      page-break-after: avoid;
    }

    h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11pt;
      font-weight: 600;
      color: #0f9b8e;
      margin-top: 12px;
      margin-bottom: 4px;
      page-break-after: avoid;
    }

    p {
      margin-bottom: 6px;
      text-align: justify;
    }

    ul {
      list-style: none;
      padding-left: 16px;
      margin-bottom: 8px;
    }

    li {
      margin-bottom: 4px;
      position: relative;
      padding-left: 12px;
    }

    li::before {
      content: "\\2022";
      position: absolute;
      left: 0;
      color: #e94560;
      font-weight: bold;
    }

    a {
      color: #0f9b8e;
      text-decoration: none;
    }

    strong {
      font-weight: 600;
    }

    em {
      font-style: italic;
    }

    /* Avoid page breaks inside these elements */
    h1, h2, h3, li {
      page-break-inside: avoid;
    }

    /* Keep headers with following content */
    h2 + *, h3 + * {
      page-break-before: avoid;
    }
  </style>
</head>
<body>
  ${cvHtml}
</body>
</html>
`;

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

  // Ensure public directory exists
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pdfPath = path.join(publicDir, 'JacobChessloCV.pdf');

  console.log('Generating PDF...');
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in',
    },
    printBackground: true,
  });

  await browser.close();

  console.log(`PDF generated successfully: ${pdfPath}`);
}

generatePdf().catch((error) => {
  console.error('Error generating PDF:', error);
  process.exit(1);
});
