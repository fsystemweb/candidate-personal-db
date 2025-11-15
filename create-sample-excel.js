const XLSX = require('xlsx');

// Create sample Excel file for testing
const sampleData = [
  {
    'Seniority': 'junior',
    'Years of experience': 5,
    'Availability': true
  }
];

const worksheet = XLSX.utils.json_to_sheet(sampleData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidates');

XLSX.writeFile(workbook, 'sample-candidate.xlsx');
console.log('Sample Excel file created: sample-candidate.xlsx');