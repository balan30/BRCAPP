import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { LoadingSlip, Memo, Bill, BankingEntry, Party, Supplier } from '../types';

interface DataContextType {
  // Loading Slips
  loadingSlips: LoadingSlip[];
  setLoadingSlips: (slips: LoadingSlip[] | ((prev: LoadingSlip[]) => LoadingSlip[])) => void;
  
  // Memos
  memos: Memo[];
  setMemos: (memos: Memo[] | ((prev: Memo[]) => Memo[])) => void;
  
  // Bills
  bills: Bill[];
  setBills: (bills: Bill[] | ((prev: Bill[]) => Bill[])) => void;
  
  // Banking
  bankingEntries: BankingEntry[];
  setBankingEntries: (entries: BankingEntry[] | ((prev: BankingEntry[]) => BankingEntry[])) => void;
  
  // Parties
  parties: Party[];
  setParties: (parties: Party[] | ((prev: Party[]) => Party[])) => void;
  
  // Suppliers
  suppliers: Supplier[];
  setSuppliers: (suppliers: Supplier[] | ((prev: Supplier[]) => Supplier[])) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [loadingSlips, setLoadingSlips] = useLocalStorage<LoadingSlip[]>('brc_loading_slips', []);
  const [memos, setMemos] = useLocalStorage<Memo[]>('brc_memos', []);
  const [bills, setBills] = useLocalStorage<Bill[]>('brc_bills', []);
  const [bankingEntries, setBankingEntries] = useLocalStorage<BankingEntry[]>('brc_banking', []);
  const [parties, setParties] = useLocalStorage<Party[]>('brc_parties', []);
  const [suppliers, setSuppliers] = useLocalStorage<Supplier[]>('brc_suppliers', []);

  const value: DataContextType = {
    loadingSlips,
    setLoadingSlips,
    memos,
    setMemos,
    bills,
    setBills,
    bankingEntries,
    setBankingEntries,
    parties,
    setParties,
    suppliers,
    setSuppliers,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};