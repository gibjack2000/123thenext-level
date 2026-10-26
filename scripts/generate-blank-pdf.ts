import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildGpConsultationTemplatePdf } from '../src/utils/generateGpTemplatePdf.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generate() {
  const doc = buildGpConsultationTemplatePdf({}); // Mode B: Blank printable template
  const outputPath = path.join(__dirname, '..', 'public', 'assets', 'docs', 'clinical-baseline-consultation-template-v2.pdf');
  const pdfBytes = doc.output('arraybuffer');
  fs.writeFileSync(outputPath, Buffer.from(pdfBytes));
  console.log('Successfully generated blank printable PDF from shared builder at:', outputPath, 'Size:', pdfBytes.byteLength, 'bytes');
}

generate();
