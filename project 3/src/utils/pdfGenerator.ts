import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { LoadingSlip, Memo, Bill } from '../types';

export const generateLoadingSlipPDF = async (slip: LoadingSlip) => {
  const pdf = new jsPDF();
  
  // Company Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BHAVISHYA ROAD CARRIERS', 105, 20, { align: 'center' });
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Specialist in Heavy ODC, Hydraulic, Low Bed Trailer, Flat Bed Trailer Transport & Commission Agent', 105, 28, { align: 'center' });
  pdf.text('FLEET OWNERS, TRANSPORT CONTRACTORS & COMMISSION AGENTS', 105, 34, { align: 'center' });
  pdf.text('404, Parijaat Business Center, Nr. SP Ring Road, Aslali, Ahmedabad - 382405', 105, 40, { align: 'center' });
  
  // Contact Info
  pdf.text('MOB:9824026576 , 9824900776', 180, 20);
  pdf.text('PAN NO: BNDPK7173D', 180, 50);
  
  // Loading Slip Details
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('LOADING SLIP', 20, 70);
  pdf.text(`NO: ${slip.slip_number}`, 150, 70);
  pdf.text(`DATE: ${new Date(slip.date).toLocaleDateString('en-IN')}`, 20, 85);
  
  // Party Details
  pdf.text(`M/S: ${slip.party}`, 20, 100);
  
  // Table Headers
  const startY = 120;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  
  const headers = ['SN.NO', 'LOADING DATE', 'FROM', 'TO', 'TRAILOR NO', 'WEIGHT', 'FREIGHT', 'RTO CHALLAN', 'DETENTION', 'EXTRA WEIGHT', 'ADVANCE', 'BALANCE AMT'];
  const colWidths = [15, 25, 25, 25, 25, 20, 25, 25, 25, 25, 25, 25];
  
  let currentX = 20;
  headers.forEach((header, index) => {
    pdf.text(header, currentX, startY);
    currentX += colWidths[index];
  });
  
  // Table Data
  pdf.setFont('helvetica', 'normal');
  const dataY = startY + 15;
  currentX = 20;
  
  const rowData = [
    '1',
    new Date(slip.date).toLocaleDateString('en-IN'),
    slip.from_location,
    slip.to_location,
    slip.vehicle_no,
    `${slip.weight}MT`,
    `₹${slip.freight.toLocaleString('en-IN')}`,
    `₹${slip.rto.toLocaleString('en-IN')}`,
    '₹0',
    '0',
    `₹${slip.advance.toLocaleString('en-IN')}`,
    `₹${slip.balance.toLocaleString('en-IN')}`
  ];
  
  rowData.forEach((data, index) => {
    pdf.text(data, currentX, dataY);
    currentX += colWidths[index];
  });
  
  // Total
  pdf.setFont('helvetica', 'bold');
  pdf.text('TOTAL', 150, dataY + 30);
  pdf.text(`₹${slip.total_freight.toLocaleString('en-IN')}`, 180, dataY + 30);
  
  // Bank Details (Note: Supplier name should NOT appear in Loading Slip PDF)
  pdf.setFontSize(12);
  pdf.text('BANK DETAILS', 20, dataY + 60);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('BENEFICIARY NAME: BHAVISHYA ROAD CARRIERS', 20, dataY + 75);
  pdf.text('ACCOUNT NO: 231005501207', 20, dataY + 85);
  pdf.text('IFSC CODE: ICIC0002310', 20, dataY + 95);
  pdf.text('BRANCH NAME: GHODASAR, AHMEDABAD', 20, dataY + 105);
  
  pdf.text('FOR , BHAVISHYA ROAD CARRIERS', 150, dataY + 95);
  pdf.text('AUTHORISED SIGNATORY', 150, dataY + 115);
  
  pdf.save(`loading-slip-${slip.slip_number}.pdf`);
};

export const generateMemoPDF = async (memo: Memo) => {
  const pdf = new jsPDF();
  
  // Similar structure but for Memo
  // Note: Party name should NOT appear in Memo PDF
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BHAVISHYA ROAD CARRIERS', 105, 20, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.text('MEMO', 20, 70);
  pdf.text(`NO: ${memo.memo_number}`, 150, 70);
  pdf.text(`DATE: ${new Date(memo.date).toLocaleDateString('en-IN')}`, 20, 85);
  
  // Bank details should be included
  const dataY = 150;
  pdf.setFontSize(12);
  pdf.text('BANK DETAILS', 20, dataY + 60);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('BENEFICIARY NAME: BHAVISHYA ROAD CARRIERS', 20, dataY + 75);
  pdf.text('ACCOUNT NO: 231005501207', 20, dataY + 85);
  pdf.text('IFSC CODE: ICIC0002310', 20, dataY + 95);
  pdf.text('BRANCH NAME: GHODASAR, AHMEDABAD', 20, dataY + 105);
  
  pdf.save(`memo-${memo.memo_number}.pdf`);
};

export const generateBillPDF = async (bill: Bill, podImage?: string) => {
  const pdf = new jsPDF('landscape'); // Landscape orientation for bills
  
  // Similar structure but for Bill
  // Note: Supplier name should NOT appear in Bill PDF
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BHAVISHYA ROAD CARRIERS', 150, 20, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.text('BILL', 20, 70);
  pdf.text(`NO: ${bill.bill_number}`, 200, 70);
  pdf.text(`DATE: ${new Date(bill.date).toLocaleDateString('en-IN')}`, 20, 85);
  
  // Bank details should be included
  const dataY = 150;
  pdf.setFontSize(12);
  pdf.text('BANK DETAILS', 20, dataY + 60);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('BENEFICIARY NAME: BHAVISHYA ROAD CARRIERS', 20, dataY + 75);
  pdf.text('ACCOUNT NO: 231005501207', 20, dataY + 85);
  pdf.text('IFSC CODE: ICIC0002310', 20, dataY + 95);
  pdf.text('BRANCH NAME: GHODASAR, AHMEDABAD', 20, dataY + 105);
  
  // If POD image is provided, add it as page 2
  if (podImage) {
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text('PROOF OF DELIVERY (POD)', 150, 20, { align: 'center' });
    // Add POD image logic here
  }
  
  pdf.save(`bill-${bill.bill_number}.pdf`);
};