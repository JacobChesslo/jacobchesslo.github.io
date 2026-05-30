import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const cvMd = fs.readFileSync(path.join(rootDir, 'src/content/curriculum-vitae/README.md'), 'utf-8');
const cvHtml = marked.parse(cvMd);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Outfit', Helvetica, Arial, sans-serif;
    font-size: 9.5pt;
    font-weight: 300;
    line-height: 1.55;
    color: #111;
    background: #fff;
  }

  h1 {
    font-size: 18pt;
    font-weight: 600;
    letter-spacing: 0.01em;
    margin-bottom: 4px;
  }

  /* Contact info - first p after h1 */
  h1 + p {
    font-size: 8.5pt;
    color: #444;
    margin-bottom: 16px;
    line-height: 1.7;
  }
  h1 + p a { color: #444; text-decoration: none; }

  h2 {
    font-size: 8pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    border-bottom: 0.75pt solid #000;
    padding-bottom: 2px;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 9.5pt;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 1px;
  }

  /* Date / org line - first p after h3 */
  h3 + p {
    font-size: 8pt;
    color: #555;
    margin-bottom: 2px;
  }

  p {
    font-size: 9pt;
    color: #222;
    margin-bottom: 3px;
    line-height: 1.5;
  }

  ul, ol {
    margin: 4px 0 8px 14px;
    padding: 0;
  }
  li { margin-bottom: 2px; font-size: 9pt; line-height: 1.5; }

  /* Nested list */
  li > ul, li > ol { margin-top: 2px; margin-bottom: 2px; }

  strong { font-weight: 600; }
  em { font-style: italic; color: #333; }
  a { color: #333; text-decoration: none; word-break: break-all; }

  hr { border: none; border-top: 0.5pt solid #ccc; margin: 8pt 0; }

  @page {
    size: Letter portrait;
    margin: 0.65in 0.7in;
  }
</style>
</head>
<body>
${cvHtml}
</body>
</html>`;

async function generatePdf() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30_000 });

    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      margin: { top: '0.65in', right: '0.7in', bottom: '0.65in', left: '0.7in' },
      printBackground: false,
    });

    const targets = [
      path.join(rootDir, 'dist', 'JacobChessloCV.pdf'),
      path.join(rootDir, 'public', 'JacobChessloCV.pdf'),
    ];

    for (const dest of targets) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, pdfBuffer);
      console.log(`Written: ${dest}`);
    }
  } finally {
    await browser.close();
  }

  console.log('PDF generation complete.');
}

generatePdf().catch((err) => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
