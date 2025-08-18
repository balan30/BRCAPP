import React from 'react';
import { X, Edit, Download, Calendar, Building, Calculator, Receipt } from 'lucide-react';
import { formatCurrency } from '../../utils/numberGenerator';
import type { Memo } from '../../types';

interface MemoViewProps {
  memo: Memo;
  onClose: () => void;
  onEdit: () => void;
}

const MemoView: React.FC<MemoViewProps> = ({ memo, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Memo Details</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Receipt className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Memo Number</span>
              </div>
              <p className="text-xl font-bold text-orange-900">{memo.memo_number}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Date</span>
              </div>
              <p className="text-xl font-bold text-green-900">
                {new Date(memo.date).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Net Amount</span>
              </div>
              <p className="text-xl font-bold text-blue-900">{formatCurrency(memo.net_amount)}</p>
            </div>
          </div>

          {/* Supplier Information */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Building className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-900">Supplier Information</span>
            </div>
            <p className="text-lg font-semibold text-yellow-900">{memo.supplier}</p>
          </div>

          {/* Financial Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Income Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Freight:</span>
                  <span className="font-medium text-green-600">{formatCurrency(memo.freight)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Detention:</span>
                  <span className="font-medium text-green-600">{formatCurrency(memo.detention)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Extra:</span>
                  <span className="font-medium text-green-600">{formatCurrency(memo.extra)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">RTO:</span>
                  <span className="font-medium text-green-600">{formatCurrency(memo.rto)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Deductions</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Commission:</span>
                  <span className="font-medium text-red-600">-{formatCurrency(memo.commission)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mamool:</span>
                  <span className="font-medium text-red-600">-{formatCurrency(memo.mamool)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Calculation */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Calculator className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-sm font-medium text-green-900">Final Calculation</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-green-700">Total Income:</span>
                <span className="ml-2 font-medium">
                  {formatCurrency(memo.freight + memo.detention + memo.extra + memo.rto)}
                </span>
              </div>
              <div>
                <span className="text-red-700">Total Deductions:</span>
                <span className="ml-2 font-medium">
                  -{formatCurrency(memo.commission + memo.mamool)}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-green-900 font-medium">Net Payable:</span>
                <span className="ml-2 text-xl font-bold text-green-900">
                  {formatCurrency(memo.net_amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Advance Payments */}
          {memo.advance_payments && memo.advance_payments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Advance Payments</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {memo.advance_payments.map((payment, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-600">
                          {new Date(payment.date).toLocaleDateString('en-IN')} - {payment.mode}
                        </span>
                        {payment.reference && (
                          <span className="text-xs text-gray-500 ml-2">({payment.reference})</span>
                        )}
                      </div>
                      <span className="font-medium text-blue-600">{formatCurrency(payment.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoView;