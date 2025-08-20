import React, { useState } from 'react';
import { Plus, FileText, Edit, Download, Image, Trash2, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../utils/numberGenerator';
import { useData } from '../context/DataContext';
import BillForm from './forms/BillForm';
import { generateBillPDF } from '../utils/pdfGenerator';
import type { Bill } from '../types';

const BillsComponent: React.FC = () => {
  const { bills, setBills } = useData();
  
  const [showForm, setShowForm] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'received'>('pending');

  const handleCreateBill = (billData: Omit<Bill, 'id' | 'created_at' | 'updated_at'>) => {
    const newBill: Bill = {
      ...billData,
      is_received: false,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setBills(prev => [newBill, ...prev]);
    setShowForm(false);
  };

  const handleEditBill = (bill: Bill) => {
    setEditingBill(bill);
    setShowForm(true);
  };

  const handleUpdateBill = (billData: Omit<Bill, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingBill) {
      const updatedBill: Bill = {
        ...billData,
        id: editingBill.id,
        created_at: editingBill.created_at,
        updated_at: new Date().toISOString(),
      };
      setBills(prev => prev.map(bill => 
        bill.id === editingBill.id ? updatedBill : bill
      ));
      setShowForm(false);
      setEditingBill(null);
    }
  };

  const handleDeleteBill = (billId: string) => {
    if (deleteConfirm === billId) {
      setBills(prev => prev.filter(bill => bill.id !== billId));
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(billId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const handleMarkAsReceived = (bill: Bill) => {
    const updatedBill: Bill = {
      ...bill,
      is_received: true,
      receipt_date: new Date().toISOString(),
      receipt_amount: bill.net_amount,
      updated_at: new Date().toISOString(),
    };
    setBills(prev => prev.map(b => b.id === bill.id ? updatedBill : b));
  };

  const handleDownloadPDF = async (bill: Bill) => {
    await generateBillPDF(bill, bill.pod_image);
  };

  const filteredBills = bills
    .filter(bill => activeTab === 'pending' ? !bill.is_received : bill.is_received)
    .filter(bill =>
      bill.bill_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.party.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bills</h1>
          <div className="flex space-x-4 mt-2">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'pending'
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pending Bills ({bills.filter(b => !b.is_received).length})
            </button>
            <button
              onClick={() => setActiveTab('received')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'received'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Received Bills ({bills.filter(b => b.is_received).length})
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Bill</span>
        </button>
      </div>

      {showForm && (
        <BillForm
          initialData={editingBill}
          onSubmit={editingBill ? handleUpdateBill : handleCreateBill}
          onCancel={() => {
            setShowForm(false);
            setEditingBill(null);
          }}
        />
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Bills</h3>
        </div>
        <div className="overflow-x-auto">
          {bills.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No bills found</p>
              <p className="text-sm">Create bills from loading slips</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bill No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Party
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bill Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deductions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    POD
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {bill.bill_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(bill.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bill.party}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(bill.bill_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      -{formatCurrency(bill.mamool + bill.tds + bill.penalties)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      {formatCurrency(bill.net_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bill.pod_image ? (
                        <div className="flex items-center space-x-1">
                          <Image className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Yes</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditBill(bill)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit Bill"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(bill)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillsComponent;