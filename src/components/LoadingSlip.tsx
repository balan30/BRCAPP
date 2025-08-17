import React, { useState } from 'react';
import { Plus, FileText, Edit, Download, Receipt, CreditCard } from 'lucide-react';
import { generateSlipNumber, formatCurrency } from '../utils/numberGenerator';
import LoadingSlipForm from './forms/LoadingSlipForm';
import MemoForm from './forms/MemoForm';
import BillForm from './forms/BillForm';
import { generateLoadingSlipPDF } from '../utils/pdfGenerator';
import type { LoadingSlip } from '../types';

const LoadingSlipComponent: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingSlip, setEditingSlip] = useState<LoadingSlip | null>(null);
  const [loadingSlips, setLoadingSlips] = useState<LoadingSlip[]>([]);
  const [showMemoForm, setShowMemoForm] = useState(false);
  const [showBillForm, setShowBillForm] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState<LoadingSlip | null>(null);

  const handleCreateSlip = (slipData: Omit<LoadingSlip, 'id' | 'created_at' | 'updated_at'>) => {
    const newSlip: LoadingSlip = {
      ...slipData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setLoadingSlips([newSlip, ...loadingSlips]);
    setShowForm(false);
  };

  const handleEditSlip = (slip: LoadingSlip) => {
    setEditingSlip(slip);
    setShowForm(true);
  };

  const handleUpdateSlip = (slipData: Omit<LoadingSlip, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingSlip) {
      const updatedSlip: LoadingSlip = {
        ...slipData,
        id: editingSlip.id,
        created_at: editingSlip.created_at,
        updated_at: new Date().toISOString(),
      };
      setLoadingSlips(loadingSlips.map(slip => 
        slip.id === editingSlip.id ? updatedSlip : slip
      ));
      setShowForm(false);
      setEditingSlip(null);
    }
  };

  const handleCreateMemo = (slip: LoadingSlip) => {
    setSelectedSlip(slip);
    setShowMemoForm(true);
  };

  const handleCreateBill = (slip: LoadingSlip) => {
    setSelectedSlip(slip);
    setShowBillForm(true);
  };

  const handleDownloadPDF = async (slip: LoadingSlip) => {
    await generateLoadingSlipPDF(slip);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Loading Slip</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Loading Slip</span>
        </button>
      </div>

      {showForm && (
        <LoadingSlipForm
          initialData={editingSlip}
          onSubmit={editingSlip ? handleUpdateSlip : handleCreateSlip}
          onCancel={() => {
            setShowForm(false);
            setEditingSlip(null);
          }}
        />
      )}

      {showMemoForm && selectedSlip && (
        <MemoForm
          loadingSlip={selectedSlip}
          onSubmit={(memoData) => {
            // In real app, save memo to state/database
            console.log('Memo created:', memoData);
            setShowMemoForm(false);
            setSelectedSlip(null);
          }}
          onCancel={() => {
            setShowMemoForm(false);
            setSelectedSlip(null);
          }}
        />
      )}

      {showBillForm && selectedSlip && (
        <BillForm
          loadingSlip={selectedSlip}
          onSubmit={(billData) => {
            // In real app, save bill to state/database
            console.log('Bill created:', billData);
            setShowBillForm(false);
            setSelectedSlip(null);
          }}
          onCancel={() => {
            setShowBillForm(false);
            setSelectedSlip(null);
          }}
        />
      )}

      {/* Loading Slips List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Loading Slips</h3>
        </div>
        <div className="overflow-x-auto">
          {loadingSlips.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No loading slips found</p>
              <p className="text-sm">Create your first loading slip to get started</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slip No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Party
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Freight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loadingSlips.map((slip) => (
                  <tr key={slip.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {slip.slip_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(slip.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {slip.party}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {slip.vehicle_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {slip.from_location} → {slip.to_location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(slip.total_freight)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEditSlip(slip)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(slip)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleCreateMemo(slip)}
                          className="text-orange-600 hover:text-orange-800"
                          title="Create Memo"
                        >
                          <Receipt className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleCreateBill(slip)}
                          className="text-purple-600 hover:text-purple-800"
                          title="Create Bill"
                        >
                          <CreditCard className="w-4 h-4" />
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

export default LoadingSlipComponent;