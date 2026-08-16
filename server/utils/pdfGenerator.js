const PDFDocument = require('pdfkit');

const generateJoiningLetter = (employeeData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Template Content
      doc.fontSize(20).text('JOINING LETTER', { align: 'center' });
      doc.moveDown(2);
      
      doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' });
      doc.moveDown(2);
      
      doc.fontSize(12).text(`Dear ${employeeData.name},`);
      doc.moveDown();
      
      doc.text(`We are pleased to inform you that you have been appointed as an Employee at Zyntra Technologies. Your Employee ID is ${employeeData.employeeId}.`);
      doc.moveDown();
      
      doc.text(`We are excited to have you join our team and expect that you will do your best to contribute to the company's success.`);
      doc.moveDown();
      
      doc.text(`Your login credentials for the employee portal are as follows:`);
      doc.text(`Email: ${employeeData.email}`);
      doc.text(`Password: (As provided in your welcome email)`);
      doc.moveDown(2);
      
      doc.text(`Sincerely,`);
      doc.moveDown();
      doc.text(`Management Team`);
      doc.text(`Zyntra Technologies`);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateJoiningLetter };
