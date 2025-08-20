import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { LoadingSlip, Memo, Bill } from '../types';

const addCompanyLogo = (pdf: jsPDF, x: number = 20, y: number = 10, width: number = 40, height: number = 20) => {
  // Add company logo - using the BRC logo from assets
  // In a real implementation, you would load the actual logo file
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BRC', x, y + 10);
  pdf.setFontSize(8);
  pdf.text('BHAVISHYA ROAD CARRIERS', x, y + 16);
};

export const generateLoadingSlipPDF = async (slip: LoadingSlip) => {
  const pdf = new jsPDF();
  
  // Add company logo
  addCompanyLogo(pdf);
  
  // Company Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BHAVISHYA ROAD CARRIERS', 105, 20, { align: 'center' });
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Specialist in Heavy ODC Trailor & Low Bed Trailor For All Over India.', 105, 28, { align: 'center' });
  pdf.text('FLEET OWNERS, TRANSPORT CONTRACTOR', 105, 34, { align: 'center' });
  pdf.text('Shop No. 404, 4th Floor, Parijat Business Center, Nr. S.P. Ring Road,', 105, 40, { align: 'center' });
  pdf.text('New Vatva Road, New Vatva, Ahmedabad.', 105, 46, { align: 'center' });
  pdf.text('E-mail : bhavishyaroadcarriers01@gmail.com', 105, 52, { align: 'center' });
  
  // Contact Info
  pdf.text('M.: 9824900776', 180, 20);
  pdf.text('    9824026576', 180, 26);
  
  // Loading Slip Details
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`No. ${slip.slip_number}`, 20, 70);
  pdf.text(`Date : ${new Date(slip.date).toLocaleDateString('en-IN')}`, 150, 70);
  
  // Party Details
  pdf.text(`M/s. ${slip.party}`, 20, 85);
  
  // Vehicle and Route Details
  pdf.text(`We are sending Vehicle No. ${slip.vehicle_no}`, 20, 110);
  pdf.text(`Please Load Form ${slip.from_location} To ${slip.to_location}`, 20, 125);
  pdf.text(`Of Goods ${slip.dimension || 'Machinery'} Guaranty ${slip.weight}MT`, 20, 140);
  pdf.text(`Full Load has been Settled with Dimension ${slip.dimension || '42 x 8.5 x 8 = 20MT'}`, 20, 155);
  
  // Financial Details
  pdf.text(`Rate P.M.T. Rs. Fixed`, 20, 175);
  pdf.text(`Total Freight Rs. ${slip.total_freight.toLocaleString('en-IN')}`, 120, 175);
  pdf.text(`Advance Rs. ${slip.advance.toLocaleString('en-IN')}`, 20, 190);
  pdf.text(`Balance ${slip.balance.toLocaleString('en-IN')}`, 120, 190);
  
  // Thanks and Signature
  pdf.text('Thanks', 20, 210);
  pdf.text('For, BHAVISHAYA ROAD CARRIERS', 120, 230);
  
  // Notice
  pdf.setFontSize(8);
  pdf.text('Notice : (1) Please Check Up Engine No. Chassis No. R.T.O. Book C.S.T.', 20, 250);
  pdf.text('No etc for your satisfaction. (2) We are not responsible of accident', 35, 258);
  pdf.text('leakage & Breakage (3) One Day Halting Will be charges Rs. 4000', 35, 266);
  pdf.text('(4) At Owner\'s Risk', 35, 274);
  
  pdf.save(`loading-slip-${slip.slip_number}.pdf`);
};

export const generateMemoPDF = async (memo: Memo) => {
  const pdf = new jsPDF();
  
  // Add company logo
  addCompanyLogo(pdf);
  
  // Company Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BHAVISHYA ROAD CARRIERS', 105, 20, { align: 'center' });
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Specialist in Heavy ODC Trailor & Low Bed Trailor For All Over India.', 105, 28, { align: 'center' });
  pdf.text('FLEET OWNERS, TRANSPORT CONTRACTOR', 105, 34, { align: 'center' });
  pdf.text('Shop No. 404, 4th Floor, Parijat Business Center, Nr. S.P. Ring Road,', 105, 40, { align: 'center' });
  pdf.text('New Vatva Road, New Vatva, Ahmedabad.', 105, 46, { align: 'center' });
  pdf.text('E-mail : bhavishyaroadcarriers01@gmail.com', 105, 52, { align: 'center' });
  
  // Contact Info
  pdf.text('M.: 9824900776', 180, 20);
  pdf.text('    9824026576', 180, 26);
  
  pdf.setFontSize(14);
  pdf.text('MEMO', 20, 70);
  pdf.text(`NO: ${memo.memo_number}`, 150, 70);
  pdf.text(`DATE: ${new Date(memo.date).toLocaleDateString('en-IN')}`, 20, 85);
  
  // Supplier Details (Note: Party name should NOT appear in Memo PDF)
  pdf.text(`M/s. ${memo.supplier}`, 20, 100);
  
  // Financial Details
  pdf.text(`Freight: ${formatCurrency(memo.freight)}`, 20, 120);
  pdf.text(`Commission (6%): -${formatCurrency(memo.commission)}`, 20, 135);
  pdf.text(`Mamool: -${formatCurrency(memo.mamool)}`, 20, 150);
  pdf.text(`Detention: ${formatCurrency(memo.detention)}`, 20, 165);
  pdf.text(`Extra: ${formatCurrency(memo.extra)}`, 20, 180);
  pdf.text(`RTO: ${formatCurrency(memo.rto)}`, 20, 195);
  
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Net Amount: ${formatCurrency(memo.net_amount)}`, 20, 215);
  
  // Bank details
  const dataY = 230;
  pdf.setFontSize(12);
  pdf.text('BANK DETAILS', 20, dataY);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('BENEFICIARY NAME: BHAVISHYA ROAD CARRIERS', 20, dataY + 15);
  pdf.text('ACCOUNT NO: 231005501207', 20, dataY + 25);
  pdf.text('IFSC CODE: ICIC0002310', 20, dataY + 35);
  pdf.text('BRANCH NAME: GHODASAR, AHMEDABAD', 20, dataY + 45);
  
  pdf.save(`memo-${memo.memo_number}.pdf`);
};

export const generateBillPDF = async (bill: Bill, podImage?: string) => {
  const pdf = new jsPDF();
  
  // Add company logo
  addCompanyLogo(pdf);
  
  // Company Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BHAVISHYA ROAD CARRIERS', 105, 20, { align: 'center' });
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Specialist in Heavy ODC Trailor & Low Bed Trailor For All Over India.', 105, 28, { align: 'center' });
  pdf.text('FLEET OWNERS, TRANSPORT CONTRACTOR', 105, 34, { align: 'center' });
  pdf.text('Shop No. 404, 4th Floor, Parijat Business Center, Nr. S.P. Ring Road,', 105, 40, { align: 'center' });
  pdf.text('New Vatva Road, New Vatva, Ahmedabad.', 105, 46, { align: 'center' });
  pdf.text('E-mail : bhavishyaroadcarriers01@gmail.com', 105, 52, { align: 'center' });
  
  // Contact Info
  pdf.text('M.: 9824900776', 180, 20);
  pdf.text('    9824026576', 180, 26);
  
  pdf.setFontSize(14);
  pdf.text('BILL', 20, 70);
  pdf.text(`NO: ${bill.bill_number}`, 150, 70);
  pdf.text(`DATE: ${new Date(bill.date).toLocaleDateString('en-IN')}`, 20, 85);
  
  // Party Details (Note: Supplier name should NOT appear in Bill PDF)
  pdf.text(`M/s. ${bill.party}`, 20, 100);
  
  // Financial Details
  pdf.text(`Bill Amount: ${formatCurrency(bill.bill_amount)}`, 20, 120);
  pdf.text(`Mamool: -${formatCurrency(bill.mamool)}`, 20, 135);
  pdf.text(`TDS: -${formatCurrency(bill.tds)}`, 20, 150);
  pdf.text(`Penalties: -${formatCurrency(bill.penalties)}`, 20, 165);
  
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Net Amount: ${formatCurrency(bill.net_amount)}`, 20, 185);
  
  // Bank details
  const dataY = 200;
  pdf.setFontSize(12);
  pdf.text('BANK DETAILS', 20, dataY);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('BENEFICIARY NAME: BHAVISHYA ROAD CARRIERS', 20, dataY + 15);
  pdf.text('ACCOUNT NO: 231005501207', 20, dataY + 25);
  pdf.text('IFSC CODE: ICIC0002310', 20, dataY + 35);
  pdf.text('BRANCH NAME: GHODASAR, AHMEDABAD', 20, dataY + 45);
  
  // If POD image is provided, add it as page 2
  if (podImage) {
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text('PROOF OF DELIVERY (POD)', 105, 20, { align: 'center' });
    // Add POD image logic here
  }
  
  pdf.save(`bill-${bill.bill_number}.pdf`);
};

export const generateLedgerPDF = async (ledgerName: string, ledgerType: 'party' | 'supplier', entries: any[]) => {
  const pdf = new jsPDF('landscape');
  
  // Add company logo
  addCompanyLogo(pdf);
  
  // Company Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BHAVISHYA ROAD CARRIERS', 150, 20, { align: 'center' });
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Specialist in Heavy ODC Trailor & Low Bed Trailor For All Over India.', 150, 28, { align: 'center' });
  pdf.text('FLEET OWNERS, TRANSPORT CONTRACTOR', 150, 34, { align: 'center' });
  
  // Ledger Details
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${ledgerType.toUpperCase()} LEDGER`, 20, 60);
  pdf.text(`Name: ${ledgerName}`, 20, 75);
  
  // Table headers and data would go here
  // Implementation depends on the specific ledger structure
  
  pdf.save(`${ledgerType}-ledger-${ledgerName}.pdf`);
};