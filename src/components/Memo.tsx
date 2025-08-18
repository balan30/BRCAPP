import React, { useState } from 'react';
import { Plus, Receipt, Edit, Download, FileText, Search, Eye } from 'lucide-react';
import { formatCurrency } from '../utils/numberGenerator';
import MemoForm from './forms/MemoForm';
import MemoView from './views/MemoView';
import { generateMemoPDF } from '../utils/pdfGenerator';
import type { Memo } from '../types';

const MemoComponent: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
  const [viewingMemo, setViewingMemo] = useState<Memo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateMemo = (memoData: Omit<Memo, 'id' | 'created_at' | 'updated_at'>) => {
    const newMemo: Memo = {
      ...memoData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setMemos([newMemo, ...memos]);
    setShowForm(false);
  };

  const handleEditMemo = (memo: Memo) => {
    setEditingMemo(memo);
    setShowForm(true);
  };

  const handleUpdateMemo = (memoData: Omit<Memo, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingMemo) {
      const updatedMemo: Memo = {
        ...memoData,
        id: editingMemo.id,
        created_at: editingMemo.created_at,
        updated_at: new Date().toISOString(),
      };
      setMemos(memos.map(memo => 
        memo.id === editingMemo.id ? updatedMemo : memo
      ));
      setShowForm(false);
      setEditingMemo(null);
    }
  };

  const handleDownloadPDF = async (memo: Memo) => {
    await generateMemoPDF(memo);
  };

  const handleViewMemo = (memo: Memo) => {
    setViewingMemo(memo);
  };

  const filteredMemos = memos.filter(memo =>
    memo.memo_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memo.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Memo</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Memo</span>
        </button>
      </div>

      {showForm && (
        <MemoForm
          initialData={editingMemo}
          onSubmit={editingMemo ? handleUpdateMemo : handleCreateMemo}
          onCancel={() => {
            setShowForm(false);
            setEditingMemo(null);
          }}
        />
      )}

      {viewingMemo && (
        <MemoView
          memo={viewingMemo}
          onClose={() => setViewingMemo(null)}
          onEdit={() => {
            setEditingMemo(viewingMemo);
            setViewingMemo(null);
            setShowForm(true);
          }}
        />
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by memo number, supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Memos</h3>
        </div>
        <div className="overflow-x-auto">
          {filteredMemos.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <Receipt className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>{memos.length === 0 ? 'No memos found' : 'No matching memos found'}</p>
              <p className="text-sm">Create memos from loading slips</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Memo No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Freight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMemos.map((memo) => (
                  <tr key={memo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {memo.memo_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(memo.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {memo.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(memo.freight)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      -{formatCurrency(memo.commission)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      {formatCurrency(memo.net_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewMemo(memo)}
                          className="text-gray-600 hover:text-gray-800"
                          title="View Memo Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditMemo(memo)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit Memo"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(memo)}
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

export default MemoComponent;