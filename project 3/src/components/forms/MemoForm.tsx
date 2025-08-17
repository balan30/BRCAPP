import React, { useState, useEffect } from 'react';
import { X, Calculator } from 'lucide-react';
import { generateMemoNumber, formatCurrency } from '../../utils/numberGenerator';
import type { LoadingSlip, Memo } from '../../types';

interface MemoFormProps {
  loadingSlip?: LoadingSlip;
  initialData?: Memo | null;
  onSubmit: (data: Omit<Memo, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

const MemoForm: React.FC<MemoFormProps> = ({ loadingSlip, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    memo_number: generateMemoNumber(),
    loading_slip_id: loadingSlip?.id || '',
    date: new Date().toISOString().split('T')[0],
    supplier: loadingSlip?.supplier || '',
    freight: loadingSlip?.freight || 0,
    commission: 0,
    mamool: 0,
    detention: 0,
    extra: 0,
    rto: loadingSlip?.rto || 0,
    net_amount: 0,
    advance_payments: [],
  });

  // Calculate commission (6% of freight)
  useEffect(() => {
    const commission = formData.freight * 0.06;
    const netAmount = formData.freight - commission - formData.mamool + formData.detention + formData.extra + formData.rto;
    setFormData(prev => ({
      ...prev,
      commission,
      net_amount: netAmount,
    }));
  }, [formData.freight, formData.mamool, formData.detention, formData.extra, formData.rto]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        memo_number: initialData.memo_number,
        loading_slip_id: initialData.loading_slip_id,
        date: initialData.date.split('T')[0],
        supplier: initialData.supplier,
        freight: initialData.freight,
        commission: initialData.commission,
        mamool: initialData.mamool,
        detention: initialData.detention,
        extra: initialData.extra,
        rto: initialData.rto,
        net_amount: initialData.net_amount,
        advance_payments: initialData.advance_payments,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Memo' : 'New Memo'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Memo Number
              </label>
              <input
                type="text"
                name="memo_number"
                value={formData.memo_number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier
              </label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {loadingSlip && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Loading Slip Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Slip No:</span>
                  <span className="ml-2 font-medium">{loadingSlip.slip_number}</span>
                </div>
                <div>
                  <span className="text-blue-700">Vehicle:</span>
                  <span className="ml-2 font-medium">{loadingSlip.vehicle_no}</span>
                </div>
                <div>
                  <span className="text-blue-700">Route:</span>
                  <span className="ml-2 font-medium">{loadingSlip.from_location} → {loadingSlip.to_location}</span>
                </div>
                <div>
                  <span className="text-blue-700">Party:</span>
                  <span className="ml-2 font-medium">{loadingSlip.party}</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Freight (₹)
              </label>
              <input
                type="number"
                name="freight"
                value={formData.freight}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commission (6% Auto-calculated)
              </label>
              <div className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                {formatCurrency(formData.commission)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mamool (₹)
              </label>
              <input
                type="number"
                name="mamool"
                value={formData.mamool}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detention (₹)
              </label>
              <input
                type="number"
                name="detention"
                value={formData.detention}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extra (₹)
              </label>
              <input
                type="number"
                name="extra"
                value={formData.extra}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RTO (₹)
              </label>
              <input
                type="number"
                name="rto"
                value={formData.rto}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* Calculation Summary */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Calculator className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-sm font-medium text-green-900">Calculation Summary</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-green-700">Freight:</span>
                <span className="ml-2 font-medium">{formatCurrency(formData.freight)}</span>
              </div>
              <div>
                <span className="text-red-700">Commission (6%):</span>
                <span className="ml-2 font-medium">-{formatCurrency(formData.commission)}</span>
              </div>
              <div>
                <span className="text-red-700">Mamool:</span>
                <span className="ml-2 font-medium">-{formatCurrency(formData.mamool)}</span>
              </div>
              <div>
                <span className="text-green-700">Detention + Extra:</span>
                <span className="ml-2 font-medium">+{formatCurrency(formData.detention + formData.extra)}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-green-900 font-medium">Net Amount:</span>
                <span className="text-xl font-bold text-green-900">{formatCurrency(formData.net_amount)}</span>
              </div>
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
              {initialData ? 'Update' : 'Create'} Memo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemoForm;