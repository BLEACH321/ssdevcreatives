import express from 'express';
import cors from 'cors';
import * as xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const EXCEL_FILE = path.resolve('contacts.xlsx');

app.post('/api/contact', (req, res) => {
  const { name, email, number, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let workbook;
  let worksheet;

  // Check if file exists
  if (fs.existsSync(EXCEL_FILE)) {
    // Read existing file
    workbook = xlsx.readFile(EXCEL_FILE);
    const sheetName = workbook.SheetNames[0];
    worksheet = workbook.Sheets[sheetName];
  } else {
    // Create new workbook and sheet with headers
    workbook = xlsx.utils.book_new();
    worksheet = xlsx.utils.aoa_to_sheet([['Name', 'Email', 'Number', 'Subject', 'Message', 'Date']]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Contacts');
  }

  // Get current data format as arrays
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
  // Add new row with current timestamp
  const dateStr = new Date().toLocaleString();
  data.push([name, email, number || 'N/A', subject || 'N/A', message, dateStr]);

  // Convert array back to sheet
  const newWorksheet = xlsx.utils.aoa_to_sheet(data);
  workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

  // Save the excel file natively
  try {
    xlsx.writeFile(workbook, EXCEL_FILE);
    console.log(`[Success] Saved new contact from ${name} to Excel.`);
    return res.status(200).json({ success: true, message: 'Saved to Excel successfully!' });
  } catch (err) {
    console.error('[Error] Failed to write Excel file:', err);
    return res.status(500).json({ error: 'Failed to write to database' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Native Excel Database Server running on http://localhost:${PORT}`);
  console.log(`Excel file will be saved at: ${EXCEL_FILE}`);
});
