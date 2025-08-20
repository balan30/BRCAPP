export const generateSlipNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  
  // Get last slip number from localStorage and increment
  const lastSlipNumber = localStorage.getItem('lastSlipNumber');
  let nextNumber = 1;
  
  if (lastSlipNumber) {
    const lastNum = parseInt(lastSlipNumber.slice(-4));
    nextNumber = lastNum + 1;
  }
  
  const numberStr = nextNumber.toString().padStart(4, '0');
  const slipNumber = `LS${year}${month}${numberStr}`;
  
  // Store the new number
  localStorage.setItem('lastSlipNumber', slipNumber);
  
  return slipNumber;
};

export const generateMemoNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  
  // Get last memo number from localStorage and increment
  const lastMemoNumber = localStorage.getItem('lastMemoNumber');
  let nextNumber = 1;
  
  if (lastMemoNumber) {
    const lastNum = parseInt(lastMemoNumber.slice(-4));
    nextNumber = lastNum + 1;
  }
  
  const numberStr = nextNumber.toString().padStart(4, '0');
  const memoNumber = `MO${year}${month}${numberStr}`;
  
  // Store the new number
  localStorage.setItem('lastMemoNumber', memoNumber);
  
  return memoNumber;
};

export const generateBillNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  
  // Get last bill number from localStorage and increment
  const lastBillNumber = localStorage.getItem('lastBillNumber');
  let nextNumber = 1;
  
  if (lastBillNumber) {
    const lastNum = parseInt(lastBillNumber.slice(-4));
    nextNumber = lastNum + 1;
  }
  
  const numberStr = nextNumber.toString().padStart(4, '0');
  const billNumber = `BL${year}${month}${numberStr}`;
  
  // Store the new number
  localStorage.setItem('lastBillNumber', billNumber);
  
  return billNumber;
};

export const validateUniqueNumber = (type: 'slip' | 'memo' | 'bill', number: string, existingNumbers: string[]): boolean => {
  return !existingNumbers.includes(number);
};

export const updateLastNumber = (type: 'slip' | 'memo' | 'bill', number: string): void => {
  const key = type === 'slip' ? 'lastSlipNumber' : 
              type === 'memo' ? 'lastMemoNumber' : 'lastBillNumber';
  localStorage.setItem(key, number);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};