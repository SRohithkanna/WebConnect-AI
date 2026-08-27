import fs from 'fs/promises';
import { PDFParse } from 'pdf-parse';

const extractTextFromPdf = async (filePath) => {
  const fileBuffer = await fs.readFile(filePath);

  const parser = new PDFParse({
    data: fileBuffer,
  });

  const result = await parser.getText();

  await parser.destroy();

  return result.text.trim();
};

export default extractTextFromPdf;