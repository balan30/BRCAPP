import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/numberGenerator';
import type { BankingEntry } from '../../types';

interface BankingFormProps {
  onSubmit: (data: Omit<BankingEntry, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}

const BankingForm: React.FC<BankingFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'credit' as 'credit' | 'debit',
    category: 'other' as 'bill_advance' | 'bill_payment' | 'memo_advance' | 'memo_payment' | 'expense' | 'other',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    reference_id: '',
    reference_name: '',
    narration: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const getCategoryOptions = () => {
    if (formData.type === 'credit') {
      return [
        { value: 'bill_advance', label: 'Bill Advance' },
        { value: 'bill_payment', label: 'Bill Payment' },
        { value: 'other', label: 'Other Income' },
      ];
    } else {
      return [
        { value: 'memo_advance', label: 'Memo Advance' },
        { value: 'memo_payment', label: 'Memo Payment' },
        { value: 'expense', label: 'Expense' },
        { value: 'other', label: 'Other Expense' },
      ];
    }
  };

  const needsReference = () => {
    return ['bill_advance', 'bill_payment', 'memo_advance', 'memo_payment'].includes(formData.category);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">New Banking Entry</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entry Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="credit">Credit (Money In)</option>
                <option value="debit">Debit (Money Out)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {getCategoryOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {needsReference() && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.category.includes('bill') ? 'Bill Number' : 'Memo Number'}
                </label>
                <input
                  type="text"
                  name="reference_id"
                  value={formData.reference_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={formData.category.includes('bill') ? 'Enter Bill Number' : 'Enter Memo Number'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.category.includes('bill') ? 'Party Name' : 'Supplier Name'}
                </label>
                <input
                  type="text"
                  name="reference_name"
                  value={formData.reference_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={formData.category.includes('bill') ? 'Enter Party Name' : 'Enter Supplier Name'}
                  required
                />
              </div>
            </div>
          )}

          {!needsReference() && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference Name
              </label>
              <input
                type="text"
                name="reference_name"
                value={formData.reference_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter name or description"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Narration
            </label>
            <textarea
              name="narration"
              value={formData.narration}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter transaction details..."
              required
            />
          </div>

          {/* Summary */}
          <div className={`p-4 rounded-lg ${formData.type === 'credit' ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className={`w-5 h-5 ${formData.type === 'credit' ? 'text-green-600' : 'text-red-600'}`} />
                <span className={`font-medium ${formData.type === 'credit' ? 'text-green-900' : 'text-red-900'}`}>
                  {formData.type === 'credit' ? 'Credit Entry' : 'Debit Entry'}
                </span>
              </div>
              <span className={`text-xl font-bold ${formData.type === 'credit' ? 'text-green-900' : 'text-red-900'}`}>
                {formData.type === 'credit' ? '+' : '-'}{formatCurrency(formData.amount)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankingForm;